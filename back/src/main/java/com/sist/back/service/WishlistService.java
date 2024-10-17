package com.sist.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

import com.sist.back.mapper.WishlistMapper;

@Service
public class WishlistService {

    @Autowired
    WishlistMapper w_mapper;

    public int isLike(Map<String, Object> w_map) {
        return w_mapper.isLike(w_map);
    }

    public int toggleLike(boolean isLike, Map<String, Object> w_map) {
        int result = 0;
        if (isLike) {
            result = w_mapper.delLike(w_map);
        } else {
            result = w_mapper.addLike(w_map);
        }
        return result;
    }

}