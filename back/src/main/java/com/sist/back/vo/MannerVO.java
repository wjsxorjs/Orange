package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MannerVO {
    private String mannerkey, userkey, reviewlistkey, estimateuserkey, ismanner, chatordeal, contetkey, create_dtm,
            delete_dtm,
            update_dtm, isdeleted;
    private int count;
    private ReviewListVO rvo;
    private userVO uvo;
}
