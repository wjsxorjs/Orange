package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.AddressMapper;
import com.sist.back.vo.AddressVO;

@Service
public class AddressService {

    @Autowired
    AddressMapper addressMapper;

    // userkey로 Address 목록 가져오기
    public AddressVO[] getAddressByUserkey(String userkey) {
        AddressVO[] ar = null;
        List<AddressVO> list = addressMapper.getAddressByUserkey(userkey);
        if (list != null && list.size() > 0) {
            ar = new AddressVO[list.size()];
            list.toArray(ar);
        }

        return ar;
    }

    public int changeSelected(String userkey) {
        return addressMapper.changeSelected(userkey);
    }

    public int deleteAddress(String addresskey) {
        return addressMapper.deleteAddress(addresskey);
    }

    public int addAddress(String userkey, String townkey, String region1, String region2, String region3,
            String nowLength) {
        return addressMapper.addAddress(userkey, townkey, region1, region2, region3, nowLength);
    }

    public int modifyAddress(String addresskey, String townkey) {
        return addressMapper.modifyAddress(addresskey, townkey);
    }
}
