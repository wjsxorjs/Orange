package com.sist.back.vo;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BoardVO {
    private String boardkey, userkey, townkey, categorykey, title, content, viewqty, likeqty, create_dtm, update_dtm, delete_dtm, isdeleted;
}