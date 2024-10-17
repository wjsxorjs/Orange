package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QnaVO {
    private String qnakey, userkey, title, content, answer, create_dtm, answer_dtm, delete_dtm, isanswered, isdeleted;
    private userVO uvo;
}