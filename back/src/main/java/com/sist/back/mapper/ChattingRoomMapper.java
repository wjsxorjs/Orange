package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.ChatRoomVO;

@Mapper
public interface ChattingRoomMapper {
    
    List<ChatRoomVO> chatAll(String userkey);

    ChatRoomVO save(String chatroomkey);

    int createRoom(ChatRoomVO cvo); 

    String searchPostkey(String chatroomkey);

    ChatRoomVO checkRoom(ChatRoomVO cvo);
}
