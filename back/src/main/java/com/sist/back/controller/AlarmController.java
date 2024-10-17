package com.sist.back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.sist.back.service.AlarmService;
import com.sist.back.vo.AlarmVO;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api")
public class AlarmController {
    @Autowired
    private AlarmService a_service;

    @RequestMapping("/alarm")
    public ResponseEntity<List<AlarmVO>> getMethodName(String userkey) {
        List<AlarmVO> list = a_service.getAlarmForUser(userkey);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping("/deleteNotification")
    @ResponseBody
    public int deleteNotification(String message, String redirection) {
        return a_service.deleteNotifications(message, redirection);
    }

    @RequestMapping("/deleteAllAlarms")
    @ResponseBody
    public int deleteAllAlarms(String userkey) {
        return a_service.deleteAllAlarms(userkey);
    }

}
