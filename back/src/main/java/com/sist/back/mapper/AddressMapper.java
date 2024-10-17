package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.AddressVO;

@Mapper
public interface AddressMapper {

    public List<AddressVO> getAddressByUserkey(String userkey);

    int changeSelected(String userkey);

    int deleteAddress(String addresskey);

    int addAddress(String userkey, String townkey, String region1, String region2, String region3, String nowLength);

    int modifyAddress(String addresskey, String townkey);
}
