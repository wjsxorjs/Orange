package com.sist.back.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.ChattingMapper;
import com.sist.back.mapper.UserMapper;
import com.sist.back.vo.ChattingEmojiVO;
import com.sist.back.vo.ChattingVO;

@Service
public class ChattingService {
    @Autowired
    private ChattingMapper mapper;

    @Autowired
    private UserMapper u_mapper;

    @Autowired
    private final DBChangeService databaseChangeService;

    public ChattingService(DBChangeService databaseChangeService) {
        this.databaseChangeService = databaseChangeService;
    }

    public int addChat(ChattingVO message) {
        String chatroomkey = message.getChatroomkey();
        String redirection = "/chat/room/"+chatroomkey;
        String userkey = message.getUserkey2();
        databaseChangeService.onDatabaseChange(redirection,u_mapper.searchNickname(userkey)+"님에게 메세지가 왔어요!","채팅", userkey);
        return mapper.addChat(message);
    }

    public int addImg(ChattingVO message){
        return mapper.addImg(message);
    }

    public List<ChattingVO> findChatRoom(String chatroomkey) {
        return mapper.findChatRoom(chatroomkey);
    }

    public List<ChattingEmojiVO> getEmoticon(Map<String, Object> map){
        return mapper.getEmoticon(map);
    }

    public String getCountEmoticon(){
        return mapper.getCountEmoticon();
    }

    public List<ChattingEmojiVO> getAllEmoticon(){
        return mapper.getAllEmoticon();
    }

    public int addEmoticon(ChattingEmojiVO cvo){
        return mapper.addEmoticon(cvo);
    }

    public int deleteEmoticon(String chattingemojikey){
        return mapper.deleteEmoticon(chattingemojikey);
    }

    public int isRead(String userkey, String chatroomkey){
        return mapper.isRead(userkey,chatroomkey);
    }
}
