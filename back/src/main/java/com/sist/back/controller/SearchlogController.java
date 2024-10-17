package com.sist.back.controller;

import org.springframework.web.bind.annotation.RestController;

import com.sist.back.service.SearchlogService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/searchlog")
public class SearchlogController {

    @Autowired
    SearchlogService searchlogService;

    @GetMapping("/getSearchlog")
    public Map<String, Object> getSearchlog() {
        Map<String, Object> res = new HashMap<>();
        res.put("getSearchlog", searchlogService.getSearchlog());
        return res;
    }
}
