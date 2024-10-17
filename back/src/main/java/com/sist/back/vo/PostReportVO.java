package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostReportVO {
    private String postreportkey, reportlistkey, postkey, reportuserkey, content, create_dtm;
}
