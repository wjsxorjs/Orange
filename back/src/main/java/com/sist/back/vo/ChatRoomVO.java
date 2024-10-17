package com.sist.back.vo;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomVO implements Serializable {
    private String chatroomkey, postkey, offerkey, buyer_userkey, seller_userkey, appointkey, isalarm, istop, isoffer,
            create_dtm, update_dtm, delete_dtm, isdeleted;

    private String appointdate, appointplace, appintlati, appointlong,
            appointcreate_dtm, appointupdate_dtm;

    private userVO cuvo;

    private List<ChattingVO> c_list;
}
