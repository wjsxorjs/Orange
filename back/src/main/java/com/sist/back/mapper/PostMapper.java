package com.sist.back.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.sist.back.vo.ChatRoomVO;
import com.sist.back.vo.OfferVO;
import com.sist.back.vo.PostCountVO;
import com.sist.back.vo.PostImgVO;
import com.sist.back.vo.PostVO;
import com.sist.back.vo.TownVO;
import com.sist.back.vo.categoryVO;

@Mapper
public interface PostMapper {
    PostVO[] all();

    categoryVO[] getLikeCate(String userkey);
    
    int getViewqty(int postkey);

    int incViewqty(int postkey);

    PostVO[] getAdPost_simple(Map<String, Object> map);

    PostVO getPostByPostKey(int postkey);

    PostVO getPostDetailByPostKey(int postkey);

    List<PostVO> getPostByCategoryKey(int categorykey, String userkey);

    List<PostVO> getCellListByUserPostKey(int userkey, int postkey);

    TownVO getTownByPostKey(int postkey);

    List<OfferVO> getOfferByPostKey(int postkey);

    List<ChatRoomVO> getChatroomByPostKey(int postkey);

    int insertRemindPost(String postkey);

    int remindPostByPostKey(String postkey);

    int unhidPostByPostKey(String postkey);

    int searchpostTotal(Map<String, Object> map);

    List<PostVO> searchpost(Map<String, Object> map);

    int writePost(PostVO vo);

    int editPost(PostVO vo);

    int delWishlistByKey(String likeKey);

    int delInterestcategoryByKey(String likeKey);

    int delKeywordByKey(String likeKey);

    List<PostVO> search(Map<String, Object> map);

    PostVO searchTemp(String userkey);

    PostVO[] main(String param, String region1, String region2);

    PostCountVO countpostForAdmin();

    int deletePostImg(String postkey);

    List<PostImgVO> pImg_list(int postkey);

    int hidePost(String postkey);

    int checkPostDel(String postkey);

    PostImgVO getPostImgThumbnail(String postkey);

    void updatePostStatus(String postStatus, String postkey, String dealuserkey);

    List<PostVO> getTop4();

    List<PostVO> postTop10Statistic(String type, String dateType);

    List<String> townAll();
}
