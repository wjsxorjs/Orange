package com.sist.back.dto;

import java.util.List;

import com.sist.back.vo.ChattingVO;
import com.sist.back.vo.PostImgVO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomWithPostDTO {
    private List<ChattingVO> chattingList;
    private PostImgVO pvo;
    
    public ChatRoomWithPostDTO(List<ChattingVO> chattingList, PostImgVO pvo){
        this.chattingList = chattingList;
        this.pvo = pvo;
    }
}
