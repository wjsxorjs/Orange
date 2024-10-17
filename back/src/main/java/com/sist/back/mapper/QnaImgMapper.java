package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QnaImgMapper {
    int questionImgSave(String qnakey, String fname, String imgweburl);

    int questionImgDelete(List<String> imgweburl, String qnakey);

    List<String> getImgurl(String qnakey);
}
