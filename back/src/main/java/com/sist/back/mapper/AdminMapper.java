package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

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

@Mapper
public interface AdminMapper {
    TotalVO getTotal();

    List<PostOverviewVO> postOverview(String year);

    List<String> searchYear();

    List<String> postStatusCnt();

    List<UserStatusCntVO> userStatusCnt();

    List<QnaVO> getQnaList();

    List<UserRankVO> getUserRank();

    TodayReportVO todayReport();

    DealStatisticVO dealstatistic();

    List<categoryVO> catedealstatistic(String type);

    List<DealchartVO> dealchart(String type, String start_dtm, String end_dtm);

    List<AnalpostcatepieVO> analpostcatepie(String start_dtm, String end_dtm);

    List<AnaluserbydayVO> analuserbytime(String start_dtm, String end_dtm);

    List<AnaluserbydayVO> analuserbyday(String start_dtm, String end_dtm);

    List<AnalregionVO> analregion(String region1, String region2, String region3);
}
