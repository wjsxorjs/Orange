package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.AlarmVO;

@Mapper
public interface AlarmMapper {
    void addAlarm(String redirection, String message, String category, String userkey);

    List<AlarmVO> getAlarmForUser(String userkey);

    int deleteNotifications(String message, String redirection);

    int deleteAllAlarms(String userkey);
}
