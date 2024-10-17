package com.sist.back.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.QnaVO;

@Mapper
public interface QnaMapper {
    int emptyAdd(QnaVO qvo);

    int question(QnaVO qvo);

    int deleteLatest(String userkey);

    int answer(QnaVO qvo);

    int delete(String qnakey);

    List<QnaVO> all(Map<String, Object> q_map);

    List<QnaVO> search(Map<String, Object> q_map);

    int searchCount(Map<String, Object> q_map);

    List<QnaVO> select(Map<String, Object> q_map);

    List<QnaVO> userAll(Map<String, Object> q_map);

    int userCount(String userkey);

    int count();
    
    int selectCount(String isanswered);

    QnaVO getQuestion(String qnakey);

    int todayCount();

    int selectTodayCount(String isanswered);

}

