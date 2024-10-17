package com.sist.back.controller;

import java.io.File;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;

import com.sist.back.service.BoardImgService;
import com.sist.back.service.BoardService;
import com.sist.back.util.FileRenameUtil;
import com.sist.back.util.Paging;
import com.sist.back.vo.BoardVO;
import com.sist.back.vo.KeyTableVO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
@RequestMapping("/api/admin/board")
public class BoardController {

    @Value("${server.upload.admin.board.image}")
    private String upload;

    @Autowired
    private BoardService b_service;

    @Autowired
    private BoardImgService bi_service;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpSession session;

    @RequestMapping("/list")
    @ResponseBody
    public Map<String, Object> list(String title, String categoryName, String create_start_date, String create_end_date,
            String cPage) {
        Map<String, Object> b_map = new HashMap<>();
        b_map.put("title", title);
        b_map.put("categoryName", categoryName);
        b_map.put("create_start_date", create_start_date);
        b_map.put("create_end_date", create_end_date);

        int totalRecord = b_service.count(b_map);

        Paging page = new Paging(5, 3);
        page.setTotalRecord(totalRecord);

        int nowPage = 1;
        if (cPage != null) {
            page.setNowPage(Integer.parseInt(cPage));
        } else {
            page.setNowPage(1);
        }
        nowPage = page.getNowPage();

        int begin = page.getBegin();
        int end = page.getEnd();
        b_map.put("begin", begin);
        b_map.put("end", end);
        BoardVO[] b_ar = b_service.search(b_map);

        Map<String, Object> map = new HashMap<>();
        map.put("b_ar", b_ar);
        map.put("page", page);
        map.put("totalPage", page.getTotalPage());
        map.put("totalRecord", page.getTotalRecord());
        map.put("nowPage", nowPage);
        map.put("numPerPage", page.getNumPerPage());

        return map;
    }

    @RequestMapping("/add")
    @ResponseBody
    public Map<String, Object> boardAdd(BoardVO bvo, String categoryname) {
        Map<String, Object> map = new HashMap<>();

        bvo.setViewqty("0");
        bvo.setCategorykey(b_service.changeCategoryname(categoryname));

        int chk = b_service.boardAdd(bvo);

        List<String> list = new ArrayList<>();
        String regex = "<img[^>]+src=\"([^\"]+)\"";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(bvo.getContent());
        while (matcher.find()) {
            list.add(matcher.group(1));
        }
        bi_service.BoardImgDelete(list, bvo.getBoardkey());
        map.put("chk", chk);
        return map;
    }

    @RequestMapping("/addImage")
    @ResponseBody
    public Map<String, Object> add(MultipartFile file, HttpServletRequest request, String boardkey) {
        Map<String, Object> map = new HashMap<>();
        try {
            MultipartFile f = file;

            String fname = FileRenameUtil.checkSameFileName(f.getOriginalFilename(), upload);
            // String webPath = "http://localhost:3000/img/admin/board/";
            String webPath = "/img/admin/board/";
            String sendFname = URLEncoder.encode(fname, StandardCharsets.UTF_8.toString()).replace("+", "%20");

            StringBuffer sb = new StringBuffer();
            sb.append(upload);
            sb.append("/");
            sb.append(fname);
            String imglocalPath = sb.toString();

            sb = new StringBuffer();
            sb.append(webPath);
            sb.append(sendFname);
            String imgWebPath = sb.toString();
            f.transferTo(new File(imglocalPath));

            map.put("chk", 1);
            map.put("filePath", imgWebPath);

            int chk = bi_service.BoardImgSave(boardkey, fname, imgWebPath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }

    @RequestMapping("/deleteImage")
    @ResponseBody
    public Map<String, Object> deleteImage(@RequestBody Map<String, String> data) {
        Map<String, Object> map = new HashMap<>();
        String imageUrl = data.get("imageUrl");

        try {
            String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
            String filePath = upload + "/" + fileName;

            File file = new File(filePath);
            if (file.exists()) {
                file.delete();
                map.put("chk", 1);
            } else {
                map.put("chk", 0);
                map.put("msg", "이미지 파일을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("chk", 0);
            map.put("msg", "이미지 삭제 중 오류 발생");
        }
        return map;
    }

    @RequestMapping("/edit")
    @ResponseBody
    public Map<String, Object> edit(BoardVO bvo, String categoryname) {
        System.out.println("content: " + bvo.getContent());
        Map<String, Object> map = new HashMap<>();

        bvo.setCategorykey(b_service.changeCategoryname(categoryname));

        List<String> list = new ArrayList<>();
        String regex = "<img[^>]+src=\"([^\"]+)\"";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(bvo.getContent());
        while (matcher.find()) {
            list.add(matcher.group(1));
        }
        bi_service.BoardImgDelete(list, bvo.getBoardkey());

        int cnt = b_service.edit(bvo);

        if (bvo.getContent() != null) {
            matcher = pattern.matcher(bvo.getContent());
            List<String> newImgList = new ArrayList<>();
            while (matcher.find()) {
                String imgUrl = matcher.group(1);
                newImgList.add(imgUrl);
                String fname = imgUrl.substring(imgUrl.lastIndexOf("/") + 1);
                bi_service.BoardImgSave(bvo.getBoardkey(), fname, imgUrl);
            }
        }
        if (cnt > 0) {
            map.put("chk", 1);
        } else {
            map.put("chk", 0);
        }
        map.put("cnt", cnt);
        return map;
    }

    @RequestMapping("/empty")
    @ResponseBody
    public Map<String, Object> addEmpty(BoardVO bvo) {
        Map<String, Object> map = new HashMap<>();
        bvo.setTownkey("1");
        int boardkey = b_service.emptyAdd(bvo);
        map.put("boardkey", boardkey);
        map.put("chk", 1);
        return map;
    }

    @RequestMapping("/deleteLatest")
    @ResponseBody
    public Map<String, Object> deleteLatest(@RequestBody String userkey) {
        Map<String, Object> map = new HashMap<>();
        int chk = b_service.deleteLatest(userkey);
        map.put("chk", chk);
        return map;
    }

    @RequestMapping("/getBbs")
    @ResponseBody
    public Map<String, Object> getBbs(@RequestParam String boardkey) {
        Map<String, Object> map = new HashMap<>();
        BoardVO bvo = b_service.getBbs(boardkey);
        map.put("bvo", bvo);
        return map;
    }

    @RequestMapping("del")
    @ResponseBody
    public Map<String, Object> del(String boardkey) {
        Map<String, Object> map = new HashMap<>();
        map.put("cnt", b_service.del(boardkey));
        return map;
    }

    @RequestMapping("/chkDel")
    @ResponseBody
    public Map<String, Object> chkDel(@RequestBody List<String> boardkeyList) {
        Map<String, Object> map = new HashMap<>();
        for (String boardkey : boardkeyList) {
            b_service.del(boardkey);
        }
        map.put("cnt", boardkeyList.size());
        return map;
    }

    // 게시판 카테고리 관리
    @RequestMapping("/getAllBc")
    @ResponseBody
    public Map<String, Object> getAllBc() {
        Map<String, Object> map = new HashMap<>();
        KeyTableVO[] bc_list = b_service.getAllBcList();
        map.put("bc_list", bc_list);
        return map;
    }

    @RequestMapping("/getBc")
    @ResponseBody
    public Map<String, Object> getBc(String boardkey) {
        Map<String, Object> map = new HashMap<>();
        String categoryname = b_service.getBc(boardkey);
        map.put("categoryname", categoryname);
        return map;
    }

    @RequestMapping("/addBc")
    @ResponseBody
    public Map<String, Object> addBc(String value) {
        Map<String, Object> map = new HashMap<>();
        map.put("value", b_service.addBoardCategory(value));
        return map;
    }

    @RequestMapping("/editBc")
    @ResponseBody
    public Map<String, Object> editBc(KeyTableVO kvo) {
        Map<String, Object> map = new HashMap<>();
        map.put("cnt", b_service.editBoardCategory(kvo));
        return map;
    }

    @RequestMapping("/chkDelBc")
    @ResponseBody
    public Map<String, Object> chkDelBc(@RequestBody List<String> valueList) {
        Map<String, Object> map = new HashMap<>();
        int cnt = 0;
        for (String value : valueList) {
            int result1 = b_service.delBoardCategory1(value);
            int result2 = b_service.delBoardCategory2(value);
            if (result1 > 0 && result2 > 0) {
                cnt++;
            }
        }
        map.put("cnt", cnt);
        return map;
    }

    @RequestMapping("/userBbsList")
    @ResponseBody
    public Map<String, Object> userBbsList(String categorykey, String cPage) {
        Map<String, Object> map = new HashMap<>();

        Paging p = new Paging(5, 3); // 페이징 객체 생성
        int totalRecord = b_service.userBbsCount(categorykey);
        p.setTotalRecord(totalRecord);

        if (cPage != null) {
            p.setNowPage(Integer.parseInt(cPage));
        } else {
            p.setNowPage(1);
        }
        Map<String, Object> b_map = new HashMap<>();
        b_map.put("categorykey", categorykey);
        b_map.put("begin", String.valueOf(p.getBegin()));
        b_map.put("end", String.valueOf(p.getEnd()));

        BoardVO[] ar = b_service.userBbsList(b_map);
        map.put("ar", ar);
        map.put("page", p);
        map.put("totalPage", p.getTotalPage());
        map.put("totalRecord", p.getTotalRecord());
        map.put("numPerPage", p.getNumPerPage());
        return map;
    }

    // 사용자 공지사항 검색
    @RequestMapping("/searchForNotice")
    @ResponseBody
    public Map<String, Object> searchForNotice(String title, String categorykey, String cPage) {
        Map<String, Object> map = new HashMap<>();
        Map<String, Object> b_map = new HashMap<>();
        b_map.put("title", title);
        b_map.put("categorykey", categorykey);

        Paging p = new Paging(5, 3); // 페이징 객체 생성
        int totalRecord = b_service.searchForNoticeCount(b_map);
        p.setTotalRecord(totalRecord);

        // cPage가 null이거나 변환이 안될 경우 기본값 1을 사용
        try {
            p.setNowPage(Integer.parseInt(cPage));
        } catch (NumberFormatException | NullPointerException e) {
            p.setNowPage(1);
        }

        b_map.put("categorykey", categorykey);
        b_map.put("begin", String.valueOf(p.getBegin()));
        b_map.put("end", String.valueOf(p.getEnd()));

        BoardVO[] ar = b_service.searchForNotice(b_map);
        if (ar != null) {
            map.put("ar", ar);
            map.put("page", p);
            map.put("totalPage", p.getTotalPage());
            map.put("totalRecord", p.getTotalRecord());
            map.put("numPerPage", p.getNumPerPage());
        }
        return map;
    }

    @RequestMapping("/todayCount")
    @ResponseBody
    public Map<String, Object> todayCount() {
        Map<String, Object> map = new HashMap<>();
        map.put("cnt", b_service.todayCount());
        return map;
    }

    @RequestMapping("/selectTodayCount")
    @ResponseBody
    public Map<String, Object> selectTodayCount(String categorykey) {
        Map<String, Object> map = new HashMap<>();
        map.put("cnt", b_service.selectTodayCount(categorykey));
        return map;
    }

    @RequestMapping("/incHit")
    @ResponseBody
    public Map<String, Object> incHit(int boardkey) {
        Map<String, Object> map = new HashMap<>();
        map.put("boardkey", boardkey);
        map.put("result", b_service.incHit(boardkey));
        map.put("viewqty", b_service.getHit(boardkey));

        return map;
    }
}