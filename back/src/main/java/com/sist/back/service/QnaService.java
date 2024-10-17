package com.sist.back.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.QnaMapper;
import com.sist.back.vo.QnaVO;

@Service
public class QnaService {
    @Autowired
    private QnaMapper q_mapper;

    public int emptyAdd(QnaVO qvo) {
        q_mapper.emptyAdd(qvo);
        return Integer.parseInt(qvo.getQnakey());
    }

    public int question(QnaVO qvo) {
        return q_mapper.question(qvo);
    }

    public int deleteLatest(String userkey) {
        return q_mapper.deleteLatest(userkey);
    }

    public int answer(QnaVO qvo) {
        return q_mapper.answer(qvo);
    }

    public int delete(String qnakey) {
        return q_mapper.delete(qnakey);
    }

    public QnaVO[] all(Map q_map) {
        List<QnaVO> q_list = q_mapper.all(q_map);
        QnaVO[] q_ar = null;
        if (q_list != null && !q_list.isEmpty()) {
            q_ar = new QnaVO[q_list.size()];
            q_list.toArray(q_ar);
        }
        return q_ar;
    }

    public QnaVO[] search(Map q_map) {
        List<QnaVO> q_list = q_mapper.search(q_map);
        QnaVO[] q_ar = null;
        if (q_list != null && !q_list.isEmpty()) {
            q_ar = new QnaVO[q_list.size()];
            q_list.toArray(q_ar);
        }
        return q_ar;
    }

    public int searchCount(Map q_map) {
        return q_mapper.searchCount(q_map);
    }

    public QnaVO[] select(Map q_map) {
        List<QnaVO> q_list = q_mapper.select(q_map);
        QnaVO[] q_ar = null;
        if (q_list != null && !q_list.isEmpty()) {
            q_ar = new QnaVO[q_list.size()];
            q_list.toArray(q_ar);
        }
        return q_ar;
    }

    public List<QnaVO> userAll(Map<String, Object> q_map) {
        return q_mapper.userAll(q_map);
    }

    public int userCount(String userkey) {
        return q_mapper.userCount(userkey);
    }

    public int count() {
        return q_mapper.count();
    }

    public int selectCount(String isanswered) {
        return q_mapper.selectCount(isanswered);
    }

    public QnaVO getQuestion(String qnakey) {
        return q_mapper.getQuestion(qnakey);
    }

    public int todayCount() {
        return q_mapper.todayCount();
    }

    public int selectTodayCount(String isanswered) {
        return q_mapper.selectTodayCount(isanswered);
    }
}

