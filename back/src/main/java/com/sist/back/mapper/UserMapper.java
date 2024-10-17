package com.sist.back.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.PostVO;
import com.sist.back.vo.UserCountVO;
import com.sist.back.vo.WishlistVO;
import com.sist.back.vo.userVO;

@Mapper
public interface UserMapper {

    userVO login(userVO vo);

    int login_dtm(userVO vo);

    int kakao_login_dtm(String email);

    UserCountVO countForAdmin();

    int searchForAdminPaging(Map iMap);

    List<userVO> searchForAdmin(Map iMap);

    int F_Check(String me, String you);
    int N_Check(String me, String you);
    int B_Check(String me, String you);

    int likeN(String me, String you);
    int likeI(String me, String you);
    int noseeN(String me, String you);
    int noseeI(String me, String you);
    int blockN(String me, String you);
    int blockI(String me, String you);

    userVO getUserForAdmin(String userkey);
    userVO getUserForMyPage(String userkey);
    userVO getUserProfile(String userkey);

    List<PostVO> getPostsForAdmin(Map<String, Object> p_map);
    
    int userDelForAdmin(String userkey);

    int userEditForAdmin(userVO vo);

    userVO findByid(String id);
    
    userVO getUserInfo(String userkey);

    int saveUser(userVO vo);

    userVO findbyEmail(String email);

    userVO findbyPhone(String phone);

    // likelist
    int getWishlistCount(String userkey);

    int getInterestCategoryCount(String userkey);

    int getKeywordCount(String userkey);

    int addLikeCategory(String userkey, String categorykey);
    int addLikeKeyword(String userkey, String content);

    List<WishlistVO> getWishlistByMap(Map<String, Object> get_map);

    List<WishlistVO> getInterestCategoryByMap(Map<String, Object> get_map);

    List<WishlistVO> getKeywordByMap(Map<String, Object> get_map);

    // buylist
    int getBuyTotalCount(String userkey);

    int getBuyCount(Map<String, Object> get_map);

    List<PostVO> getBuylistByMap(Map<String, Object> get_map);

    // cellList
    int getCellTotalCount(String userkey);

    int getCellPartCount(String userkey, int poststatus);

    int getCellCount(Map<String, Object> get_map);

    List<PostVO> getCelllistByMap(Map<String, Object> get_map);

    // user(like,block,nosee) list
    int getlikeuserCount(String userkey);

    int getblockeduserCount(String userkey);

    int getnoseeuserCount(String userkey);

    List<userVO> getlikeuserByMap(Map<String, Object> get_map);

    List<userVO> getblockeduserByMap(Map<String, Object> get_map);

    List<userVO> getnoseeuserByMap(Map<String, Object> get_map);

    int uncheckLikeuser(String userkey);

    int uncheckBlockeduser(String userkey);

    int uncheckNoseeuser(String userkey);

    // 회원정보 수정
    int editImage(userVO uvo);

    int delImage(String userkey);

    int editNickname(userVO uvo);

    int editEmail(userVO uvo);

    int editPw(userVO uvo);

    int editPhone(userVO uvo);


    int getDidsell(String userkey_me,String userkey_you,String date_start,String date_end);
    int getDidbuy(String userkey_me,String userkey_you,String date_start,String date_end);
    List<PostVO> getCellListForUserPage(String userkey);
    List<PostVO> getMorePost(String userkey,String limitpostkey,String lastpostkey);
    int getRestList(String userkey,String limitpostkey,String lastpostkey);

    List<PostVO> getPostsByUserKey(Map<String, Object> pmap);
    int getPostCountByUserKey(String userkey);

    String searchNickname(String userkey);

    int getReportCountByUserKey(String userkey);

}