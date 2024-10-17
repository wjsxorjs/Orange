package com.sist.back.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.PostImgVO;

@Mapper
public interface PostimgMapper {

    PostImgVO[] all();

    int addPostImg(PostImgVO vo);
}