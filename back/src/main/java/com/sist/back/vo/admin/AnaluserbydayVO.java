package com.sist.back.vo.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnaluserbydayVO {
    String signup_day, day_name;
    int su_count, pc_count, pd_count;
}
