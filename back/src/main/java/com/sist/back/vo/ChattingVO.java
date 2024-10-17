package com.sist.back.vo;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChattingVO implements Serializable {

    private String chattingkey, chatroomkey, chattingimgkey, chattingemojikey, hope_lati, hope_long, hope_place, hope_time, appointkey, content, userkey1, userkey2, isbuyerread, issellerread, create_dtm, update_dtm, delete_dtm, isdeleted;

    private String userkey;
    private String img_url;

    private String chattingimg_url;

    private String newchat;
}
