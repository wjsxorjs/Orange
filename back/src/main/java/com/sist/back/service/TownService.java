package com.sist.back.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.TownMapper;
import com.sist.back.vo.TownVO;

@Service
public class TownService {

    @Autowired
    TownMapper townMapper;

    public TownVO[] all() {
        TownVO[] ar = null;
        List<TownVO> list = townMapper.all();
        if (list != null && list.size() > 0) {
            ar = new TownVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public TownVO searchKeyByRegion(TownVO tvo) {
        return townMapper.searchKeyByRegion(tvo);
    }

    public int insertTown(TownVO tvo) {
        townMapper.insertTown(tvo);
        return Integer.parseInt(tvo.getTownkey());
    }

    public TownVO searchTownByKey(int key) {
        return townMapper.searchTownByKey(key);
    }

    public String[] searchTownByRegion(Map<String, Object> map) {
        String[] ar = null;
        List<String> list = townMapper.searchTownByRegion(map);
        if (list != null && list.size() > 0) {
            ar = new String[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public String[] getAllRegion1() {
        String[] ar = null;
        List<String> list = townMapper.getAllRegion1();
        if (list != null && list.size() > 0) {
            ar = new String[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public String[] getAllRegion2(String region1) {
        String[] ar = null;
        List<String> list = townMapper.getAllRegion2(region1);
        if (list != null && list.size() > 0) {
            ar = new String[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public String[] getAllRegion3(String region2) {
        String[] ar = null;
        List<String> list = townMapper.getAllRegion3(region2);
        if (list != null && list.size() > 0) {
            ar = new String[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    // userkey로 Address 목록 가져오기
    public TownVO[] getNearTown(String region1, String region2) {
        TownVO[] ar = null;
        List<TownVO> list = townMapper.getNearTown(region1, region2);
        if (list != null && list.size() > 0) {
            ar = new TownVO[list.size()];
            list.toArray(ar);
        }

        return ar;
    }
}
