package com.sist.back.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class userVO {

	List<AddressVO> ad_list;
	private List<PostVO> p_list;
	private List<MannerVO> m_list;
	private List<LikeUserVO> l_list;
	private List<UserBadgeVO> ub_list;
	private List<BlockedVO> b_list;
	private List<NoseeVO> n_list;
	private List<AddressVO> a_list;

	private List<WishlistVO> w_list;
	private List<InterestCategoryVO> ic_list;
	private List<KeywordVO> k_list;

	private List<PostVO> buy_list;
	private List<PostVO> cell_list;
	private TownVO tvo;

	private String 
			userkey,
			id,
			pw,
			name,
			nickname,
			phone,
			email,
			imgurl,
			login_dtm,
			isdisturb,
			disturb_start,
			disturb_end,
			isauthorized,
			create_dtm,
			update_dtm,
			delete_dtm,
			isdeleted,
			access_token,
			refresh_token,
			mannertemp

	;

}