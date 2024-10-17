package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardImgMapper {
    int BoardImgSave(String boardkey, String fname, String imgweburl);

    int BoardImgDelete(List<String> imgweburl, String boardkey);

    List<String> getImgurl(String boardkey);
}