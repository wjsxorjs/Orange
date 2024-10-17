package com.sist.back.controller;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sist.back.service.TownService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/town")
public class TownController {

    @Autowired
    TownService townService;

    @PostMapping("/postside")
    public Map<String, Object> getMethodName(@RequestBody Map<String, Object> request) {
        String key = (String) request.get("key");
        String value = (String) request.get("value");
        List<String> now = (List<String>) request.get("now"); // 배열을 리스트로 받습니다.

        System.out.println("값: " + value);
        System.out.println("현재: " + now);

        Map<String, Object> pMap = new HashMap<>();
        pMap.put("key", key);
        pMap.put("value", value);
        pMap.put("now", now);

        Map<String, Object> res = new HashMap<>();
        res.put("res_list", townService.searchTownByRegion(pMap));
        return res;
    }

    @GetMapping("/getNearTown")
    public Map<String, Object> getNearTown(@RequestParam String region1, @RequestParam String region2) {
        Map<String, Object> res = new HashMap<>();
        res.put("getNearTown", townService.getNearTown(region1, region2));
        return res;
    }

    @GetMapping("/getAllRegion1")
    public Map<String, Object> getAllRegion1() {
        Map<String, Object> res = new HashMap<>();
        res.put("getAllRegion1", townService.getAllRegion1());
        return res;
    }

    @GetMapping("/getAllRegion2")
    public Map<String, Object> getAllRegion2(String region1) {
        Map<String, Object> res = new HashMap<>();
        res.put("getAllRegion2", townService.getAllRegion2(region1));
        return res;
    }

    @GetMapping("/getAllRegion3")
    public Map<String, Object> getAllRegion3(String region2) {
        Map<String, Object> res = new HashMap<>();
        res.put("getAllRegion3", townService.getAllRegion3(region2));
        return res;
    }
}
