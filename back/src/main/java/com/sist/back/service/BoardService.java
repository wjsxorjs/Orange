package com.sist.back.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.sist.back.mapper.BoardMapper;
import com.sist.back.vo.BoardVO;
import com.sist.back.vo.KeyTableVO;

@Service
public class BoardService {

    @Autowired
    private BoardMapper b_mapper;

    public int count(Map b_map) {
        return b_mapper.count(b_map);
    }

    public BoardVO[] search(Map b_map) {
        List<BoardVO> b_list = b_mapper.search(b_map);

        if (b_list != null && !b_list.isEmpty()) {
            BoardVO[] b_ar = new BoardVO[b_list.size()];
            b_list.toArray(b_ar);
            return b_ar;
        }
        return new BoardVO[0];
    }

    public int boardAdd(BoardVO bvo) {
        return b_mapper.boardAdd(bvo);
    }

    public String changeCategoryname(String categoryname) {
        return b_mapper.changeCategoryname(categoryname);
    }

    public int edit(BoardVO bvo) {
        return b_mapper.edit(bvo);
    }
    
    public int emptyAdd(BoardVO bvo) {
        b_mapper.emptyAdd(bvo);
        return Integer.parseInt(bvo.getBoardkey());
    }

    public int deleteLatest(String userkey) {
        return b_mapper.deleteLatest(userkey);
    }

    public BoardVO getBbs(String boardkey) {
        return b_mapper.getBbs(boardkey);
    }


    public int del(String boardkey) {
        return b_mapper.del(boardkey);
    }

    
    // 게시판 카테고리
    public KeyTableVO[] getAllBcList() {
        List<KeyTableVO> bc_list = b_mapper.getAllBcList();
        KeyTableVO[] bc_ar = null;
        if (bc_list != null && !bc_list.isEmpty()) {
            bc_ar = new KeyTableVO[bc_list.size()];
            bc_list.toArray(bc_ar);
        }
        return bc_ar;
    }

    public String getBc(String boardkey) {
        return b_mapper.getBc(boardkey);
    }

    public int addBoardCategory(String value) {
        return b_mapper.addBoardCategory(value);
    }

    public int editBoardCategory(KeyTableVO kvo) {
        return b_mapper.editBoardCategory(kvo);
    }

    public int delBoardCategory1(String value) {
        return b_mapper.delBoardCategory1(value);
    }

    public int delBoardCategory2(String value) {
        return b_mapper.delBoardCategory2(value);
    }

    public BoardVO[] userBbsList(Map<String, Object> b_map){
        BoardVO[] ar = null;
        List<BoardVO> list = b_mapper.userBbsList(b_map);
        if(list!=null&&list.size()>0){
            ar = new BoardVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public int userBbsCount(String categorykey){
        return b_mapper.userBbsCount(categorykey);
    }

    public BoardVO[] searchForNotice(Map<String, Object> map){
        BoardVO[] ar = null;
        List<BoardVO> list = b_mapper.searchForNotice(map);
        if(list!=null&& list.size()>0){
            ar = new BoardVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public int searchForNoticeCount(Map<String, Object> map){
        Integer count = b_mapper.searchForNoticeCount(map);
        return count != null ? count : 0;
    }

    public int todayCount() {
        return b_mapper.todayCount();
    }

    public int selectTodayCount(String categorykey) {
        return b_mapper.selectTodayCount(categorykey);
    }
    
    public int getHit(int boardkey) {
        return b_mapper.getHit(boardkey);
    }

    public int incHit(int boardkey) {
        return b_mapper.incHit(boardkey);
    }

}
