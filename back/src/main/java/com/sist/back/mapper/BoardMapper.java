package com.sist.back.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.BoardVO;
import com.sist.back.vo.KeyTableVO;

@Mapper
public interface BoardMapper {
    int count(Map<String, Object> b_map);

    List<BoardVO> search(Map<String, Object> b_map);

    int boardAdd(BoardVO bvo);

    int edit(BoardVO bvo);

    String changeCategoryname(String categoryname);


    int emptyAdd(BoardVO bvo);

    int deleteLatest(String userkey);

    BoardVO getBbs(String boardkey);


    int del(String boardkey);

    // 게시판 카테고리
    List<KeyTableVO> getAllBcList();

    String getBc(String boardkey);

    int addBoardCategory(String value);

    int editBoardCategory(KeyTableVO kvo);

    int delBoardCategory1(String value);

    int delBoardCategory2(String value);

    //사용자 게시판 가져오기
    List<BoardVO> userBbsList(Map<String, Object> b_map);

    int userBbsCount(String categorykey);

    List<BoardVO> searchForNotice(Map<String,Object> map);

    int searchForNoticeCount(Map<String,Object> map);

    int todayCount();

    int selectTodayCount(String categorykey);

    int getHit(int boardkey);

    int incHit(int boardkey);

}