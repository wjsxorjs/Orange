package com.sist.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.sist.back.service.SseEmitterService;

@RestController
@RequestMapping("/api")
public class NotificationController {

    @Autowired
    private com.sist.back.service.DBChangeService DBChangeService;

    @Autowired
    private final SseEmitterService sseEmitterService;

    public NotificationController(SseEmitterService sseEmitterService) {
        this.sseEmitterService = sseEmitterService;
    }

    // SSE 구독
    @RequestMapping("/subscribe")
    public SseEmitter subscribe() {
        return sseEmitterService.createEmitter();
    }

    // 알림을 수동으로 테스트하기 위한 엔드포인트 (DB 변경 시 호출될 로직)
    @RequestMapping("/notify")
    public ResponseEntity<String> sendNotification(String message) {
        System.out.println(message);
        sseEmitterService.sendNotificationToClients(message);
        return ResponseEntity.ok("Notification sent!");
    }

}