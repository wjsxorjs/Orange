package com.sist.back.mapper;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

import com.sist.back.vo.BadgeVO;

@Mapper
public interface BadgeMapper {
    List<BadgeVO> getAllBadge();

    List<BadgeVO> getAllOffBadge();

    List<BadgeVO> getBadge(String userkey);

    int getBadgeCount(String userkey);

    int representBadge(String userkey, String badgekey);

    int cancelRep(String userkey, String badgekey);

    int editBadge(String badgekey, String name, String imgurl, String precontent, String postcontent, String isrepresentable);

    int badgeOff(String badgekey);

    int badgeOn(String badgekey);

    int giveBadgeForReviews(String userkey);

    int giveBadgeForGoodReviews(String userkey);

    int giveBadgeFirstKeyword(String userkey);
    
    int giveBadgeForPosts(String userkey);
}
