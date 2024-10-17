package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.MoneybookMapper;
import com.sist.back.vo.PostVO;
import com.sist.back.vo.userVO;

@Service
public class MoneybookService {
    
    @Autowired
    MoneybookMapper mb_mapper;

    public userVO getuserVO(String userkey) {
        return mb_mapper.getuserVO(userkey);
    }
    public List<PostVO> getBuyList(String userkey, String today) {
        return mb_mapper.getBuyList(userkey, today);
    }
    public List<PostVO> getSellList(String userkey, String today) {
        return mb_mapper.getSellList(userkey, today);
    }
    public List<PostVO> getGiveList(String userkey, String today) {
        return mb_mapper.getGiveList(userkey, today);
    }
    public List<PostVO> getGetList(String userkey, String today) {
        return mb_mapper.getGetList(userkey, today);
    }

    public List<userVO> getNeightbors(String userkey) {
        return mb_mapper.getNeightbors(userkey);
    }
    public List<PostVO> getNeightborsTrade(String userkey, String today) {
        return mb_mapper.getNeightborsTrade(userkey, today);
    }
    public List<PostVO> getNeightborsGive(String userkey, String today) {
        return mb_mapper.getNeightborsGive(userkey, today);
    }

    
    
}
