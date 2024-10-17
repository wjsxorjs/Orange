package com.sist.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DBChangeService {

    private final SseEmitterService sseEmitterService;

    @Autowired
    private AlarmService a_service;

    @Autowired
    public DBChangeService(SseEmitterService sseEmitterService) {
        this.sseEmitterService = sseEmitterService;
    }

    // 예시: 데이터베이스에 변동이 생겼을 때 알림을 보내는 메서드
    public void onDatabaseChange(String redirection, String changeMessage, String category, String userkey) {
        // DB에 변동이 생기면 해당 변화를 감지하고 알림 전송
        a_service.addAlarm(redirection, changeMessage, category, userkey);
        sseEmitterService.sendNotificationToClients(changeMessage);
    }
}
