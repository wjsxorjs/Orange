package com.sist.back.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sist.back.service.AdminService;
import com.sist.back.service.PostService;
import com.sist.back.vo.admin.AnalpostcatepieVO;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/api/ad")
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    PostService postService;

    @GetMapping("/getTotal")
    public Map<String, Object> getTotal() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_getTotal", adminService.getTotal());
        return res;
    }

    @GetMapping("/searchYear")
    public Map<String, Object> searchYear() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_searchYear", adminService.searchYear());
        return res;
    }

    @GetMapping("/postOverview")
    public Map<String, Object> postOverview(String year) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_postOverview", adminService.postOverview(year));
        return res;
    }

    @GetMapping("/postStatusCnt")
    public Map<String, Object> postStatusCnt() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_postStatusCnt", adminService.postStatusCnt());
        return res;
    }

    @GetMapping("/userStatusCnt")
    public Map<String, Object> userStatusCnt() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_userStatusCnt", adminService.userStatusCnt());
        return res;
    }

    @GetMapping("/getQnaList")
    public Map<String, Object> getQnaList() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_getQnaList", adminService.getQnaList());
        return res;
    }

    @GetMapping("/getUserRank")
    public Map<String, Object> getUserRank() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_getUserRank", adminService.getUserRank());
        return res;
    }

    @GetMapping("/getTop4")
    public Map<String, Object> getTop4() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_getTop4", postService.getTop4());
        return res;
    }

    @GetMapping("/todayReport")
    public Map<String, Object> todayReport() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_todayReport", adminService.todayReport());
        return res;
    }

    @GetMapping("/dealstatistic")
    public Map<String, Object> dealstatistic() {
        Map<String, Object> res = new HashMap<>();
        res.put("res_dealstatistic", adminService.dealstatistic());
        return res;
    }

    @GetMapping("/catedealstatistic")
    public Map<String, Object> catedealstatistic(String type) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_catedealstatistic", adminService.catedealstatistic(type));
        return res;
    }

    @GetMapping("/postTop10Statistic")
    public Map<String, Object> postTop10Statistic(String type, String dateType) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_postTop10Statistic", postService.postTop10Statistic(type, dateType));
        return res;
    }

    @GetMapping("/dealchart")
    public Map<String, Object> dealchart(String type, String start_dtm, String end_dtm) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_dealchart", adminService.dealchart(type, start_dtm, end_dtm));
        return res;
    }

    @GetMapping("/analpostcatepie")
    public Map<String, Object> analpostcatepie(String start_dtm, String end_dtm) {
        List<AnalpostcatepieVO> list = adminService.analpostcatepie(start_dtm, end_dtm);
        List<AnalpostcatepieVO> cntList = list.stream()
                .sorted(Comparator.comparingInt(AnalpostcatepieVO::getCnt).reversed()) // cnt 역순 정렬
                .limit(10) // 상위 10개 항목만 자름
                .collect(Collectors.toList());
        List<AnalpostcatepieVO> priceList = list.stream()
                .sorted(Comparator.comparingInt(AnalpostcatepieVO::getPrice).reversed()) // cnt 역순 정렬
                .limit(10) // 상위 10개 항목만 자름
                .collect(Collectors.toList());
        Map<String, Object> res = new HashMap<>();
        res.put("res_resList", list);
        res.put("res_cntList", cntList);
        res.put("res_priceList", priceList);
        return res;
    }

    @GetMapping("/analuserbytime")
    public Map<String, Object> analuserbytime(String start_dtm, String end_dtm) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_analuserbytime", adminService.analuserbytime(start_dtm, end_dtm));
        return res;
    }

    @GetMapping("/analuserbyday")
    public Map<String, Object> analuserbyday(String start_dtm, String end_dtm) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_analuserbyday", adminService.analuserbyday(start_dtm, end_dtm));
        return res;
    }

    @GetMapping("/analregion")
    public Map<String, Object> analregion(String region1, String region2, String region3) {
        Map<String, Object> res = new HashMap<>();
        res.put("res_analregion", adminService.analregion(region1, region2, region3));
        return res;
    }

}
