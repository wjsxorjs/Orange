package com.sist.back.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SearchlogMapper {

    List<String> getSearchlog();

    int addSearchlog(String value);

}
