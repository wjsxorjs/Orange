package com.sist.back.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.BadgeMapper;
import com.sist.back.vo.BadgeVO;

@Service
public class BadgeService {
    @Autowired
    private BadgeMapper b_mapper;

    public BadgeVO[] getAllBadge() {
        List<BadgeVO> b_list = b_mapper.getAllBadge();
        BadgeVO[] b_ar = null;
        if (b_list != null && b_list.size() > 0) {
            b_ar = new BadgeVO[b_list.size()];
            b_list.toArray(b_ar);   
        }
        return b_ar;
    }

    public BadgeVO[] getAllOffBadge() {
        List<BadgeVO> b_list = b_mapper.getAllOffBadge();
        BadgeVO[] b_ar = null;
        if (b_list != null && b_list.size() > 0) {
            b_ar = new BadgeVO[b_list.size()];
            b_list.toArray(b_ar);   
        }
        return b_ar;
    }

    public BadgeVO[] getBadge(String userkey) {
        List<BadgeVO> b_list = b_mapper.getBadge(userkey);
        BadgeVO[] b_ar = null;
        if (b_list != null && b_list.size() > 0) {
            b_ar = new BadgeVO[b_list.size()];
            b_list.toArray(b_ar);   
        }
        return b_ar;
    }
    
    public int getBadgeCount(String userkey) {
        int cnt = b_mapper.getBadgeCount(userkey);
        return cnt;
    }
    
    public int representBadge(String userkey, String badgekey) {
        int cnt = b_mapper.representBadge(userkey, badgekey);
        return cnt;
    }

    public int cancelRep(String userkey, String badgekey) {
        int cnt = b_mapper.cancelRep(userkey, badgekey);
        return cnt;
    }

    public int editBadge(String badgekey, String name, String imgurl, String precontent, String postcontent, String isrepresentable) {
        int cnt = b_mapper.editBadge(badgekey, name, imgurl, precontent, postcontent, isrepresentable);
        return cnt;
    }

    public int badgeOff(String badgekey) {
        int cnt = b_mapper.badgeOff(badgekey);
        return cnt;
    }

    public int badgeOn(String badgekey) {
        int cnt = b_mapper.badgeOn(badgekey);
        return cnt;
    }
    
    public int giveBadgeForReviews(String userkey) {
        int cnt = b_mapper.giveBadgeForReviews(userkey);
        return cnt;
    }

    public int giveBadgeForGoodReviews(String userkey) {
        int cnt = b_mapper.giveBadgeForGoodReviews(userkey);
        return cnt;
    }

    public int giveBadgeFirstKeyword(String userkey) {
        int cnt = b_mapper.giveBadgeFirstKeyword(userkey);
        return cnt;
    }

    public int giveBadgeForPosts(String userkey) {
        int cnt = b_mapper.giveBadgeForPosts(userkey);
        return cnt;
    }
}
