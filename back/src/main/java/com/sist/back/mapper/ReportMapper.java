package com.sist.back.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.ReportListVO;

import java.util.List;

@Mapper
public interface ReportMapper {
    List<ReportListVO> getReportList(String ispost, String sequence);

    int reportPost(String reportlistkey, String postkey, String reportuserkey, String content);

    int reportUser(String reportlistkey, String userkey, String reportuserkey, String content);

    int noseeUser(String userkey, String noseeuserkey);

    int chkNosee(String noseeuserkey);
}
