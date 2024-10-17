package com.sist.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.PostimgMapper;
import com.sist.back.vo.PostImgVO;

@Service
public class PostimgService {

    @Autowired
    PostimgMapper p_mapper;

    public PostImgVO[] all() {
        return p_mapper.all();
    }

    public int addPostImg(PostImgVO vo) {
        return p_mapper.addPostImg(vo);
    }

}
