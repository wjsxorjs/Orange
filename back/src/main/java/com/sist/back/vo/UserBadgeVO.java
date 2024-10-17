package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserBadgeVO {
    private String userbadgekey, userkey, badgekey, create_dtm, isrepresent;
    private BadgeVO bvo;
}
