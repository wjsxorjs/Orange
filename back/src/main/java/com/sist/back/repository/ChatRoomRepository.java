package com.sist.back.repository;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import com.sist.back.service.ChatRoomService;
import com.sist.back.service.ChattingService;
import com.sist.back.vo.ChatRoomVO;
import com.sist.back.vo.ChattingVO;

import jakarta.annotation.PostConstruct;

import java.util.*;

@RequiredArgsConstructor
@Repository
public class ChatRoomRepository {
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private static final String CHATTING = "CHATTING";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, List<ChatRoomVO>> opsHashChatRoom;
    private HashOperations<String, String, List<ChattingVO>> opsHashChatting;
    @Autowired
    ChatRoomService cr_service;

    @Autowired
    ChattingService c_service;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash(); // redis의 해시자료구조를 사용해 채팅방 데이터를 처리하기 위한 초기화
        opsHashChatting = redisTemplate.opsForHash(); // redis의 해시자료구조를 사용해 채팅방 데이터를 처리하기 위한 초기화
    }

    public List<ChatRoomVO> findAll(String userkey) {
        List<ChatRoomVO> chatRooms = opsHashChatRoom.get(CHAT_ROOMS, userkey); // 목록에 채팅방 리스트를(중요) 불러올 때 캐시로 확인
        if (chatRooms == null) {
            opsHashChatRoom.put(CHAT_ROOMS, userkey, cr_service.chatAll(userkey));
            chatRooms = cr_service.chatAll(userkey);
        }
        return chatRooms;
    }

    public List<ChattingVO> findById(String chatroomkey) {
        List<ChattingVO> chatList = opsHashChatting.get(CHATTING, chatroomkey); // 채팅방의 채팅을 불러올 때(중요) 캐시로 확인
        if (chatList == null) {
            opsHashChatting.put(CHAT_ROOMS, chatroomkey, chatList);// Redis에 캐싱
            chatList = c_service.findChatRoom(chatroomkey); // DB에서 조회
            // 나중에 캐시를 확인할 때 opsHashChatting.get(CHATTING, chatroomkey) 이걸로 확인해 chatList를
            // 가져온다.
        }
        return chatList;
    }

    public void updateChatRooms(String userkey, List<ChatRoomVO> chatRooms) {
        List<ChatRoomVO> existingChatRooms = opsHashChatRoom.get(CHAT_ROOMS, userkey);
        if (existingChatRooms == null) {
            existingChatRooms = new ArrayList<>();
        }
        existingChatRooms.addAll(chatRooms);
        opsHashChatRoom.put(CHAT_ROOMS, userkey, existingChatRooms);
    }

    // public void save(ChatRoomVO chatRoom) {
    // cr_service.save(chatRoom); // DB에 저장
    // opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom); // Redis에 저장
    // }
}
