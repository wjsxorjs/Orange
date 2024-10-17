package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class KeyTableVO {
    private String autokey, table, column, key, value, isdeleted;
    
    private int count;
}
