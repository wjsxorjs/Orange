package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.QnaImgMapper;

@Service
public class QnaImgService {
    
    @Autowired
    private QnaImgMapper qi_mapper;

        public int questionImgSave(String qnakey, String fname, String imgweburl){
        return qi_mapper.questionImgSave(qnakey, fname, imgweburl);
    }

    public int questionImgDelete(List<String> imgweburl, String qnakey){
        return qi_mapper.questionImgDelete(imgweburl, qnakey);
    }

    public List<String> getImgurl(String qnakey) {
        List<String> qi_list = qi_mapper.getImgurl(qnakey);
        return qi_list;
    }
}
