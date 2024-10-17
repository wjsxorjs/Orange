package com.sist.back.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class ApiSecurityConfig {

        private final JwtAuthorizationFilter JwtAuthorizationFilter;

        @Bean
        SecurityFilterChain apiFilterChain(HttpSecurity http) throws Exception {
                http
                                .securityMatcher("/user/api/**") // 설정된 경로로 들어오는 모든 것을 검사함
                                .authorizeHttpRequests( // 요청에 대한 권한을 지정
                                                authorizeHttpRequests -> authorizeHttpRequests
                                                                .requestMatchers("/user/api/reg").permitAll() // /api/member/reg
                                                                                                                  // 경로는
                                                                                                                  // 허용
                                                                .requestMatchers(HttpMethod.POST, "/user/api/login")
                                                                .permitAll()
                                                                .requestMatchers(HttpMethod.POST,
                                                                                "/user/api/logout")
                                                                .permitAll()
                                                                .requestMatchers(HttpMethod.POST, "/user/api/reg")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/usercount").permitAll()
                                                                .requestMatchers("/user/api/kakao/login")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/search_user_admin")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/mypage/userEdit")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/admin/userEdit")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/admin/getPost")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/getUserProfile")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/admin/userDel")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/admin/userEditReal")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/admin/checkUserDel")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/like/category")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/like/keyword")
                                                                .permitAll()
                                                                .requestMatchers("/user/api/likeLists").permitAll()
                                                                .requestMatchers("/user/api/buyList").permitAll()
                                                                .requestMatchers("/user/api/cellList").permitAll()
                                                                .requestMatchers("/user/api/lbiUsers").permitAll()
                                                                .requestMatchers("/user/api/uncheck").permitAll()
                                                                .requestMatchers("/user/api/chkEmail").permitAll()
                                                                .requestMatchers("/user/api/chkPhone").permitAll()
                                                                .requestMatchers("/user/delImage").permitAll()
                                                                .requestMatchers("/user/api/getUser").permitAll()
                                                                .requestMatchers("/user/api/FHRBCheck").permitAll()
                                                                .requestMatchers("/user/api/likeIoN").permitAll()
                                                                .requestMatchers("/user/api/noseeIoN").permitAll()
                                                                .requestMatchers("/user/api/blockIoN").permitAll()

                                                                .anyRequest().authenticated() // 나머지 모든 요청은 인증이 되어야 함
                                )
                                .csrf(csrf -> csrf.disable()) // CSRF 토큰 비활성화
                                .httpBasic(
                                                httpBasic -> httpBasic.disable()) // httpBasic로그인 방식 끄기
                                .formLogin(
                                                formLogin -> formLogin.disable()) // 폼 로그인 방식 끄기
                                .sessionManagement(
                                                sessionManagement -> sessionManagement.sessionCreationPolicy(
                                                                SessionCreationPolicy.STATELESS)) // 세션끄기
                                .addFilterBefore(JwtAuthorizationFilter,
                                                UsernamePasswordAuthenticationFilter.class);
                return http.build();
        }
}
