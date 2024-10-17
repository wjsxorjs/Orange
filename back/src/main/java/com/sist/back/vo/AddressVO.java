package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressVO {
    String addresskey, userkey, townkey, isselected, iscertified, range, isalarm;
    TownVO tvo;
}
