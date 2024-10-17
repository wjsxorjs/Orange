package com.sist.back.controller;

import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sist.back.service.PostimgService;

@RestController
@RequestMapping("/api/postimg")
public class PostimgController {

    @Autowired
    PostimgService service;

    @RequestMapping("/all")
    public Map<String, Object> all() {

        Map<String, Object> res = new HashMap<>();
        res.put("postimg_list", service.all());
        return res;
    }

}
