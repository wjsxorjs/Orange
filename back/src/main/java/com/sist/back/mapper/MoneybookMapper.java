package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.PostVO;
import com.sist.back.vo.userVO;

@Mapper
public interface MoneybookMapper {
    
    userVO getuserVO(String userkey);
    List<PostVO> getBuyList(String userkey, String today);
    List<PostVO> getSellList(String userkey, String today);
    List<PostVO> getGiveList(String userkey, String today);
    List<PostVO> getGetList(String userkey, String today);

    List<userVO> getNeightbors(String userkey);
    List<PostVO> getNeightborsTrade(String userkey, String today);
    List<PostVO> getNeightborsGive(String userkey, String today);


}
