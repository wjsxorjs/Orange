package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.sist.back.vo.userVO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LikeUserVO {
    private String likekey, userkey, likeuserkey, create_dtm;
    private userVO uvo;
}
