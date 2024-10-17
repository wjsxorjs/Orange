package com.sist.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sist.back.service.AddressService;
import com.sist.back.service.TownService;
import com.sist.back.vo.TownVO;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/address")
public class AddressController {

    @Autowired
    AddressService addressService;

    @Autowired
    TownService townService;

    // 민호-유저 주소 얻기
    @PostMapping("/getAddress")
    public Map<String, Object> getAddress(@RequestParam String userkey) {
        Map<String, Object> res = new HashMap<>();
        res.put("getAddress", addressService.getAddressByUserkey(userkey));
        return res;
    }

    // 민호-대표 동네 변경
    @GetMapping("/changeSelected")
    public Map<String, Object> changeSelected(@RequestParam String userkey) {
        Map<String, Object> res = new HashMap<>();
        res.put("issuccess", addressService.changeSelected(userkey));
        return res;
    }

    // 민호-주소 삭제
    @GetMapping("/deleteAddress")
    public Map<String, Object> deleteAddress(@RequestParam String addresskey, String isselected, String userkey) {
        Map<String, Object> res = new HashMap<>();

        int issuccess = addressService.deleteAddress(addresskey);
        if (issuccess > 0) {
            if (isselected.equals("1")) {
                issuccess = addressService.changeSelected(userkey);
            }
        }
        res.put("issuccess", issuccess);
        return res;
    }

    // 민호-주소 추가
    @GetMapping("/addAddress")
    public Map<String, Object> addAddress(@RequestParam String userkey, String region1, String region2,
            String region3, String nowLength) {

        // town 키 찾기
        Map<String, String> searchTown = new HashMap<>();
        TownVO tvo = new TownVO();
        tvo.setRegion1(region1);
        tvo.setRegion2(region2);
        tvo.setRegion3(region3);
        searchTown.put("region1", region1);
        searchTown.put("region2", region2);
        searchTown.put("region3", region3);
        TownVO townVO = townService.searchKeyByRegion(tvo);

        // town 존재하지 않을 경우 추가
        String townKey = "";
        if (townVO == null) {
            townKey = String.valueOf(townService.insertTown(tvo));
        } else {
            townKey = townVO.getTownkey();
        }

        Map<String, Object> res = new HashMap<>();
        // 아무것도 없을 때 추가할 경우 자동으로 [대표] 설정
        if (nowLength.equals("0")) {
            nowLength = "1";
        } else {
            nowLength = "0";
        }
        res.put("issuccess", addressService.addAddress(userkey, townKey, region1, region2, region3, nowLength));

        return res;
    }

    // 민호-주소 변경
    @GetMapping("/modifyAddress")
    public Map<String, Object> modifyAddress(@RequestParam String addresskey, String region1,
            String region2,
            String region3) {

        // town 키 찾기
        Map<String, String> searchTown = new HashMap<>();
        TownVO tvo = new TownVO();
        tvo.setRegion1(region1);
        tvo.setRegion2(region2);
        tvo.setRegion3(region3);
        searchTown.put("region1", region1);
        searchTown.put("region2", region2);
        searchTown.put("region3", region3);
        TownVO townVO = townService.searchKeyByRegion(tvo);

        // town 존재하지 않을 경우 추가
        String townKey = "";
        if (townVO == null) {
            townKey = String.valueOf(townService.insertTown(tvo));
        } else {
            townKey = townVO.getTownkey();
        }

        Map<String, Object> res = new HashMap<>();
        res.put("issuccess", addressService.modifyAddress(addresskey, townKey));

        return res;
    }
}
