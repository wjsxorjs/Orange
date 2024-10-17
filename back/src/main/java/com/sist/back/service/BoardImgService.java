package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.BoardImgMapper;

@Service
public class BoardImgService {
    @Autowired
    BoardImgMapper mapper;

    public int BoardImgSave(String boardkey, String fname, String imgweburl){
        return mapper.BoardImgSave(boardkey, fname, imgweburl);
    }

    public int BoardImgDelete(List<String> imgweburl, String boardkey){
        return mapper.BoardImgDelete(imgweburl, boardkey);
    }

    public List<String> getImgurl(String boardkey) {
        List<String> bi_list = mapper.getImgurl(boardkey);
        return bi_list;
    }
}

