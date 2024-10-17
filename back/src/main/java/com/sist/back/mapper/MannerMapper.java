package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.ReviewListVO;

@Mapper
public interface MannerMapper {
    List<ReviewListVO> getManner(String userkey);

    List<ReviewListVO> getPraiseList();

    int praiseUser(String userkey, String estimateUser,String listKey);

    List<ReviewListVO> getDisapproveList();

    int disapproveUser(String userkey, String estimateUser,String listKey);

    int setMannerTemp(String userkey);

}