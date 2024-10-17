package com.sist.back.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.ChattingRoomMapper;
import com.sist.back.repository.ChatRoomRepository;
import com.sist.back.vo.ChatRoomVO;

import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
public class ChatRoomService {

    @Autowired
    ChattingRoomMapper cr_mapper;

    @Lazy
    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public List<ChatRoomVO> chatAll(String userkey) {
        List<ChatRoomVO> list = cr_mapper.chatAll(userkey);
        return list;
    }

    // public int save(String chatroomkey){
    //     return cr_mapper.save(chatroomkey);
    // }

    public int createRoom(ChatRoomVO cvo) {
        int res = cr_mapper.createRoom(cvo);
        if (res > 0) {
            // 채팅방 리스트를 직접 업데이트
            List<ChatRoomVO> chatRooms = new ArrayList<>(); // 새로운 리스트 생성
            chatRooms.add(cvo); // 새로 생성된 채팅방 추가
            chatRoomRepository.updateChatRooms("1", chatRooms); // 캐시에 저장
        }
        return res;
    }

    public String searchPostkey(String chatroomkey){
        return cr_mapper.searchPostkey(chatroomkey);
    }

    public ChatRoomVO checkRoom(ChatRoomVO cvo){
        return cr_mapper.checkRoom(cvo);
    }

}
