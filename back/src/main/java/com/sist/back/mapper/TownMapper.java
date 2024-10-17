package com.sist.back.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.TownVO;

@Mapper
public interface TownMapper {
    List<TownVO> all();

    TownVO searchKeyByRegion(TownVO tvo);

    int insertTown(TownVO vo);

    TownVO searchTownByKey(int key);

    List<String> searchTownByRegion(Map<String, Object> map);

    List<TownVO> getNearTown(String region1, String region2);

    List<String> getAllRegion1();

    List<String> getAllRegion2(String region1);

    List<String> getAllRegion3(String region2);

}
