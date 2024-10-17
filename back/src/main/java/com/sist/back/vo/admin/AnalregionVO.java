package com.sist.back.vo.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnalregionVO {
    String townkey, region1, region2, region3, isdeleted;
    int u_cnt, p_cnt, d_cnt, d_price;
}
