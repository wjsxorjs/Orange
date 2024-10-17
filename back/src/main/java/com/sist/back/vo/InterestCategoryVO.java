package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class InterestCategoryVO {
    private String rnum, autokey, userkey, categorykey;

    private categoryVO cvo;
}
