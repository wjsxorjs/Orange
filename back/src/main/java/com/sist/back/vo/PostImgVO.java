package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostImgVO {
    private int postimgkey, postkey;
    private String imgurl;
    private String title;
    private String poststatus;
}
