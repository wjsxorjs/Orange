package com.sist.back.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sist.back.service.MannerService;
import com.sist.back.vo.ReviewListVO;

@Controller
@RequestMapping("/api/user/manner")
public class MannerController {
    @Autowired
    private MannerService m_service;

    @RequestMapping("/getManner")
    @ResponseBody
    public Map<String, Object> getManner(String userkey) {
        Map<String, Object> map = new HashMap<>();

        ReviewListVO[] m_ar = m_service.getManner(userkey);
        map.put("m_ar", m_ar);

        return map;
    }

    @RequestMapping("/getPraiseList")
    @ResponseBody
    public Map<String, Object> getPraiseList() {
        Map<String, Object> map = new HashMap<>();

        ReviewListVO[] m_ar = m_service.getPraiseList();
        map.put("p_ar", m_ar);

        return map;
    }

    @RequestMapping("/praiseUser")
    @ResponseBody
    public Map<String, Object> praiseUser(String userkey, String estimateUser, String listKey) {
        Map<String, Object> map = new HashMap<>();
        int result = m_service.praiseUser(userkey, estimateUser, listKey);
        map.put("result", result);

        return map;
    }

    @RequestMapping("/getDisapproveList")
    @ResponseBody
    public Map<String, Object> getDisapproveList() {
        Map<String, Object> map = new HashMap<>();

        ReviewListVO[] m_ar = m_service.getDisapproveList();
        map.put("d_ar", m_ar);

        return map;
    }

    @RequestMapping("/disapproveUser")
    @ResponseBody
    public Map<String, Object> disapproveUser(String userkey, String estimateUser, String listKey) {
        Map<String, Object> map = new HashMap<>();
        int result = m_service.disapproveUser(userkey, estimateUser, listKey);
        map.put("result", result);

        return map;
    }

    @RequestMapping("/setMannerTemp")
    @ResponseBody
    public Map<String, Object> setMannerTemp(String userkey) {
        Map<String, Object> map = new HashMap<>();
        int cnt = m_service.setMannerTemp(userkey);
        map.put("cnt", cnt);
        return map;
    }
}
