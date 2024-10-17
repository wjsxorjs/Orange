package com.sist.back.security;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;

@Component
@RequiredArgsConstructor
public class JwtAuthorizationFilter extends OncePerRequestFilter {
    // JWT토큰을 가지고 서버에 들어오는 요청을 허용하기 위한 인가(authorization)처리를 하는
    // Filter객체다
    @Override
    @SneakyThrows // try~catch로 예외처리를 해야할 것을 명시적으로 예외처리를 생략할 수 있도록 해줌
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (request.getRequestURI().equals("/user/api/login") ||
                request.getRequestURI().equals("/user/api/logout")) {
            filterChain.doFilter(request, response);
            return;
        } // 로그인과 로그아웃은 통과

        // accessToken 검증 또는 refreshToken발급

        String acessToken = "";
        if (!acessToken.isBlank()) {
            // 나중에 하자

        }
        filterChain.doFilter(request, response);
    }

}