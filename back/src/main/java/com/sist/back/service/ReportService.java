package com.sist.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.ReportMapper;
import com.sist.back.vo.ReportListVO;
import java.util.List;

@Service
public class ReportService {
    @Autowired
    private ReportMapper r_mapper;

    public ReportListVO[] getReportList(String ispost, String sequence) {
        List<ReportListVO> r_list = r_mapper.getReportList(ispost, sequence);
        ReportListVO[] r_ar = null;
        if (r_list != null && r_list.size() > 0) {
            r_ar = new ReportListVO[r_list.size()];
            r_list.toArray(r_ar);
        }
        return r_ar;
    }

    public int reportPost(String reportlistkey, String postkey, String reportuserkey, String content) {
        return r_mapper.reportPost(reportlistkey, postkey, reportuserkey, content);
    }

    public int reportUser(String reportlistkey, String userkey, String reportuserkey, String content) {
        return r_mapper.reportUser(reportlistkey, userkey, reportuserkey, content);
    }

    public int noseeUser(String userkey, String noseeuserkey) {
        return r_mapper.noseeUser(userkey, noseeuserkey);
    }

    public int chkNosee(String noseeuserkey) {
        return r_mapper.chkNosee(noseeuserkey);
    }
} 
