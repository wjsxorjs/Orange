package com.sist.back.controller;

import java.util.Map;
import java.util.HashMap;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.File;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.sist.back.service.BadgeService;
import com.sist.back.vo.BadgeVO;

@Controller
@RequestMapping("/api/user/badge")
public class BadgeController {
    @Autowired
    private BadgeService b_service;

    @Value("${server.upload.badge.image}")
    private String badgeImgPath;

    @RequestMapping("/getAllBadge")
    @ResponseBody
    public Map<String, Object> getAllBadge() {
        Map<String, Object> map = new HashMap<>();
        BadgeVO[] b_ar = b_service.getAllBadge();
        map.put("all", b_ar);
        return map;
    }

    @RequestMapping("/getAllOffBadge")
    @ResponseBody
    public Map<String, Object> getAllOffBadge() {
        Map<String, Object> map = new HashMap<>();
        BadgeVO[] b_ar = b_service.getAllOffBadge();
        map.put("allOff", b_ar);
        return map;
    }

    @RequestMapping("/getBadge")
    @ResponseBody
    public Map<String, Object> getBadge(String userkey) {
        Map<String, Object> map = new HashMap<>();
        BadgeVO[] b_ar = b_service.getBadge(userkey);
        map.put("b_ar", b_ar);
        return map;
    }

    @RequestMapping("/getBadgeCount")
    @ResponseBody
    public Map<String, Object> getBadgeCount(String userkey) {
        Map<String, Object> map = new HashMap<>();
        map.put("count", b_service.getBadgeCount(userkey));
        return map;
    }

    @RequestMapping("/representBadge")
    @ResponseBody
    public Map<String, Object> representBadge(String userkey, String badgekey) {
        Map<String, Object> map = new HashMap<>();
        map.put("cnt", b_service.representBadge(userkey, badgekey));
        return map;
    }

    @RequestMapping("/cancelRep")
    @ResponseBody
    public Map<String, Object> cancelRep(String userkey, String badgekey) {
        Map<String, Object> map = new HashMap<>();
        map.put("cnt", b_service.cancelRep(userkey, badgekey));
        return map;
    }

    @RequestMapping("/editBadge")
    @ResponseBody
    public Map<String, Object> editBadge(String badgekey, String name, MultipartFile image, String precontent,
            String postcontent, String isrepresentable, String existingImageUrl) {
        Map<String, Object> map = new HashMap<>();
        try {
            String imgUrl = existingImageUrl;
            if (image != null && !image.isEmpty()) {
                String realPath = "/img/badge/";
                String fname = image.getOriginalFilename();
                String ext = fname.substring(fname.lastIndexOf(".") + 1).toLowerCase();

                if (!(ext.equals("jpg") || ext.equals("jpeg") || ext.equals("png") || ext.equals("gif"))) {
                    throw new IllegalArgumentException("지원하지 않는 파일 형식입니다.");
                }
                Path path = Paths.get(badgeImgPath);
                String filePath = path.resolve(fname).toString();
                image.transferTo(new File(filePath));
                imgUrl = realPath + fname;
            }
            int updateCount = b_service.editBadge(badgekey, name, imgUrl, precontent, postcontent, isrepresentable);
            map.put("chk", 1);
        } catch (Exception e) {
            map.put("chk", -1);
            map.put("errorMessage", e.getMessage());
        }
        return map;
    }

    @RequestMapping("/chkBadgeOff")
    @ResponseBody
    public Map<String, Object> chkBadgeOff(@RequestBody List<String> badgekeyList) {
        Map<String, Object> map = new HashMap<>();
        for (String badgekey : badgekeyList) {
            b_service.badgeOff(badgekey);
        }
        map.put("cnt", badgekeyList.size());
        return map;
    }

    @RequestMapping("/chkBadgeOn")
    @ResponseBody
    public Map<String, Object> chkBadgeOn(@RequestBody List<String> badgekeyList) {
        Map<String, Object> map = new HashMap<>();
        for (String badgekey : badgekeyList) {
            b_service.badgeOn(badgekey);
        }
        map.put("cnt", badgekeyList.size());
        return map;
    }
}
