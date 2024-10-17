package com.sist.back.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebCORSConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // localhost:3000번으로부터 요청이 들어올 때 모든 요청방식과
        // 모든 헤더에 실려오는 것을 허용함을 지정하자

        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000", "http://52.78.168.131", "https://52.78.168.131")
                .allowedHeaders("*")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}
