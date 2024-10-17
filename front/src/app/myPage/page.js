"use client";

import MyPageSide from "@/component/user/layout/MyPageSide";
import UserCellList from "@/component/user/post/detail/UserCellList";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CampaignIcon from "@mui/icons-material/Campaign";
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import EventIcon from '@mui/icons-material/Event';
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import "/public/css/myPage.css";
import Moneybook from "@/component/user/myPage/Moneybook";
import { Backdrop, CircularProgress } from "@mui/material";

export default function page() {
  const API_URL = "/user/api/mypage/userEdit";
  const userkey = Cookies.get("userkey");
  const [uvo, setUvo] = useState({});
  const [sell_1, setSell_1] = useState(0);
  const [sell_2, setSell_2] = useState(0);
  const [sell_3, setSell_3] = useState(0);
  const [sell_4, setSell_4] = useState(0);

  function getData() {
    axios({
      url: API_URL,
      method: "post",
      params: { userkey: userkey },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setUvo(res.data.ar);
      const cell_list = res.data.ar.cell_list;
      var sell1 = 0;
      var sell2 = 0;
      var sell3 = 0;
      var sell4 = 0;
      for (var i = 0; i < cell_list.length; i++) {
        switch (cell_list[i].poststatus) {
          case "1":
            sell1++;
            break;
          case "2":
            sell2++;
            break;
          case "3":
            sell3++;
            break;
          case "4":
            sell4++;
            break;
        }
      }
      setSell_1(sell1);
      setSell_2(sell2);
      setSell_3(sell3);
      setSell_4(sell4);
      setLoading(false);
    });
  }


  const[open,setOpen] = useState(false);
  
  function openMoneyBook(){
    setOpen(true);
  }
  function closeMoneyBook(){
    setOpen(false);
  }




  useEffect(() => {
    if (Cookies.get("userkey") == undefined) {
      alert("로그인이 필요한 서비스입니다.");
      window.location.replace("/");
    }
    setLoading(true);
    getData();
  }, []);

  const [loading, setLoading] = useState(false);
  return (
    <>
      <article className="_1h4pbgy7wg _1h4pbgy7wz">
        {loading && (
          <Backdrop
            open={loading}
            sx={(theme) => ({
              position: "fixed", // fixed로 설정하여 화면의 중앙에 배치
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center", // 수평 중앙 정렬
              alignItems: "center", // 수직 중앙 정렬
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: "rgba(0, 0, 0, 0.2)", // 배경 투명도
            })}
          >
            <CircularProgress size={100} color="inherit" />
          </Backdrop>
        )}
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section style={{ borderBottom: "1px solid #ebebeb" }} className="">
            <div className="_588sy41z _588sy421 _588sy42q _588sy415q _588sy417e">
              <nav className="iq86zf0">
                <ol className="iq86zf1 _588sy42q _588sy415q">
                  <li>
                    <Link href="/">
                      <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf3 iq86zf2 _588sy41n">
                        <font style={{ verticalAlign: "inherit" }}>홈</font>
                      </span>
                    </Link>
                    <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8">
                      <font style={{ verticalAlign: "inherit" }}> &gt;</font>
                    </span>
                  </li>
                </ol>
              </nav>
              <Link href="/myPage">
                <div className="_588sy41z _588sy421 _588sy42q _588sy415q">
                  <span className="_588sy4192 _588sy41x _588sy41b2 _588sy43">
                    <font style={{ verticalAlign: "inherit" }}>
                      마이 페이지
                    </font>
                  </span>
                </div>
              </Link>
            </div>
            <Link href="/myPage">
              <div className="_1h4pbgy7dk _1h4pbgy7j7 _1h4pbgy7j0 _1h4pbgy7il _1h4pbgy7w0">
                <h1 className="_1h4pbgy78o _1h4pbgy796 _1h4pbgy79g _1h4pbgy7ag _1h4pbgy7c8">
                  <font style={{ verticalAlign: "inherit" }}>마이 페이지</font>
                </h1>
              </div>
            </Link>
          </section>
        </div>
        <div className="my_home container my md _6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
            {/* 
                마이페이지 서브
                <jsp:include page="/WEB-INF/views/user/myPageSub/myPageSide.jsp"/>
                */}
            <MyPageSide />
            <div data-v-7b7d73d2="" className="my_home container my md">
              {/* 여기서부터 콘텐츠 */}
              <div
                data-v-ed683452=""
                data-v-7b7d73d2=""
                className="user_membership"
              >
                <div data-v-ed683452="" className="user_detail">
                  <div data-v-ed683452="" className="user_thumb">
                    <img
                      data-v-ed683452=""
                      src={uvo.imgurl}
                      alt="사용자 이미지"
                      className="thumb_img"
                    />
                  </div>
                  <div data-v-ed683452="" className="user_info">
                    <div data-v-ed683452="" className="info_box">
                      <strong data-v-ed683452="" className="name">
                        {uvo.nickname}
                      </strong>
                      <p data-v-ed683452="" className="email">
                        {uvo.id} [ {uvo.email} ]
                      </p>
                    </div>
                    <div data-v-ed683452="" className="info-buttons">
                      <Link
                        data-v-420a5cda=""
                        data-v-ed683452=""
                        href="/myPage/profile"
                        className="btn btn outlinegrey small"
                        type="button"
                      >
                        {" "}
                        프로필{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-v-247cd1ce=""
                data-v-7b7d73d2=""
                className="sm shortcut-grid"
              >
                <Link
                  data-v-247cd1ce=""
                  href="/myPage/profile?tab=badge" 
                  className="menu-item"
                >
                  <div data-v-247cd1ce="" className="icon-wrap">
                    <MilitaryTechIcon sx={{ width: 28, height: 28 }} />
                  </div>
                  <p
                    data-v-09bea70c=""
                    data-v-7d3b6402=""
                    data-v-247cd1ce=""
                    className="text-lookup name display_paragraph"
                    style={{ color: "rgb(34, 34, 34)" }}
                  >
                    활동 배지
                  </p>
                </Link>
                <Link
                  data-v-247cd1ce=""
                  href="#"
                  onClick={openMoneyBook}
                  className="menu-item"
                >
                  <div data-v-247cd1ce="" className="icon-wrap">
                    <AutoStoriesIcon sx={{ width: 28, height: 28 }} />
                  </div>
                  <p
                    data-v-09bea70c=""
                    data-v-7d3b6402=""
                    data-v-247cd1ce=""
                    className="text-lookup name display_paragraph"
                    style={{ color: "rgb(34, 34, 34)" }}
                  >
                    가계부
                  </p>
                </Link>
                <Moneybook open={open} closeMoneyBook={closeMoneyBook} userkey={userkey} />
                <Link data-v-247cd1ce="" href="/myPage/qna" className="menu-item">
                  <div data-v-247cd1ce="" className="icon-wrap">
                    <LiveHelpOutlinedIcon sx={{ width: 28, height: 28 }} />
                  </div>
                  <p
                    data-v-09bea70c=""
                    data-v-7d3b6402=""
                    data-v-247cd1ce=""
                    className="text-lookup name display_paragraph"
                    style={{ color: "rgb(34, 34, 34)" }}
                  >
                    문의사항
                  </p>
                </Link>

              </div>
              {/* 구매 내역 */}
              <div
                data-v-6752ceb2=""
                data-v-7b7d73d2=""
                className="my_home_title"
              >
                <h3 data-v-6752ceb2="" className="title">
                  {" "}
                  구매 내역{" "}
                </h3>
                <Link
                  data-v-6752ceb2=""
                  href="/myPage/buylist"
                  className="btn_more"
                >
                  <span data-v-6752ceb2="" className="btn_txt">
                    더보기
                  </span>
                  <span
                    className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8"
                    style={{ color: "rgb(34, 34, 34, .5)" }}
                  >
                    <font style={{ verticalAlign: "inherit" }}> &gt;</font>
                  </span>
                </Link>
              </div>
              <div data-v-7b7d73d2="" className="recent_purchase">
                <div
                  data-v-2cbb289b=""
                  data-v-7b7d73d2=""
                  className="purchase_list_tab"
                >
                  <div data-v-2cbb289b="" className="tab_item total">
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          전체
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          {uvo.buy_list ? uvo.buy_list.length : 0}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                </div>
                <div data-v-7b7d73d2="">
                  <div
                    data-v-eff62a72=""
                    data-v-7b7d73d2=""
                    className="purchase_list all bid"
                  >
                    {/* 여기서 FOREACH로 3개만 출력하기 */}
                    {uvo.buy_list ? (
                      uvo.buy_list.map((blvo, index) => {
                        const price =
                          blvo.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

                        if (index > 2) {
                          return;
                        }
                        return (
                          <div key={index} data-v-eff62a72="">
                            <Link
                              href={`/post/detail?postkey=${blvo.postkey}`}
                              data-v-53e92c51=""
                              data-v-eff62a72=""
                            >
                              <div
                                data-v-53e92c51=""
                                className="purchase_list_display_item"
                                style={{
                                  backgroundColor: "rgb(255, 255, 255)",
                                }}
                              >
                                <div
                                  data-v-53e92c51=""
                                  className="purchase_list_product"
                                >
                                  <div
                                    data-v-53e92c51=""
                                    className="list_item_img_wrap"
                                  >
                                    {blvo.pimg_list &&
                                    blvo.pimg_list.length > 0 &&
                                    blvo.pimg_list[0].imgurl != undefined ? (
                                      <img
                                        alt="product_image"
                                        src={blvo.pimg_list[0].imgurl}
                                        className="list_item_img"
                                        style={{ backgroundColor: "#ebf0f5" }}
                                        data-v-53e92c51=""
                                      />
                                    ) : (
                                      <ImageNotSupportedRoundedIcon
                                        style={{
                                          width: "80px", // 아이콘의 너비를 100%로 설정
                                          height: "80px", // 아이콘의 높이를 100%로 설정
                                        }}
                                      />
                                    )}
                                  </div>
                                  <div
                                    data-v-53e92c51=""
                                    className="list_item_title_wrap"
                                  >
                                    <p
                                      data-v-53e92c51=""
                                      className="list_item_title"
                                    >
                                      {blvo.title}
                                    </p>
                                    <p
                                      data-v-53e92c51=""
                                      className="list_item_description"
                                    >
                                      <span data-v-53e92c51="">{price}</span>
                                    </p>
                                  </div>
                                </div>
                                <div
                                  data-v-53e92c51=""
                                  className="list_item_status"
                                >
                                  <div
                                    data-v-53e92c51=""
                                    className="list_item_column column_secondary"
                                  >
                                    <p
                                      data-v-09bea70c=""
                                      data-v-7d3b6402=""
                                      data-v-53e92c51=""
                                      className="text-lookup secondary_title display_paragraph"
                                      style={{ color: "rgba(34, 34, 34, 0.5)" }}
                                    >
                                      {blvo.create_dtm.split(" ")[0]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })
                    ) : (
                      <div
                        data-v-53e92c51=""
                        className="purchase_list_display_item"
                        style={{ backgroundColor: "rgb(255, 255, 255)" }}
                      >
                        구매내역이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 판매 내역 */}
              <div
                data-v-6752ceb2=""
                data-v-7b7d73d2=""
                className="my_home_title"
              >
                <h3 data-v-6752ceb2="" className="title">
                  {" "}
                  판매 내역{" "}
                </h3>
                <Link
                  data-v-6752ceb2=""
                  href="/myPage/celllist"
                  className="btn_more"
                >
                  <span data-v-6752ceb2="" className="btn_txt">
                    더보기
                  </span>
                  <span
                    className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8"
                    style={{ color: "rgb(34, 34, 34, .5)" }}
                  >
                    <font style={{ verticalAlign: "inherit" }}> &gt;</font>
                  </span>
                </Link>
              </div>
              <div data-v-7b7d73d2="" className="recent_purchase">
                <div
                  data-v-2cbb289b=""
                  data-v-7b7d73d2=""
                  className="purchase_list_tab sell"
                >
                  <div data-v-2cbb289b="" className="tab_item total">
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          전체
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          {uvo.cell_list ? uvo.cell_list.length : 0}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" className="tab_item tab_on">
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          판매중
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          {sell_1}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" className="tab_item tab_on">
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          예약중
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          {sell_2}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" className="tab_item">
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          거래완료
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          {sell_3}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                  <div data-v-2cbb289b="" className="tab_item">
                    <Link data-v-2cbb289b="" href="#" className="tab_link">
                      <dl data-v-2cbb289b="" className="tab_box">
                        <dt data-v-2cbb289b="" className="title">
                          숨김
                        </dt>
                        <dd data-v-2cbb289b="" className="count">
                          {sell_4}
                        </dd>
                      </dl>
                    </Link>
                  </div>
                </div>
                <div data-v-7b7d73d2="">
                  <div
                    data-v-eff62a72=""
                    data-v-7b7d73d2=""
                    className="purchase_list all ask"
                  >
                    {/* 여기서 FOREACH로 3개만 뿌리기 */}
                    {uvo.cell_list ? (
                      uvo.cell_list.map((clvo, index) => {
                        const price =
                          clvo.price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

                        if (index > 2) {
                          return;
                        }
                        return (
                          <div key={index} data-v-eff62a72="">
                            <Link
                              href={`/post/detail?postkey=${clvo.postkey}`}
                              data-v-53e92c51=""
                              data-v-eff62a72=""
                            >
                              <div
                                data-v-53e92c51=""
                                className="purchase_list_display_item"
                                style={{
                                  backgroundColor: "rgb(255, 255, 255)",
                                }}
                              >
                                <div
                                  data-v-53e92c51=""
                                  className="purchase_list_product"
                                >
                                  <div
                                    data-v-53e92c51=""
                                    className="list_item_img_wrap"
                                  >
                                    {clvo.pimg_list &&
                                    clvo.pimg_list.length > 0 &&
                                    clvo.pimg_list[0].imgurl != undefined ? (
                                      <img
                                        alt="product_image"
                                        src={clvo.pimg_list[0].imgurl}
                                        className="list_item_img"
                                        style={{ backgroundColor: "#ebf0f5" }}
                                        data-v-53e92c51=""
                                      />
                                    ) : (
                                      <ImageNotSupportedRoundedIcon
                                        style={{
                                          width: "80px", // 아이콘의 너비를 100%로 설정
                                          height: "80px", // 아이콘의 높이를 100%로 설정
                                        }}
                                      />
                                    )}
                                  </div>
                                  <div
                                    data-v-53e92c51=""
                                    className="list_item_title_wrap"
                                  >
                                    <p
                                      data-v-53e92c51=""
                                      className="list_item_title"
                                    >
                                      {clvo.title}
                                    </p>
                                    <p
                                      data-v-53e92c51=""
                                      className="list_item_description"
                                    >
                                      <span data-v-53e92c51="">{price}</span>
                                    </p>
                                  </div>
                                </div>
                                <div
                                  data-v-53e92c51=""
                                  className="list_item_status"
                                >
                                  <div
                                    data-v-53e92c51=""
                                    className="list_item_column column_secondary"
                                  >
                                    <p
                                      data-v-09bea70c=""
                                      data-v-7d3b6402=""
                                      data-v-53e92c51=""
                                      className="text-lookup secondary_title display_paragraph"
                                      style={{ color: "rgba(34, 34, 34, 0.5)" }}
                                    >
                                      {clvo.create_dtm.split(" ")[0]}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        );
                      })
                    ) : (
                      <div
                        data-v-53e92c51=""
                        className="purchase_list_display_item"
                        style={{ backgroundColor: "rgb(255, 255, 255)" }}
                      >
                        판매내역이 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 관심 상품 */}
              <div
                data-v-6752ceb2=""
                data-v-7b7d73d2=""
                className="my_home_title"
              >
                <h3 data-v-6752ceb2="" className="title">
                  {" "}
                  관심 상품{" "}
                </h3>
                <Link
                  data-v-6752ceb2=""
                  href="/myPage/likelist"
                  className="btn_more"
                >
                  <span data-v-6752ceb2="" className="btn_txt">
                    더보기
                  </span>
                  <span
                    className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8"
                    style={{ color: "rgb(34, 34, 34, .5)" }}
                  >
                    <font style={{ verticalAlign: "inherit" }}> &gt;</font>
                  </span>
                </Link>
              </div>
              <div data-v-7b7d73d2="" className="interest_product">
                <div data-v-7b7d73d2="" className="wishlistGrid">
                  {/* 여기서 FOREACH로 8개 뿌리기 */}
                  {uvo.w_list ? (
                    uvo.w_list.length > 0 ? (
                      uvo.w_list.map((wlvo, index) => {
                        if (index > 7) {
                          return;
                        }
                        return (
                            <UserCellList key={index} pvo={wlvo.pvo} />
                        );
                      })
                    ) : (
                      <p style={{ margin: "0 10%" }}>
                        등록된 관심 상품이 없습니다.
                      </p>
                    )
                  ) : (
                    <p style={{ margin: "0 10%" }}>
                      등록된 관심 상품이 없습니다.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
