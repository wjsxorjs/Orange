package com.sist.back.vo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OfferVO {
    private int offerkey, postkey, offeruserkey, price, offerstatus, isdeleted;
    private String create_dtm, update_dtm, delete_dtm;
    private userVO ouvo;
}
