package com.sist.back.dto;
import java.util.List;

import com.sist.back.vo.ChatRoomVO;
import com.sist.back.vo.userVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomWithImgUrlDTO {
    private List<ChatRoomVO> chatRooms;
    private List<userVO> user_list;
    private userVO my_info;

    public ChatRoomWithImgUrlDTO(List<ChatRoomVO> chatRooms, List<userVO> user_list, userVO my_info) {
        this.chatRooms = chatRooms;
        this.user_list = user_list;
        this.my_info = my_info;
    }
}
