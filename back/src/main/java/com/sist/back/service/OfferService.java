package com.sist.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.vo.OfferVO;

import com.sist.back.mapper.OfferMapper;

@Service
public class OfferService {

    @Autowired
    OfferMapper o_mapper;

    public int makePriceOffer(OfferVO ovo) {
        return o_mapper.makePriceOffer(ovo);
    }

}