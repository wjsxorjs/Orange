package com.sist.back.redis.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sist.back.vo.ChattingVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessageSendingOperations messageTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String publishMessage = redisTemplate
                    .getStringSerializer()
                    .deserialize(message.getBody());

            ChattingVO roomMessage = objectMapper.readValue(publishMessage, ChattingVO.class);
            messageTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getChatroomkey(), roomMessage);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
