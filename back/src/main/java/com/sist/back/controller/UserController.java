package com.sist.back.controller;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.sist.back.service.UserService;
import com.sist.back.util.FileRenameUtil;
import com.sist.back.util.Paging;
import com.sist.back.vo.PostVO;
import com.sist.back.vo.UserCountVO;
import com.sist.back.vo.WishlistVO;
import com.sist.back.vo.userVO;

import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import com.sist.back.service.BadgeService;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    ServletContext application;

    @Autowired
    HttpSession session;

    @Autowired
    UserService service;

    @Autowired
    BadgeService b_service;

    @Value("${server.upload.user.image}")
    private String userImgPath;

    // 관리자 유저 카운트 확인
    @RequestMapping("/api/usercount")
    @ResponseBody
    public Map<String, Object> getUserInfo() {
        Map<String, Object> map = new HashMap<>();
        UserCountVO ucvo = service.userForAdmin();
        map.put("ucvo", ucvo);
        return map;
    }

    // 관리자 유저 검색
    @RequestMapping("/api/search_user_admin")
    @ResponseBody
    public Map<String, Object> searchUserForAdmin(String search_type, String type, String regist_start_date,
            String regist_end_date, String isdeleted, String recent_login_start_date, String recent_login_end_date,
            String isauthorized, String cPage) {

        Map<String, String> iMap = new HashMap<>();

        if (type != null && type.length() != 0) {
            iMap.put("search_type", search_type.trim());
            iMap.put("type", type.trim());
        }
        iMap.put("regist_start_date", regist_start_date.trim());
        iMap.put("regist_end_date", regist_end_date.trim());
        iMap.put("recent_login_start_date", recent_login_start_date.trim());
        iMap.put("recent_login_end_date", recent_login_end_date.trim());
        iMap.put("isdeleted", isdeleted.trim());
        iMap.put("isauthorized", isauthorized.trim());

        // 페이징 처리
        Paging p = new Paging(5, 3);
        // 전체 페이지
        p.setTotalRecord(service.searchForAdminPaging(iMap));

        if (cPage != null && !cPage.equals("0")) {
            p.setNowPage(Integer.parseInt(cPage));
        } else {
            p.setNowPage(1);
        }

        iMap.put("begin", String.valueOf(p.getBegin()));
        iMap.put("end", String.valueOf(p.getEnd()));
        userVO[] ar = service.searchForAdmin(iMap);

        Map<String, Object> map = new HashMap<>();
        map.put("ar", ar);
        map.put("page", p);
        map.put("totalPage", p.getTotalPage());
        map.put("totalRecord", p.getTotalRecord());
        map.put("numPerPage", p.getNumPerPage());

        return map;
    }

    // userAdmin 회원 정보 가져오기
    @RequestMapping("/api/admin/userEdit")
    @ResponseBody
    public Map<String, Object> getUserInfoForAdmin(String userkey) {
        Map<String, Object> map = new HashMap<>();
        userVO uvo = service.getUserForAdmin(userkey);
        int userReportCount = service.getReportCountByUserKey(userkey);
        map.put("userReportCount", userReportCount);
        map.put("ar", uvo);

        Paging p = new Paging(5, 3);
        p.setTotalRecord(uvo.getP_list().size());
        map.put("postcount", p.getTotalRecord());
        map.put("pagecount", p.getTotalPage());
        return map;
    }

    // userAdmin 회원 정보 가져오기
    @RequestMapping("/api/admin/getPost")
    @ResponseBody
    public Map<String, Object> getPostForAdmin(String userkey, String cPage, int postCount) {
        Map<String, Object> map = new HashMap<>();
        Paging p = new Paging(5, 3);
        p.setTotalRecord(postCount);
        p.setNowPage(Integer.parseInt(cPage));

        Map<String, Object> p_map = new HashMap<>();
        p_map.put("userkey", userkey);
        p_map.put("begin", String.valueOf(p.getBegin()));
        p_map.put("end", String.valueOf(p.getEnd()));

        map.put("p_list", service.getPostsForAdmin(p_map));
        return map;
    }

    @RequestMapping("/api/mypage/userEdit")
    @ResponseBody
    public Map<String, Object> getUserForMyPage(String userkey) {
        Map<String, Object> map = new HashMap<>();
        userVO uvo = service.getUserForMyPage(userkey);
        map.put("ar", uvo);

        return map;
    }

    // userAdmin 회원 탈퇴
    @RequestMapping("/api/admin/userDel")
    @ResponseBody
    public Map<String, Object> userDel(String userkey) {

        Map<String, Object> map = new HashMap<>();
        int cnt = service.userDelForAdmin(userkey);
        if (cnt > 0) {
            String str = "success";
            map.put("str", str);
        }

        return map;
    }

    // userAdmin 회원 정보 수정
    @RequestMapping("/api/admin/userEditReal")
    @ResponseBody
    public Map<String, Object> userEdit(userVO vo) {

        Map<String, Object> map = new HashMap<>();
        int cnt = service.userEditForAdmin(vo);
        if (cnt > 0) {
            String str = "success";
            map.put("str", str);
        }
        return map;
    }

    // userAdmin 체크된회원 탈퇴
    @RequestMapping("/api/admin/checkUserDel")
    @ResponseBody
    public Map<String, Object> checkUserDel(@RequestBody List<String> userkeys) {

        Map<String, Object> map = new HashMap<>();
        int cnt;
        for (String userkey : userkeys) {
            cnt = service.userDelForAdmin(userkey);
        }

        return map;
    }

    // 계정관리 user정보
    @RequestMapping("/api/getUser")
    @ResponseBody
    public Map<String, Object> getUser(String userkey) {
        Map<String, Object> map = new HashMap<>();
        userVO uvo = service.getUserForAdmin(userkey);
        map.put("uvo", uvo);
        return map;
    }

    // 유저 프로필
    @RequestMapping("/api/getUserProfile")
    @ResponseBody
    public Map<String, Object> getUserProfile(String userkey) {
        Map<String, Object> map = new HashMap<>();
        userVO uvo = service.getUserProfile(userkey);
        map.put("uvo", uvo);
        return map;
    }

    // 계정관리 user정보
    @RequestMapping("/api/FHRBCheck")
    @ResponseBody
    public Map<String, Object> FHRBCheck(String me, String you) {
        Map<String, Object> map = new HashMap<>();
        int f_num = service.F_Check(me, you);

        int n_num = service.N_Check(me, you);
        int b_num = service.B_Check(me, you);
        map.put("isLiked", f_num > 0);
        map.put("isNosee", n_num > 0);
        map.put("isBlocked", b_num > 0);
        return map;
    }

    // 계정관리 user정보
    @RequestMapping("/api/likeIoN")
    @ResponseBody
    public Map<String, Object> likeIoN(String me, String you, Boolean isLiked) {
        Map<String, Object> map = new HashMap<>();
        int l_num = -1;
        if (isLiked) {
            l_num = service.likeN(me, you);
        } else {
            l_num = service.likeI(me, you);
        }
        map.put("isBlocked", l_num);
        return map;
    }

    @RequestMapping("/api/noseeIoN")
    @ResponseBody
    public Map<String, Object> noseeIoN(String me, String you, Boolean isNosee) {
        Map<String, Object> map = new HashMap<>();
        int n_num = -1;
        if (isNosee) {
            n_num = service.noseeN(me, you);
        } else {
            n_num = service.noseeI(me, you);
        }
        map.put("isBlocked", n_num);
        return map;
    }

    @RequestMapping("/api/blockIoN")
    @ResponseBody
    public Map<String, Object> blockIoN(String me, String you, Boolean isBlocked) {
        Map<String, Object> map = new HashMap<>();
        int b_num = -1;
        if (isBlocked) {
            b_num = service.blockN(me, you);
        } else {
            b_num = service.blockI(me, you);
        }
        map.put("isBlocked", b_num);
        return map;
    }

    // jwt token login
    @PostMapping("/api/login")
    @ResponseBody
    public Map<String, Object> login(userVO vo, HttpServletResponse res) {

        Map<String, Object> map = new HashMap<>();
        int cnt = 0; // 아무 작업도 못했어 0 한번했어 1
        String msg = "로그인에 실패하였습니다.";
        userVO uvo = null;

        if (vo.getId() != null) {
            uvo = service.authAndMakeToken(vo.getId(), vo.getPw());
            if (uvo != null) {
                ResponseCookie cookie = ResponseCookie
                        .from("accessToken", uvo.getAccess_token())
                        .path("/")
                        // 개발용
                        .sameSite("None")
                        // 서버용
                        .sameSite("Lax")
                        .httpOnly(false)
                        // 개발용
                        // .secure(true)
                        // 서버용
                        .secure(false)
                        .build();
                res.addHeader("Set-Cookie", cookie.toString());
                cookie = ResponseCookie.from("refreshToken", uvo.getRefresh_token())
                        .path("/")
                        // 개발용
                        .sameSite("None")
                        // 서버용
                        .sameSite("Lax")
                        .httpOnly(false)
                        // 개발용
                        // .secure(true)
                        // 서버용
                        .secure(false)
                        .build();
                res.addHeader("Set-Cookie", cookie.toString());
                cookie = ResponseCookie.from("userkey", uvo.getUserkey())
                        .path("/")
                        // 개발용
                        .sameSite("None")
                        // 서버용
                        .sameSite("Lax")
                        .httpOnly(false)
                        // 개발용
                        // .secure(true)
                        // 서버용
                        .secure(false)
                        .build();
                res.addHeader("Set-Cookie", cookie.toString());

                service.upt_login_dtm(uvo);
                cnt = 1;
                msg = "success";
            }
        }
        map.put("cnt", cnt);
        map.put("msg", msg);
        map.put("uvo", uvo);
        return map;
    }

    // jwt token logout
    @PostMapping("/api/logout")
    @ResponseBody
    public Map<String, Object> logout(HttpServletResponse res) {

        Map<String, Object> map = new HashMap<>();
        // 쿠키에서 accessToken과 refreshToken, userkey를 삭제하여 클라이언트에게 보내야한다.
        ResponseCookie cookie = ResponseCookie.from("accessToken", null)
                .path("/")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(0)
                .build();
        res.addHeader("Set-Cookie", cookie.toString());

        cookie = ResponseCookie.from("refreshToken", null)
                .path("/")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(0)
                .build();
        res.addHeader("Set-Cookie", cookie.toString());

        cookie = ResponseCookie.from("userkey", null)
                .path("/")
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .maxAge(0)
                .build();
        res.addHeader("Set-Cookie", cookie.toString());

        map.put("msg", "로그아웃");
        map.put("totalCount", 0);

        return map;
    }

    @PostMapping("/api/reg")
    @ResponseBody
    public Map<String, Object> reg(userVO vo) {
        Map<String, Object> map = new HashMap<>();

        if (vo.getId() != null) {
            // 사용자가 입력한 비밀번호를 암호화 시킨다.
            // String pw = passwordEncoder.encode(vo.getMPw());

            userVO uvo = service.reg(vo);
            map.put("uvo", uvo);
        }
        return map;
    }

    // kakao_login & reg
    @RequestMapping("/api/kakao/login")
    @ResponseBody
    public Map<String, Object> kakaologin(String email, String nickname, String imgurl, HttpServletResponse res) {
        Map<String, Object> map = new HashMap<>(); // 반환할 맵
        userVO fvo = service.findByemail(email); // 이메일로 회원 검색

        // 회원 정보가 없을 경우 회원가입 처리
        if (fvo == null) {
            fvo = new userVO();
            fvo.setNickname(nickname);
            fvo.setEmail(email);
            fvo.setImgurl(imgurl);
            fvo.setIsauthorized("0");
            String randomId = "user" + System.currentTimeMillis();
            fvo.setId(randomId);

            fvo.setPw(null);

            // 회원가입 처리
            fvo = service.reg(fvo);
        }

        // 로그인 처리
        if (fvo != null) {
            userVO uvo = service.authAndMakeToken(fvo.getId(), null); // 비밀번호는 null로 처리

            if (uvo != null) {
                // accessToken과 refreshToken을 쿠키에 저장
                ResponseCookie accessTokenCookie = ResponseCookie
                        .from("accessToken", uvo.getAccess_token())
                        .path("/")
                        .sameSite("None")
                        .httpOnly(false)
                        .secure(true)
                        .build();
                res.addHeader("Set-Cookie", accessTokenCookie.toString());

                ResponseCookie refreshTokenCookie = ResponseCookie
                        .from("refreshToken", uvo.getRefresh_token())
                        .path("/")
                        .sameSite("None")
                        .httpOnly(false)
                        .secure(true)
                        .build();
                res.addHeader("Set-Cookie", refreshTokenCookie.toString());

                ResponseCookie userkeyCookie = ResponseCookie
                        .from("userkey", uvo.getUserkey())
                        .path("/")
                        .sameSite("None")
                        .httpOnly(false)
                        .secure(true)
                        .build();
                res.addHeader("Set-Cookie", userkeyCookie.toString());

                service.kakao_login_dtm(email);

                map.put("msg", "로그인 성공");
                map.put("uvo", uvo);
                map.put("cnt", 1);
            } else {
                map.put("msg", "토큰 발급 실패");
            }
        } else {
            map.put("msg", "회원가입 실패");
        }
        return map;
    }

    // 사용자 관심목록
    @RequestMapping("/api/likeLists")
    @ResponseBody
    public Map<String, Object> getLikeList(String userkey, String likewhat, String cPage) {
        Map<String, Object> l_map = new HashMap<>();
        // Paging
        Paging page = null;
        switch (likewhat) {
            case "post":
                page = new Paging(5, 3);
                break;
            case "category":
                page = new Paging(3, 1);
                break;
            case "keyword":
                page = new Paging(5, 2);
                break;
        }

        int totalRecord = service.getLikeCount(userkey, likewhat);
        l_map.put("totalCount", totalRecord);
        page.setTotalRecord(totalRecord);
        int nowPage = 1;
        if (cPage != null) {
            nowPage = Integer.parseInt(cPage);
        }
        page.setNowPage(nowPage);

        int begin = page.getBegin();
        int end = page.getEnd();

        l_map.put("page", page);

        Map<String, Object> get_map = new HashMap<>();
        get_map.put("userkey", userkey);
        get_map.put("begin", begin);
        get_map.put("end", end);

        List<WishlistVO> likeList = service.getLikeLists(get_map, likewhat);
        l_map.put("likeList", likeList);
        return l_map;
    }

    @RequestMapping("/api/like/category")
    @ResponseBody
    public Map<String, Object> addLikeCategory(String userkey, String categorykey) {
        Map<String, Object> lc_map = new HashMap<>();
        lc_map.put("result_insert", service.addLikeCategory(userkey, categorykey));
        return lc_map;
    }

    @RequestMapping("/api/like/keyword")
    @ResponseBody
    public Map<String, Object> addLikeKeyword(String userkey, String content) {
        Map<String, Object> lk_map = new HashMap<>();

        giveBadgeFirstKeyword(userkey);

        lk_map.put("result_insert", service.addLikeKeyword(userkey, content));
        return lk_map;
    }

    public int giveBadgeFirstKeyword(String userkey) {
        return b_service.giveBadgeFirstKeyword(userkey);
    }

    // 사용자 구매목록
    @RequestMapping("/api/buyList")
    @ResponseBody
    public Map<String, Object> getBuyList(String userkey, String cPage, String start_date, String end_date) {
        Map<String, Object> bl_map = new HashMap<>();
        Map<String, Object> get_map = new HashMap<>();
        // Paging
        Paging page = new Paging(3, 3);
        get_map.put("userkey", userkey);
        int totalCount = service.getBuyTotalCount(userkey);
        get_map.put("start_date", start_date);
        get_map.put("end_date", end_date);
        int totalRecord = service.getBuyCount(get_map);
        bl_map.put("totalCount", totalCount);
        bl_map.put("totalRecord", totalRecord);
        page.setTotalRecord(totalRecord);
        int nowPage = 1;
        if (cPage != null) {
            nowPage = Integer.parseInt(cPage);
        } else {
        }
        page.setNowPage(nowPage);

        int begin = page.getBegin();
        int end = page.getEnd();

        bl_map.put("page", page);

        get_map.put("begin", begin);
        get_map.put("end", end);

        List<PostVO> buyList = service.getBuyList(get_map);
        bl_map.put("buylist", buyList);
        return bl_map;
    }

    // 사용자 판매목록
    @RequestMapping("/api/cellList")
    @ResponseBody
    public Map<String, Object> getCellList(String userkey, String cPage, String poststatus, String start_date,
            String end_date) {
        Map<String, Object> bl_map = new HashMap<>();
        Map<String, Object> get_map = new HashMap<>();
        // Paging
        Paging page = new Paging(3, 3);
        get_map.put("userkey", userkey);

        int totalCount = service.getCellTotalCount(userkey);
        int cell1Count = service.getCell1TotalCount(userkey);
        int cell2Count = service.getCell2TotalCount(userkey);
        int cell3Count = service.getCell3TotalCount(userkey);
        int cell4Count = service.getCell4TotalCount(userkey);
        bl_map.put("totalCount", totalCount);
        bl_map.put("cell1Count", cell1Count);
        bl_map.put("cell2Count", cell2Count);
        bl_map.put("cell3Count", cell3Count);
        bl_map.put("cell4Count", cell4Count);

        get_map.put("poststatus", poststatus);
        get_map.put("start_date", start_date);
        get_map.put("end_date", end_date);

        int totalRecord = service.getCellCount(get_map);

        bl_map.put("totalRecord", totalRecord);

        page.setTotalRecord(totalRecord);
        int nowPage = 1;
        if (cPage != null) {
            nowPage = Integer.parseInt(cPage);
        } else {
        }
        page.setNowPage(nowPage);

        int begin = page.getBegin();
        int end = page.getEnd();

        bl_map.put("page", page);

        get_map.put("begin", begin);
        get_map.put("end", end);

        List<PostVO> cellList = service.getCellList(get_map);
        bl_map.put("celllist", cellList);
        return bl_map;
    }

    // 사용자 특정사용자목록
    @RequestMapping("/api/lbiUsers")
    @ResponseBody
    public Map<String, Object> getUsersList(String userkey, String cPage, String userType) {
        Map<String, Object> ul_map = new HashMap<>();
        Map<String, Object> get_map = new HashMap<>();
        // Paging
        Paging page = new Paging(5, 3);
        get_map.put("userkey", userkey);
        int user1Count = service.getlikeuserCount(userkey);
        int user2Count = service.getblockeduserCount(userkey);
        int user3Count = service.getnoseeuserCount(userkey);
        ul_map.put("user1Count", user1Count);
        ul_map.put("user2Count", user2Count);
        ul_map.put("user3Count", user3Count);
        ul_map.put("totalCount", user1Count + user2Count + user3Count);

        int totalRecord = 0;
        switch (userType) {
            case "likeUser":
                totalRecord = user1Count;
                break;
            case "blockedUser":
                totalRecord = user2Count;
                break;
            case "noseeUser":
                totalRecord = user3Count;
                break;
        }
        ul_map.put("totalRecord", totalRecord);

        page.setTotalRecord(totalRecord);
        int nowPage = 1;
        if (cPage != null) {
            nowPage = Integer.parseInt(cPage);
        }
        page.setNowPage(nowPage);

        int begin = page.getBegin();
        int end = page.getEnd();

        ul_map.put("page", page);

        get_map.put("begin", begin);
        get_map.put("end", end);

        List<userVO> userlist = new ArrayList<>();

        switch (userType) {
            case "likeUser":
                userlist = service.getlikeuserByMap(get_map);
                break;
            case "blockedUser":
                userlist = service.getblockeduserByMap(get_map);
                break;
            case "noseeUser":
                userlist = service.getnoseeuserByMap(get_map);
                break;
        }
        ul_map.put("userlist", userlist);
        return ul_map;
    }

    // 회원가입 전화번호 중복 검사
    @RequestMapping("/api/uncheck")
    @ResponseBody
    public Map<String, Object> uncheck(String whatNow, String userkey) {
        Map<String, Object> map = new HashMap<>();
        int result_update = service.uncheckUser(whatNow, userkey);
        map.put("result_update", result_update);
        return map;
    }

    // 회원가입 전화번호 중복 검사
    @RequestMapping("/api/chkPhone")
    @ResponseBody
    public Map<String, Object> chkPhone(String phone) {
        Map<String, Object> map = new HashMap<>();
        int cnt = 0;
        userVO vo = service.findByphone(phone);
        if (vo != null) { // 중복이 된 경우 1 뱉어냄.
            cnt = 1;
        }
        map.put("cnt", cnt);
        return map;
    }

    // 회원가입 이메일 중복 검사
    @RequestMapping("/api/chkEmail")
    @ResponseBody
    public Map<String, Object> chkEmail(String email) {
        Map<String, Object> map = new HashMap<>();
        int cnt = 0;
        userVO vo = service.findByemail(email);
        if (vo != null) { // 중복이 된 경우 1 뱉어냄.
            cnt = 1;
        }
        map.put("cnt", cnt);
        return map;
    }

    // 회원정보 수정
    @RequestMapping("/editImage")
    @ResponseBody
    public Map<String, Object> editImage(String userkey, MultipartFile image) {
        if (image.isEmpty()) {
            throw new IllegalArgumentException("이미지가 업로드되지 않았습니다.");
        }
        String realPath = "/img/user/";
        String fname = image.getOriginalFilename();

        String ext = fname.substring(fname.lastIndexOf(".") + 1).toLowerCase();
        if (!(ext.equals("jpg") || ext.equals("jpeg") || ext.equals("png") || ext.equals("gif")
                || ext.equals("psd") || ext.equals("bmp") || ext.equals("tif") || ext.equals("tiff"))) {
            throw new IllegalArgumentException("지원하지 않는 파일 형식입니다.");
        }

        Path path = Paths.get(userImgPath);
        if (path.toString().contains("back")) {
            String pathString = path.toString();
            String changedPath = pathString.replace("back\\", "");
            path = Paths.get(changedPath);
        }
        String filePath = path.resolve(fname).toString();
        fname = FileRenameUtil.checkSameFileName(fname, filePath.substring(0, filePath.lastIndexOf("\\")));

        userVO uvo = new userVO();
        uvo.setUserkey(userkey);
        uvo.setImgurl(realPath + fname);

        try {
            image.transferTo(new File(filePath.substring(0, filePath.lastIndexOf("\\") + 1) + fname));
        } catch (Exception e) {
        }

        Map<String, Object> map = new HashMap<>();
        map.put("cnt", service.editImage(uvo));
        return map;
    }

    // @RequestMapping("/delImage")
    // @ResponseBody
    // public Map<String, Object> delImage(String userkey) {
    // String realPath = "/img/user/";
    // userVO uvo = new userVO();
    // uvo.setUserkey(userkey);
    // uvo.setImgurl(realPath + "default_img.png");

    // Map<String, Object> map = new HashMap<>();
    // int cnt = service.delImage(userkey);
    // if (cnt > 0) {
    // service.editImage(uvo);
    // }
    // map.put("cnt", cnt);
    // return map;
    // }

    @RequestMapping("/editUser")
    @ResponseBody
    public Map<String, Object> editUser(String userkey, String key, String value) {
        userVO uvo = new userVO();
        uvo.setUserkey(userkey);

        Map<String, Object> map = new HashMap<>();
        int cnt = 0;

        switch (key) {
            case "nickname":
                uvo.setNickname(value);
                cnt = service.editNickname(uvo);
                break;
            case "email":
                uvo.setEmail(value);
                cnt = service.editEmail(uvo);
                break;
            case "pw":
                String encodedPw = service.encodePw(value);
                uvo.setPw(encodedPw);
                cnt = service.editPw(uvo);
                break;
            case "phone":
                uvo.setPhone(value);
                cnt = service.editPhone(uvo);
                break;
            default:
                map.put("msg", "잘못된 필드입니다.");
                return map;
        }
        if (cnt > 0) {
            map.put("msg", "변경이 완료되었습니다.");
        } else {
            map.put("msg", "이미 사용중입니다.");
        }
        return map;
    }

    @RequestMapping("/delUser")
    @ResponseBody
    public Map<String, Object> delUser(String userkey, HttpServletResponse res) {
        Map<String, Object> map = new HashMap<>();
        int cnt = service.userDelForAdmin(userkey);
        if (cnt > 0) {
            logout(res);
            map.put("cnt", cnt);
            // map.put("msg", "회원 탈퇴 및 로그아웃이 완료되었습니다.");
        } else {
            map.put("cnt", cnt);
            // map.put("msg", "회원 탈퇴에 실패했습니다.");
        }
        return map;
    }

    @RequestMapping("/chkPw")
    @ResponseBody
    public Map<String, Object> chkPw(@RequestBody Map<String, String> data) {
        String userkey = data.get("userkey");
        String chkPw = data.get("chkPw");
        Map<String, Object> map = new HashMap<>();

        userVO uvo = service.getUserForAdmin(userkey);
        if (uvo != null && service.chkPw(chkPw, uvo.getPw())) {
            map.put("msg", true);
        } else {
            map.put("msg", false);
        }
        return map;
    }

    @RequestMapping("/userPage/getData")
    @ResponseBody
    public Map<String, Object> getData(String userkey) {

        Map<String, Object> u_map = new HashMap<>();

        userVO uvo = service.getUserForAdmin(userkey);
        int cell1count = service.getCell1TotalCount(userkey);
        int cell2count = service.getCell2TotalCount(userkey);
        int cellCount = cell1count + cell2count;
        List<PostVO> cellList = service.getCellListForUserPage(userkey);
        String limitpostkey = "0";
        String lastpostkey = "0";
        boolean isnextexist = cellCount > 5;
        if (!cellList.isEmpty()) {
            lastpostkey = cellList.get(cellList.size() - 1).getRnum();
            limitpostkey = cellList.get(0).getPostkey();
        }

        u_map.put("uvo", uvo);
        u_map.put("cellCount", cellCount);
        u_map.put("cellList", cellList);
        u_map.put("limitpostkey", limitpostkey);
        u_map.put("lastpostkey", lastpostkey);
        u_map.put("isnextexist", isnextexist);

        return u_map;
    }

    @RequestMapping("/userPage/canPoN")
    @ResponseBody
    public Map<String, Object> canPoN(String userkey_me, String userkey_you, String date_start, String date_end) {

        Map<String, Object> c_map = new HashMap<>();

        int result_s = service.getDidsell(userkey_me, userkey_you, date_start, date_end);
        int result_b = service.getDidbuy(userkey_me, userkey_you, date_start, date_end);

        c_map.put("result", result_s + result_b);

        return c_map;
    }

    @RequestMapping("/userPage/getMorePost")
    @ResponseBody
    public Map<String, Object> getMorePost(String userkey, String limitpostkey, String lastpostkey) {

        Map<String, Object> c_map = new HashMap<>();

        List<PostVO> cellList = service.getMorePost(userkey, limitpostkey, lastpostkey);
        int cellCount = service.getRestList(userkey, limitpostkey, lastpostkey);
        boolean isnextexist = (cellCount > 5);
        String lp_key = "9999";
        if (!cellList.isEmpty()) {
            lp_key = cellList.get(cellList.size() - 1).getRnum();
        }

        c_map.put("cellList", cellList);
        c_map.put("lastpostkey", lp_key);
        c_map.put("isnextexist", isnextexist);

        return c_map;
    }

}
