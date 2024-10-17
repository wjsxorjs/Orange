package com.sist.back.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.OfferVO;

@Mapper
public interface OfferMapper {
    int makePriceOffer(OfferVO ovo);
}