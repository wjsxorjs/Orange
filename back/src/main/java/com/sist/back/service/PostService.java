package com.sist.back.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.PostMapper;
import com.sist.back.vo.ChatRoomVO;
import com.sist.back.vo.OfferVO;
import com.sist.back.vo.PostCountVO;
import com.sist.back.vo.PostImgVO;
import com.sist.back.vo.PostVO;
import com.sist.back.vo.TownVO;
import com.sist.back.vo.categoryVO;

@Service
public class PostService {
    @Autowired
    PostMapper p_mapper;

    public PostVO[] all() {
        return p_mapper.all();
    }

    public categoryVO[] getLikeCate(String userkey){
        return p_mapper.getLikeCate(userkey);
    }

    public PostVO[] getAdPost_simple(Map<String, Object> map) {
        return p_mapper.getAdPost_simple(map);
    }

    public int getViewqty(int postkey) {
        return p_mapper.getViewqty(postkey);
    }

    public int incViewqty(int postkey) {
        return p_mapper.incViewqty(postkey);
    }

    public PostVO getPostByPostKey(int postkey) {
        return p_mapper.getPostByPostKey(postkey);
    }

    public PostVO getPostDetailByPostKey(int postkey) {
        return p_mapper.getPostDetailByPostKey(postkey);
    }

    public List<PostVO> getPostByCategoryKey(int categorykey, String userkey) {
        return p_mapper.getPostByCategoryKey(categorykey, userkey);
    }

    public List<PostVO> getCellListByUserPostKey(int userkey, int postkey) {
        return p_mapper.getCellListByUserPostKey(userkey, postkey);
    }

    public TownVO getTownByPostKey(int postkey) {
        return p_mapper.getTownByPostKey(postkey);
    }

    public List<OfferVO> getOfferByPostKey(int postkey) {
        return p_mapper.getOfferByPostKey(postkey);
    }

    public List<ChatRoomVO> getChatroomByPostKey(int postkey) {
        return p_mapper.getChatroomByPostKey(postkey);
    }

    public int remindInsert(String postkey) {
        return p_mapper.insertRemindPost(postkey);
    }

    public int unhidPost(String postkey) {
        return p_mapper.unhidPostByPostKey(postkey);
    }

    public int remindUpdate(String postkey) {
        return p_mapper.remindPostByPostKey(postkey);
    }

    public int delLikeFromList(String likeWhat, String likeKey) {
        int result = 0;
        switch (likeWhat) {
            case "post":
                result = p_mapper.delWishlistByKey(likeKey);
                break;
            case "category":
                result = p_mapper.delInterestcategoryByKey(likeKey);
                break;
            case "keyword":
                result = p_mapper.delKeywordByKey(likeKey);
                break;
        }

        return result;
    }

    public int searchpostTotal(Map<String, Object> map) {
        return p_mapper.searchpostTotal(map);
    }

    public PostVO[] searchpost(Map<String, Object> map) {
        PostVO[] ar = null;
        List<PostVO> list = p_mapper.searchpost(map);
        if (list != null && list.size() > 0) {
            ar = new PostVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public int writePost(PostVO vo) {
        p_mapper.writePost(vo);
        return Integer.parseInt(vo.getPostkey());
    }

    public int editPost(PostVO vo) {
        return p_mapper.editPost(vo);
    }

    public int deletePostImg(String postkey) {
        return p_mapper.deletePostImg(postkey);
    }

    public PostVO[] search(String userkey, String onsale, String search, String lastPostKey, int howManyPost,
            String loc1,
            String[] loc2, String sort,
            String category, String minPrice, String maxPrice) {
        Map<String, Object> map = new HashMap<>();
        map.put("userkey", userkey);
        map.put("onsale", onsale);
        map.put("search", search);
        map.put("lastPostKey", lastPostKey);
        map.put("howManyPost", howManyPost);
        map.put("loc1", loc1);
        map.put("loc2", loc2);
        map.put("sort", sort);
        map.put("category", category);
        map.put("minPrice", minPrice);
        map.put("maxPrice", maxPrice);

        PostVO[] ar = null;
        List<PostVO> list = p_mapper.search(map);
        if (list != null && list.size() > 0) {
            ar = new PostVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    // 임시저장 게시글
    public PostVO searchTemp(String userkey) {
        return p_mapper.searchTemp(userkey);
    }

    public PostVO[] main(String param, String region1, String region2) {
        return p_mapper.main(param, region1, region2);
    }

    public PostCountVO postForPostAdmin() {
        return p_mapper.countpostForAdmin();
    }

    public List<PostImgVO> getPImgListByPostKey(int postkey) {
        return p_mapper.pImg_list(postkey); // PostMapper에서 pImg_list 메서드 호출
    }

    public int hidePost(String postkey) {
        return p_mapper.hidePost(postkey);
    }

    public int checkPostDel(String postkey) {
        return p_mapper.checkPostDel(postkey);
    }

    public PostImgVO getPostImgThumbnail(String postkey) {
        return p_mapper.getPostImgThumbnail(postkey);
    }

    public void updatePostStatus(String postStatus, String postkey, String dealuserkey) {
        p_mapper.updatePostStatus(postStatus, postkey, dealuserkey);
    }

    public PostVO[] getTop4() {
        PostVO[] ar = null;
        List<PostVO> list = p_mapper.getTop4();
        if (list != null && list.size() > 0) {
            ar = new PostVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public PostVO[] postTop10Statistic(String type, String dateType) {
        PostVO[] ar = null;
        List<PostVO> list = p_mapper.postTop10Statistic(type, dateType);
        if (list != null && list.size() > 0) {
            ar = new PostVO[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public List<String> townAll() {
        return p_mapper.townAll();
    }
}
