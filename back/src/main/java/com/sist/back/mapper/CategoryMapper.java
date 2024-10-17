package com.sist.back.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.categoryVO;

@Mapper
public interface CategoryMapper {
    
    categoryVO[] all();
}