package com.sist.back.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sist.back.service.MoneybookService;
import com.sist.back.vo.PostVO;
import com.sist.back.vo.userVO;

@RestController
@RequestMapping("/api/user/moneybook")
public class MoneybookController {

    @Autowired
    MoneybookService mb_service;

    @RequestMapping("getInfos")
    public Map<String, Object> requestMethodName(String userkey, String today) {
        Map<String, Object> mb_map = new HashMap<>();

        userVO uvo = mb_service.getuserVO(userkey);
        List<PostVO> b_list = mb_service.getBuyList(userkey, today);
        List<PostVO> s_list = mb_service.getSellList(userkey, today);
        List<PostVO> gi_list = mb_service.getGiveList(userkey, today);
        List<PostVO> ge_list = mb_service.getGetList(userkey, today);

        List<userVO> n_list = mb_service.getNeightbors(userkey);
        List<PostVO> nt_list = mb_service.getNeightborsTrade(userkey, today);
        List<PostVO> ng_list = mb_service.getNeightborsGive(userkey, today);

        mb_map.put("uvo", uvo);
        mb_map.put("b_list", b_list);
        mb_map.put("s_list", s_list);
        mb_map.put("gi_list", gi_list);
        mb_map.put("ge_list", ge_list);

        mb_map.put("n_list", n_list);
        mb_map.put("nt_list", nt_list);
        mb_map.put("ng_list", ng_list);

        return mb_map;
    }

}
