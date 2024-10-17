package com.sist.back.vo;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class WishlistVO {
    private String rnum, wishlistkey, userkey, postkey, create_dtm;

	private PostVO pvo;
    
}
