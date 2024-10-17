package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.AdminMapper;
import com.sist.back.vo.QnaVO;
import com.sist.back.vo.categoryVO;
import com.sist.back.vo.admin.AnalpostcatepieVO;
import com.sist.back.vo.admin.AnalregionVO;
import com.sist.back.vo.admin.AnaluserbydayVO;
import com.sist.back.vo.admin.DealStatisticVO;
import com.sist.back.vo.admin.DealchartVO;
import com.sist.back.vo.admin.PostOverviewVO;
import com.sist.back.vo.admin.TodayReportVO;
import com.sist.back.vo.admin.TotalVO;
import com.sist.back.vo.admin.UserRankVO;
import com.sist.back.vo.admin.UserStatusCntVO;

@Service
public class AdminService {

    @Autowired
    AdminMapper adminMapper;

    public TotalVO getTotal() {
        return adminMapper.getTotal();
    }

    public List<PostOverviewVO> postOverview(String year) {
        return adminMapper.postOverview(year);
    }

    public List<String> searchYear() {
        return adminMapper.searchYear();
    }

    public List<String> postStatusCnt() {
        return adminMapper.postStatusCnt();
    }

    public List<UserStatusCntVO> userStatusCnt() {
        return adminMapper.userStatusCnt();
    }

    public List<QnaVO> getQnaList() {
        return adminMapper.getQnaList();
    }

    public List<UserRankVO> getUserRank() {
        return adminMapper.getUserRank();
    }

    public TodayReportVO todayReport() {
        return adminMapper.todayReport();
    }

    public DealStatisticVO dealstatistic() {
        return adminMapper.dealstatistic();
    }

    public List<categoryVO> catedealstatistic(String type) {
        return adminMapper.catedealstatistic(type);
    }

    public List<DealchartVO> dealchart(String type, String start_dtm, String end_dtm) {
        return adminMapper.dealchart(type, start_dtm, end_dtm);
    }

    public List<AnalpostcatepieVO> analpostcatepie(String start_dtm, String end_dtm) {
        return adminMapper.analpostcatepie(start_dtm, end_dtm);
    }

    public List<AnaluserbydayVO> analuserbytime(String start_dtm, String end_dtm) {
        return adminMapper.analuserbytime(start_dtm, end_dtm);
    }

    public List<AnaluserbydayVO> analuserbyday(String start_dtm, String end_dtm) {
        return adminMapper.analuserbyday(start_dtm, end_dtm);
    }

    public List<AnalregionVO> analregion(String region1, String region2, String region3) {
        return adminMapper.analregion(region1, region2, region3);
    }
}
