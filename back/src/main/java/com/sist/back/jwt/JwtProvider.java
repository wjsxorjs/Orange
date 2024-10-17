package com.sist.back.jwt;

import javax.crypto.SecretKey;

import java.util.Base64;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

    @Value("${custom.jwt.secretKey}")
    private String secretKeyCode;

    private SecretKey secretKey;

    //시크릿키를 암호화해서 뱉어주는 함수 
    public SecretKey getSecretKey(){
        if(secretKey==null){ // 처음에 요청했을때만 만들고 이후에는 계속 만들어지는거 방지 
            String encoding = Base64.getEncoder().encodeToString(secretKeyCode.getBytes());
		    //encoding 여기 배열을 넣으면 암호화 시켜준다
		    secretKey = Keys.hmacShaKeyFor(encoding.getBytes());
        }
        return secretKey;
    }

    //토큰 만드는것 
    private String genToken( Map<String, Object>map, int seconds){   //second 몇초까지 유효한 토큰인지 
        //map에는 보통 아이디 비밀번호가 들어간다. 
        //현재 시간
        long now = new Date().getTime();
        Date accessTokenExpiresIn = new Date(now+1000L*seconds);

        JwtBuilder jwtBuilder = Jwts.builder()  //빌더패턴 . 내가 뭐를 넣었는지 직관적으로 알 수 있다. 
                                .subject("aje")
                                .expiration(accessTokenExpiresIn);

        Set<String> keys = map.keySet();    //인덱스가 없어서 반복문 돌기 힘드니 커서(이터레이터)가 필요하다 
        //값을 빼주고 커서가 이동한다. >속도 측면에서 유용하다
        Iterator<String> it = keys.iterator();
        while (it.hasNext()) {  //커서야 다음꼐 있니 ? 있냐 없냐만 판단 그래서 있냐없냐 판단하고 빠져나가든가 가만히 있든가.
            String key = it.next(); //있으면 다음칸으로 가서 빼내라 next()함수 
            Object value = map.get(key); //앞에서 나온 키를 주면 map에 있는 값이 나와
            jwtBuilder.claim(key, value);   //아이디 비밀번호 이런걸 가져와서 토큰으로 만드는 과정

        }
        return jwtBuilder.signWith(getSecretKey()).compact(); //jwt토큰을 만들어준다 
    }

    //토큰 만드는것 
    public String genAccessToken( Map<String, Object>map){   //second 몇초까지 유효한 토큰인지 
        return genToken(map, 60*60);//1시간 짜리 토큰
    }

    //토큰 만드는것 
    public String genRefreshToken( Map<String, Object>map){   //second 몇초까지 유효한 토큰인지 
        return genToken(map, 60*60*24*100);//100일 짜리
    }

    //토큰 유효기간 확인
    public boolean verify (String token){
        boolean value = true;

        try {
            Jwts.parser().verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token);  //기간 만료시 예외발생 

        } catch (Exception e) {
            value = false;
        }

        return value;
    }

    //토큰에 담긴 사용자정보(claims)를 반환 
    public Map<String,Object> getClaims(String token){
        return Jwts.parser().verifyWith(getSecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();


    }


}
