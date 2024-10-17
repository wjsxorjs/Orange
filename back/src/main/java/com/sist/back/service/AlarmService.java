package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.AlarmMapper;
import com.sist.back.vo.AlarmVO;

@Service
public class AlarmService {
    @Autowired
    private AlarmMapper a_mapper;

    public void addAlarm(String redirection, String message, String category, String userkey){
        a_mapper.addAlarm(redirection, message, category, userkey);
    }

    public List<AlarmVO> getAlarmForUser(String userkey){
        return a_mapper.getAlarmForUser(userkey);
    }

    public int deleteNotifications(String message, String redirection){
        return a_mapper.deleteNotifications(message, redirection);
    }

    public int deleteAllAlarms(String userkey){
        return a_mapper.deleteAllAlarms(userkey);
    }
}
