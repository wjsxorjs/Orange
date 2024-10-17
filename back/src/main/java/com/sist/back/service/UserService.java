package com.sist.back.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.sist.back.jwt.JwtProvider;
import com.sist.back.mapper.UserMapper;
import com.sist.back.vo.PostVO;
import com.sist.back.vo.UserCountVO;
import com.sist.back.vo.WishlistVO;
import com.sist.back.vo.userVO;

import jakarta.servlet.ServletContext;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    UserMapper mapper;

    @Autowired
    private ServletContext context;

    // jwt provider
    private final JwtProvider jwtProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // jwt reg > refreshToken 생성
    public userVO reg(userVO vo) {

        // 패스워드가 일치하는지 확인
        if (vo != null && vo.getPw() != null) {
            vo.setPw(passwordEncoder.encode(vo.getPw()));
        }
        Map<String, Object> map = new HashMap();
        map.put("id", vo.getId());
        map.put("userkey", vo.getUserkey());
        map.put("pw", vo.getPw());

        String refreshToken = jwtProvider.genRefreshToken(map);
        vo.setRefresh_token(refreshToken);

        int cnt = mapper.saveUser(vo);
        if (cnt > 0) {
            return vo;
        } else {
            throw new RuntimeException("회원가입에 실패했습니다.");
        }
    }

    // jwt login 을 위한 인증 > refreshToken , accessToken 생성
    public userVO authAndMakeToken(String id, String pw) {
        userVO uvo = null;
        try {
            uvo = mapper.findByid(id);
            if (uvo == null) { // 회원이 없는 경우 > RuntimeException 찍어줌
                throw new RuntimeException("존재하지 않음");
            }
            // 패스워드가 일치하는지 확인
            if (pw == null || passwordEncoder.matches(pw, uvo.getPw())) { // 비밀번호가 없을경우 > 소셜로그인
                Map<String, Object> map = new HashMap(); // 있을 경우는 패스워드 비교하여 맞는지 확인해줌
                map.put("id", uvo.getId());
                map.put("userkey", uvo.getUserkey());
                map.put("pw", uvo.getPw());

                String accessToken = jwtProvider.genAccessToken(map);
                uvo.setAccess_token(accessToken);
                String refreshToken = jwtProvider.genRefreshToken(map);
                uvo.setRefresh_token(refreshToken);

            } else { // 패스워드가 일치하지 않은 경우
                uvo = null;
            }
        } catch (Exception e) {
        }
        return uvo;
    }

    public int upt_login_dtm(userVO vo) {
        return mapper.login_dtm(vo);
    }

    public int kakao_login_dtm(String email) {
        return mapper.kakao_login_dtm(email);
    }

    public UserCountVO userForAdmin() {

        return mapper.countForAdmin();
    }
    
    public userVO getUserInfo(String userkey) {

        return mapper.getUserInfo(userkey);
    }

    public int searchForAdminPaging(Map iMap) {

        return mapper.searchForAdminPaging(iMap);
    }

    public userVO[] searchForAdmin(Map iMap) {
        userVO[] ar = null;

        List<userVO> list = mapper.searchForAdmin(iMap);
        if (list != null && list.size() > 0) {
            ar = new userVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public List<PostVO> getPostsForAdmin(Map<String, Object> p_map){
        return mapper.getPostsForAdmin(p_map);
    }

    public int F_Check(String me, String you){
        return mapper.F_Check(me, you);
    }
    public int N_Check(String me, String you){
        return mapper.N_Check(me, you);
    }
    public int B_Check(String me, String you){
        return mapper.B_Check(me, you);
    }

    public int likeN(String me, String you){
        return mapper.likeN(me, you);
    }
    public int likeI(String me, String you){
        return mapper.likeI(me, you);
    }
    public int noseeN(String me, String you){
        return mapper.noseeN(me, you);
    }
    public int noseeI(String me, String you){
        return mapper.noseeI(me, you);
    }
    public int blockN(String me, String you){
        return mapper.blockN(me, you);
    }
    public int blockI(String me, String you){
        return mapper.blockI(me, you);
    }








    public userVO getUserForAdmin(String userkey) {
        return mapper.getUserForAdmin(userkey);
    }
    public userVO getUserForMyPage(String userkey) {
        return mapper.getUserForMyPage(userkey);
    }
    public userVO getUserProfile(String userkey) {
        return mapper.getUserProfile(userkey);
    }

    public int userDelForAdmin(String userkey) {
        return mapper.userDelForAdmin(userkey);
    }

    public int userEditForAdmin(userVO vo) {
        return mapper.userEditForAdmin(vo);
    }

    public userVO findByemail(String email) {
        return mapper.findbyEmail(email);
    }

    public userVO findByphone(String phone) {
        return mapper.findbyPhone(phone);
    }

    public int getLikeCount(String userkey, String likewhat) {
        int likecount = 0;
        switch (likewhat) {
            case "post":
                likecount = mapper.getWishlistCount(userkey);
                break;
            case "category":
                likecount = mapper.getInterestCategoryCount(userkey);
                break;
            case "keyword":
                likecount = mapper.getKeywordCount(userkey);
                break;
        }
        return likecount;
    }

    public List<WishlistVO> getLikeLists(Map<String, Object> get_map, String likewhat) {
        List<WishlistVO> likelist = new ArrayList<>();
        switch (likewhat) {
            case "post":
                likelist = mapper.getWishlistByMap(get_map);
                break;
            case "category":
                likelist = mapper.getInterestCategoryByMap(get_map);
                break;
            case "keyword":
                likelist = mapper.getKeywordByMap(get_map);
                break;
        }
        return likelist;
    }

    public int addLikeCategory(String userkey, String categorykey){
        return mapper.addLikeCategory(userkey, categorykey);
    }

    public int addLikeKeyword(String userkey, String content){
        return mapper.addLikeKeyword(userkey, content);
    }

    public int getBuyTotalCount(String userkey) {
        int likecount = mapper.getBuyTotalCount(userkey);
        return likecount;
    }

    public int getBuyCount(Map<String, Object> get_map) {
        int likecount = mapper.getBuyCount(get_map);
        return likecount;
    }

    public List<PostVO> getBuyList(Map<String, Object> get_map) {
        List<PostVO> likelist = mapper.getBuylistByMap(get_map);
        return likelist;
    }

    public int getCellTotalCount(String userkey) {
        int likecount = mapper.getCellTotalCount(userkey);
        return likecount;
    }

    public int getCell1TotalCount(String userkey) {
        int likecount = mapper.getCellPartCount(userkey, 1);
        return likecount;
    }

    public int getCell2TotalCount(String userkey) {
        int likecount = mapper.getCellPartCount(userkey, 2);
        return likecount;
    }

    public int getCell3TotalCount(String userkey) {
        int likecount = mapper.getCellPartCount(userkey, 3);
        return likecount;
    }

    public int getCell4TotalCount(String userkey) {
        int likecount = mapper.getCellPartCount(userkey, 4);
        return likecount;
    }

    public int getCellCount(Map<String, Object> get_map) {
        int likecount = mapper.getCellCount(get_map);
        return likecount;
    }

    public List<PostVO> getCellList(Map<String, Object> get_map) {
        List<PostVO> likelist = mapper.getCelllistByMap(get_map);
        return likelist;
    }

    public int getlikeuserCount(String userkey) {
        int count = mapper.getlikeuserCount(userkey);
        return count;
    }

    public int getblockeduserCount(String userkey) {
        int count = mapper.getblockeduserCount(userkey);
        return count;
    }

    public int getnoseeuserCount(String userkey) {
        int count = mapper.getnoseeuserCount(userkey);
        return count;
    }

    public List<userVO> getlikeuserByMap(Map<String, Object> get_map) {
        List<userVO> userList = mapper.getlikeuserByMap(get_map);
        return userList;
    }

    public List<userVO> getblockeduserByMap(Map<String, Object> get_map) {
        List<userVO> userList = mapper.getblockeduserByMap(get_map);
        return userList;
    }

    public List<userVO> getnoseeuserByMap(Map<String, Object> get_map) {
        List<userVO> userList = mapper.getnoseeuserByMap(get_map);
        return userList;
    }

    public int uncheckUser(String whatNow, String userkey) {
        int result = 0;
        switch (whatNow) {
            case "likeUser":
                result = mapper.uncheckLikeuser(userkey);
                break;
            case "blockedUser":
                result = mapper.uncheckBlockeduser(userkey);
                break;
            case "noseeUser":
                result = mapper.uncheckNoseeuser(userkey);
                break;
        }

        return result;
    }

    // 회원정보 수정
    public int editImage(userVO uvo) {
        return mapper.editImage(uvo);
    }

    public int delImage(String userkey) {
        return mapper.delImage(userkey);
    }

    public int editNickname(userVO uvo) {
        return mapper.editNickname(uvo);
    }

    public int editEmail(userVO uvo) {
        return mapper.editEmail(uvo);
    }

    public int editPw(userVO uvo) {
        return mapper.editPw(uvo);
    }

    public String encodePw(String pw) {
        return passwordEncoder.encode(pw);
    }

    public int editPhone(userVO uvo) {
        return mapper.editPhone(uvo);
    }

    public boolean chkPw(String chkPw, String encodedPw) {
        return passwordEncoder.matches(chkPw, encodedPw);
    }


    public int getDidsell(String userkey_me,String userkey_you,String date_start,String date_end){
        return mapper.getDidsell(userkey_me,userkey_you,date_start,date_end);
    }


    public int getDidbuy(String userkey_me,String userkey_you,String date_start,String date_end){
        return mapper.getDidbuy(userkey_me,userkey_you,date_start,date_end);
    }

    public List<PostVO> getCellListForUserPage(String userkey){
        return mapper.getCellListForUserPage(userkey);
    }
    public List<PostVO> getMorePost(String userkey,String limitpostkey,String lastpostkey){
        return mapper.getMorePost(userkey,limitpostkey,lastpostkey);
    }
    public int getRestList(String userkey,String limitpostkey,String lastpostkey){
        return mapper.getRestList(userkey,limitpostkey,lastpostkey);
    }

    public int getPostCountByUserKey(String userkey){
        return mapper.getPostCountByUserKey(userkey);
    }

    public List<PostVO> getPostsByUserKey(Map<String, Object> pmap){
      
        List<PostVO> p_list = mapper.getPostsByUserKey(pmap);
        
        return p_list;
    }

    public String searchNickname(String userkey){
        return mapper.searchNickname(userkey);
    }

    public int getReportCountByUserKey(String userkey){
        return mapper.getReportCountByUserKey(userkey);
    }
}
