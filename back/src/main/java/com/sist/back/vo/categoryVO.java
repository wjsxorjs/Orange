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
public class categoryVO {
    private String categorykey, upcategoryname, categoryname, img_url, create_dtm, update_dtm, delete_dtm, isdeleted;

    private MultipartFile file;

    // Admin 통계용
    String dealcnt;
    String dealprice;
}
