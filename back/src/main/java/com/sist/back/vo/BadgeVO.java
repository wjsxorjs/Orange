package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BadgeVO {
    private String badgekey, name, imgurl, precontent, postcontent, isrepresentable, create_dtm, update_dtm, delete_dtm, isdeleted;
    private String isrepresent;
}
