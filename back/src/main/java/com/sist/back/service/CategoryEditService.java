package com.sist.back.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;

import com.sist.back.mapper.CategoryEditMapper;
import com.sist.back.vo.categoryVO;

@Service
public class CategoryEditService {
    @Autowired
    CategoryEditMapper mapper;

    @CacheEvict(value = "categories", allEntries = true)  // 캐시 무효화
    public List<categoryVO> deletedAll(){
        return mapper.deletedAll();
    }

    @CacheEvict(value = "categories", allEntries = true)  // 캐시 무효화
    public int addCategory(categoryVO vo){
        return mapper.addCategory(vo);
    }

    @CacheEvict(value = "categories", allEntries = true)  // 캐시 무효화
    public int addCategoryDefault(categoryVO vo){
        return mapper.addCategoryDefault(vo);
    }

    public categoryVO getCategory(String categorykey){
        return mapper.getCategory(categorykey);
    }

    @CacheEvict(value = "categories", allEntries = true)  // 캐시 무효화
    public int editCategory(categoryVO vo){
        return mapper.editCategory(vo);
    }
    
    @CacheEvict(value = "categories", allEntries = true)  // 캐시 무효화
    public int editCategoryDefault(categoryVO vo){
        return mapper.editCategoryDefault(vo);
    }
    
    @CacheEvict(value = "categories", allEntries = true)  // 캐시 무효화
    public int deleteCategory(String categorykey){
        return mapper.deleteCategory(categorykey);
    }

    public List<Map<String, Object>> getPostCount(){
        return mapper.getPostCount();
    }

}
