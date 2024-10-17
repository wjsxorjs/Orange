package com.sist.back.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface WishlistMapper {
    int isLike(Map<String, Object> w_map);

    int addLike(Map<String, Object> w_map);

    int delLike(Map<String, Object> w_map);
}