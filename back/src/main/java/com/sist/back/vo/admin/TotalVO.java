package com.sist.back.vo.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TotalVO {
    String cntPost, cntUser, cntBbs, cntQna, cntPostYear, cntUserYear, cntBbsYear, cntQnaDay;
}
