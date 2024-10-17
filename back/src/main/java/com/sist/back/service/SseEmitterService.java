package com.sist.back.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class SseEmitterService {

    private final List<SseEmitter> emitters = new ArrayList<>();

    public SseEmitter createEmitter() {
        SseEmitter emitter = new SseEmitter(60* 60 * 1000L);
        emitters.add(emitter);

        // 연결이 완료되거나 오류 발생 시 emitter 제거
        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError((e) -> emitters.remove(emitter));

        return emitter;
    }

    public void sendNotificationToClients(String message) {
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event()
                    .name("notification")
                    .data(message));
            } catch (IOException e) {
                emitters.remove(emitter);
            }
        }
    }
}