package com.sist.back.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.SearchlogMapper;

@Service
public class SearchlogService {
    @Autowired
    SearchlogMapper searchlogMapper;

    public String[] getSearchlog() {
        String[] ar = null;

        List<String> list = searchlogMapper.getSearchlog();
        if (list != null && list.size() > 0) {
            ar = new String[list.size()];
            list.toArray(ar);
        }
        return ar;
    }

    public int addSearchlog(String value) {
        return searchlogMapper.addSearchlog(value);
    }
}
