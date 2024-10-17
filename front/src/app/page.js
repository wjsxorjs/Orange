"use client";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Category from "@/component/user/index/Category";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [category_list, setCategory_list] = useState([]);
  const [free_list, setFree_list] = useState([]);
  const [cate_list, setCate_list] = useState([]);

  function getCategory() {
    axios({
      url: "/api/category/all",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setCategory_list(res.data.category_list);
    });
  }

  function getMain() {
    axios({
      url: "/api/adpost/main",
      method: "get",
      params: {
        region1: decodeURIComponent(Cookies.get("region1")),
        region2: decodeURIComponent(Cookies.get("region2")),
        userkey: decodeURIComponent(Cookies.get("userkey")),
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setFree_list(res.data.free_list);
      setCate_list(res.data.cate_list);
    });
  }

  useEffect(() => {
    getMain();
    getCategory();
  }, []);

  // #region 메인 배너 슬라이드 이벤트
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // 클라이언트에서만 실행될 코드를 여기에 작성
      const banner_buttons = document.querySelectorAll("button.slick-slide-btn");

      banner_buttons.forEach((button) => {
        button.addEventListener("click", function () {
          let idx = 0;
          const currentSlide = document.querySelector(
            "div.slick-active.slick-current"
          );
          if (button.dataset.prev === "yes") {
            idx = currentSlide.dataset.index - 1;
            if (idx < 0) idx = 2;
          } else {
            idx = parseInt(currentSlide.dataset.index) + 1;
            if (idx > 2) idx = 0;
          }

          // Remove classes "slick-active" and "slick-current" from all slides
          document.querySelectorAll("div.slick-slide").forEach((slide) => {
            slide.classList.remove("slick-active");
            slide.classList.remove("slick-current");
          });

          // Add classes "slick-active" and "slick-current" to the new active slide
          const newActiveSlide = document.querySelector(
            `div.slick-slide[data-index='${idx}']`
          );
          newActiveSlide.classList.add("slick-active");
          newActiveSlide.classList.add("slick-current");

          // Update the slide track's transform and transition styles
          const slickTrack = document.querySelector("div.slick-track");
          slickTrack.style.transform = `translate3d(${-1400 * idx}px, 0px, 0px)`;
          slickTrack.style.transition = "-webkit-transform 500ms ease 0s";

          // Update the slick dots to reflect the active slide
          document.querySelectorAll("ul.slick-dots li").forEach((dot) => {
            dot.classList.remove("slick-active");
          });
          document
            .querySelector(`ul.slick-dots li:nth-child(${idx + 1})`)
            .classList.add("slick-active");
        });
      });
    }
  }, []);
  // #endregion

  // #region 상품 슬라이드 왼쪽버튼
  function slide_l(e) {
    const scroll_div = e.currentTarget.parentNode.querySelector(
      'div[data-scroll_div="scroll_div"]'
    );
    let chk = parseInt(scroll_div.getAttribute("data-scroll_idx"));
    const chkRange = parseInt(scroll_div.getAttribute("data-scroll_range"));

    if (chk == "1") {
      scroll_div.parentNode
        .querySelector("div[data-direct='left']")
        .classList.add("_1n1zga89");
      scroll_div.parentNode
        .querySelector("div._1n1zga8b")
        .querySelector("div")
        .classList.add("_1n1zga8g");

      if (chkRange == "2") {
        scroll_div.parentNode
          .querySelector("div[data-direct='right']")
          .classList.remove("_1n1zga89");
        scroll_div.parentNode
          .querySelector("div._1n1zga8c")
          .querySelector("div")
          .classList.remove("_1n1zga8g");
      }
    } else if (chk == "2") {
      scroll_div.parentNode
        .querySelector("div[data-direct='right']")
        .classList.remove("_1n1zga89");
      scroll_div.parentNode
        .querySelector("div._1n1zga8c")
        .querySelector("div")
        .classList.remove("_1n1zga8g");
    }

    scroll_div.setAttribute("data-scroll_idx", (chk - 1).toString());
    scroll_div.scrollTo({
      left: scroll_div.scrollLeft - 1220,
      behavior: "smooth",
    });
  }
  // #endregion

  // #region 상품 슬라이드 오른쪽버튼
  function slide_r(e) {
    const scroll_div = e.currentTarget.parentNode.querySelector(
      'div[data-scroll_div="scroll_div"]'
    );
    let chk = parseInt(scroll_div.getAttribute("data-scroll_idx"));
    const chkRange = parseInt(scroll_div.getAttribute("data-scroll_range"));

    if (chk == "0") {
      scroll_div.parentNode
        .querySelector("div[data-direct='left']")
        .classList.remove("_1n1zga89");
      scroll_div.parentNode
        .querySelector("div._1n1zga8b")
        .querySelector("div")
        .classList.remove("_1n1zga8g");

      if (chkRange == "2") {
        scroll_div.parentNode
          .querySelector("div[data-direct='right']")
          .classList.add("_1n1zga89");
        scroll_div.parentNode
          .querySelector("div._1n1zga8c")
          .querySelector("div")
          .classList.add("_1n1zga8g");
      }
    } else if (chk == "1") {
      scroll_div.parentNode
        .querySelector("div[data-direct='right']")
        .classList.add("_1n1zga89");
      scroll_div.parentNode
        .querySelector("div._1n1zga8c")
        .querySelector("div")
        .classList.add("_1n1zga8g");
    }

    scroll_div.setAttribute("data-scroll_idx", (chk + 1).toString());
    scroll_div.scrollTo({
      left: scroll_div.scrollLeft + 1220,
      behavior: "smooth",
    });
  }
  // #endregion

  return (
    <>
      {/* 배너 이미지 */}
      <div
        className="_12vdq0b0 _1h4pbgy9ug _1h4pbgy9xc"
        style={{ backgroundColor: "rgb(255, 250, 224)" }}
      >
        <div
          id="slick-slide-img-div"
          className="_12vdq0b1 _1h4pbgya0o _1h4pbgy8og _1h4pbgya2w"
        >
          <span>
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/0ded9b652f3345f88578f91f0944e86191c027ea-1125x930.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b4 _12vdq0b6"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/e249e1aa865fdaf2836b7aa222f6ffc52c81ab60-1728x1200.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b4 _12vdq0b7"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/9c4bd85f621ad93f1d09ebedf4d1a88279f97ec9-2976x1200.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b4 _12vdq0b8"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/9c4bd85f621ad93f1d09ebedf4d1a88279f97ec9-2976x1200.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b4 _12vdq0b9"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/74a19f9057d1703f1eae21482138f48ff2efe76d-3600x1321.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b4 _12vdq0ba"
            />
          </span>
          <span>
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/b293fb51b3ec1b60ebd763abd50f0d4017ed9e9b-1125x1050.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b6"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/77a96b1abaf205caeae5ea3a9c5cf57fae30f4ef-1728x1201.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b7"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/e2b63428bbfd29189e3f854f323251e8942a15f6-2304x1080.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b8"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/1db9cae0ec2f6cd66c718460df4af1b948fd769c-2976x1201.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b9"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/62e471b9b0e855c01d2d713741079d24f71e9485-3600x1321.png"
              alt="1"
              className="_12vdq0b2 _12vdq0ba"
            />
          </span>
          <span>
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/cf7f48217e83ab4e21226435575600d91c1dd942-1125x1051.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b6"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/e59f691b43accc66bdc7966ea0051bd13550d38a-1728x1201.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b7"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/8f02fde2695e7dcb987a2603634b45b29887d550-2304x1081.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b8"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/bbbe3bbcc6e3bc3886bcc79af0b413d3b2896b11-2976x1201.png"
              alt="1"
              className="_12vdq0b2 _12vdq0b9"
            />
            <img
              src="https://karrotmarket-com-sanity-cdn.krrt.io/production/75f89ca0b8afbb816f1e16058fd10c5e767d17a8-3600x1321.png"
              alt="1"
              className="_12vdq0b2 _12vdq0ba"
            />
          </span>
          <div
            className="slick-slider _12vdq0bj _1h4pbgy8jc slick-initialized"
            dir="ltr"
          >
            <div className="slick-list">
              <div
                className="slick-track"
                style={{
                  width: "4200px",
                  opacity: "1",
                  transform: "translated3d(0px, 0px, 0px)",
                }}
              >
                <div
                  data-index="0"
                  className="slick-slide slick-active slick-current"
                  tabIndex="-1"
                  aria-hidden="false"
                  style={{ outline: "none", width: "1400px" }}
                >
                  <div>
                    <div
                      className="_12vdq0bk _1h4pbgy7nk _1h4pbgy7o1 _1h4pbgy7oy _1h4pbgy7pn _1h4pbgy7pw _1h4pbgy7qd _1h4pbgy7s8 _1h4pbgy7sp _1h4pbgy7tm _1h4pbgy7ub _1h4pbgy7uk _1h4pbgy7v1 _1h4pbgy8tk _1h4pbgya0o _1h4pbgy9ug _1h4pbgy9vs _12vdq0bl"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <h1 className="_12vdq0bm _1h4pbgy794 _1h4pbgy79d _1h4pbgy79m _1h4pbgy7a3 _1h4pbgy7ac _1h4pbgy7ag _1h4pbgy7c8 _1h4pbgy7bk _1h4pbgya4g _1h4pbgy7xc _1h4pbgy7xl _1h4pbgy7ya _1h4pbgy7yr _1h4pbgy7ys _1h4pbgy81k _12vdq0bn">
                        <font>당신의 소중한 물건을 나누고</font><br/>
                        <font>새로운 가치를 만들어보세요!</font>
                      </h1>
                      <h2 className="_12vdq0bp _1h4pbgy9u0 _1h4pbgy9ua _1h4pbgy77u _1h4pbgy78j _1h4pbgy78s _1h4pbgy7ag _1h4pbgy7c0 _1h4pbgy7bk _1h4pbgya4g _12vdq0bq"></h2>
                    </div>
                  </div>
                </div>
                <div
                  data-index="1"
                  className="slick-slide"
                  tabIndex="-1"
                  aria-hidden="true"
                  style={{ outline: "none", width: "1400px" }}
                >
                  <div>
                    <div
                      className="_12vdq0bk _1h4pbgy7nk _1h4pbgy7o1 _1h4pbgy7oy _1h4pbgy7pn _1h4pbgy7pw _1h4pbgy7qd _1h4pbgy7s8 _1h4pbgy7sp _1h4pbgy7tm _1h4pbgy7ub _1h4pbgy7uk _1h4pbgy7v1 _1h4pbgy8tk _1h4pbgya0o _1h4pbgy9ug _1h4pbgy9vs"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <h3 className="_12vdq0bm _1h4pbgy794 _1h4pbgy79d _1h4pbgy79m _1h4pbgy7a3 _1h4pbgy7ac _1h4pbgy7ag _1h4pbgy7c8 _1h4pbgy7bk _1h4pbgya4g _1h4pbgy7xc _1h4pbgy7xl _1h4pbgy7ya _1h4pbgy7yr _1h4pbgy7ys _1h4pbgy81k _12vdq0bn">
                        <font>믿을 수 있는 이웃과 안전하게 거래하세요!</font>
                      </h3>
                      <h4 className="_12vdq0bp _1h4pbgy9u0 _1h4pbgy9ua _1h4pbgy77u _1h4pbgy78j _1h4pbgy78s _1h4pbgy7ag _1h4pbgy7c0 _1h4pbgy7bk _1h4pbgya4g _12vdq0bq"></h4>
                    </div>
                  </div>
                </div>
                <div
                  data-index="2"
                  className="slick-slide"
                  tabIndex="-1"
                  aria-hidden="true"
                  style={{ outline: "none", width: "1400px" }}
                >
                  <div>
                    <div
                      className="_12vdq0bk _1h4pbgy7nk _1h4pbgy7o1 _1h4pbgy7oy _1h4pbgy7pn _1h4pbgy7pw _1h4pbgy7qd _1h4pbgy7s8 _1h4pbgy7sp _1h4pbgy7tm _1h4pbgy7ub _1h4pbgy7uk _1h4pbgy7v1 _1h4pbgy8tk _1h4pbgya0o _1h4pbgy9ug _1h4pbgy9vs"
                      tabIndex="-1"
                      style={{ width: "100%", display: "inline-block" }}
                    >
                      <h3 className="_12vdq0bm _1h4pbgy794 _1h4pbgy79d _1h4pbgy79m _1h4pbgy7a3 _1h4pbgy7ac _1h4pbgy7ag _1h4pbgy7c8 _1h4pbgy7bk _1h4pbgya4g _1h4pbgy7xc _1h4pbgy7xl _1h4pbgy7ya _1h4pbgy7yr _1h4pbgy7ys _1h4pbgy81k _12vdq0bn">
                        <font>쓸모 없는 물건이 아닌</font><br/>
                        <font>새로운 시작을 만들어 보세요!</font>
                      </h3>
                      <h4 className="_12vdq0bp _1h4pbgy9u0 _1h4pbgy9ua _1h4pbgy77u _1h4pbgy78j _1h4pbgy78s _1h4pbgy7ag _1h4pbgy7c0 _1h4pbgy7bk _1h4pbgya4g _12vdq0bq"></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul style={{ display: "block" }} className="slick-dots">
              <li className="slick-active">
                <button>
                  <font>1</font>
                </button>
              </li>
              <li className="">
                <button>
                  <font>2</font>
                </button>
              </li>
              <li className="">
                <button>
                  <font>3</font>
                </button>
              </li>
            </ul>
          </div>
          <button
            id="slick-slide-prev-btn"
            aria-label="이전 배너 이미지"
            data-prev="yes"
            className="slick-slide-btn _12vdq0bd _1h4pbgya0w _1h4pbgya1s _1h4pbgy9u0 _1h4pbgy9ub _1h4pbgy9yw _12vdq0be"
          >
            <span
              style={{ display: "inline-flex" }}
              className="_12vdq0bg _1h4pbgy8hk _1h4pbgy8rs _12vdq0bi"
              data-seed-icon="icon_chevron_left_thin"
              data-seed-icon-version="0.2.1"
            >
              <svg
                id="icon_chevron_left_thin"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-karrot-ui-icon="true"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.6225 3.17006C16.8525 3.40006 16.8525 3.78006 16.6225 4.01006L8.63245 12.0001L16.6225 19.9901C16.8525 20.2201 16.8525 20.6001 16.6225 20.8301C16.3925 21.0601 16.0125 21.0601 15.7825 20.8301L7.37245 12.4201C7.14245 12.1901 7.14245 11.8101 7.37245 11.5801L15.7825 3.17006C16.0125 2.94006 16.3925 2.94006 16.6225 3.17006Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </span>
          </button>
          <button
            id="slick-slide-next-btn"
            aria-label="다음 배너 이미지"
            data-prev="no"
            className="slick-slide-btn _12vdq0bd _1h4pbgya0w _1h4pbgya1s _1h4pbgy9u0 _1h4pbgy9ub _1h4pbgy9yw _12vdq0bf"
          >
            <span
              style={{ display: "inline-flex" }}
              className="_12vdq0bg _1h4pbgy8hk _1h4pbgy8rs _12vdq0bi"
              data-seed-icon="icon_chevron_right_thin"
              data-seed-icon-version="0.2.1"
            >
              <svg
                id="icon_chevron_right_thin"
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                data-karrot-ui-icon="true"
              >
                <g>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.22246 3.17006L16.6325 11.5801C16.8625 11.8101 16.8625 12.1901 16.6325 12.4201L8.22246 20.8301C7.99246 21.0601 7.61246 21.0601 7.38246 20.8301C7.15246 20.6001 7.15246 20.2201 7.38246 19.9901L15.3725 12.0001L7.38246 4.01006C7.15246 3.78006 7.15246 3.40006 7.38246 3.17006C7.61246 2.94006 7.99246 2.94006 8.22246 3.17006Z"
                    fill="currentColor"
                  ></path>
                </g>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* 상품 목록 */}
      <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
        <article className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy91c _1h4pbgy92b _1h4pbgy91x _1h4pbgya0o _1h4pbgy83s _1h4pbgy84b _1h4pbgy84k">
          {/* 나눔 목록 */}
          {free_list && free_list.length > 0 && (
            <section className="_1h4pbgy9ug _1h4pbgy9vs">
              <header className="_1h4pbgy7xc _1h4pbgy7xv _1h4pbgy828 _1h4pbgy82r _1h4pbgy9ug _1h4pbgy9xs">
                <div
                  data-gtm="main_article"
                  className="_1h4pbgy8g _1h4pbgy7ag _1h4pbgy78o _1h4pbgy797 _1h4pbgy9w0"
                >
                  <font>나눔 목록</font>
                </div>
                <Link
                  className="_1h4pbgy9ug _1h4pbgy76o _1h4pbgy78j _1h4pbgy784 _1h4pbgy78l _1h4pbgy7ao"
                  href="/post?sort=recent&minPrice=0&maxPrice=0"
                >
                  <span
                    data-gtm="main_see_all"
                    className="m79qaj0 _1h4pbgyu0 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8zs"
                  >
                    <font>더보기</font>
                  </span>
                  <span className="_1h4pbgy9ug _1h4pbgy9wo">
                    <span
                      style={{
                        display: "inline-flex",
                        width: "16px",
                        height: "16px",
                      }}
                      className="_1h4pbgyu0"
                      data-seed-icon="icon_chevron_right_fill"
                      data-seed-icon-version="0.2.1"
                    >
                      <svg
                        id="icon_chevron_right_fill"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        data-karrot-ui-icon="true"
                      >
                        <g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.64948 3.27994L16.6995 11.3299C17.0695 11.6999 17.0695 12.2999 16.6995 12.6699L8.64948 20.7199C8.27948 21.0899 7.67948 21.0899 7.30948 20.7199C6.93948 20.3499 6.93948 19.7499 7.30948 19.3799L14.6895 11.9999L7.30948 4.61994C6.93948 4.24994 6.93948 3.64994 7.30948 3.27994C7.67948 2.90994 8.27948 2.90994 8.64948 3.27994Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </span>
                </Link>
              </header>
              <div className="wa1ti51 _9rcp1w1 _1b153uw7">
                <div className="_1n1zga84 _1n1zga80 _1h4pbgya0o">
                  <div
                    data-scroll_div="scroll_div"
                    data-scroll_idx="0"
                    data-scroll_range="2"
                    className="_1n1zga85 _1h4pbgy9zk _1h4pbgy8jc"
                  >
                    <div className="wa1ti52 _1h4pbgy7nk _1h4pbgy7o1 _1h4pbgy7oy _1h4pbgy7m3 _1h4pbgy7s8 _1h4pbgy7sp _1h4pbgy7tm _1h4pbgy7qr _1h4pbgy90w _1h4pbgya54">
                      {free_list &&
                        free_list.length > 0 &&
                        free_list.map((post, i) => (
                          <div key={i} className="wa1ti53">
                            <Link href={`/post/detail?postkey=${post.postkey}`}>
                              <article className="_1b153uw9 _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy90g _1b153uw8 _1b153uwb _1b153uw7">
                                <div className="_1b153uwd _1h4pbgy1ts _1h4pbgya0o _1h4pbgya2w _1h4pbgy94w">
                                  {post.pimg_list &&
                                  post.pimg_list.length > 0 ? (
                                    <span
                                      className=" lazy-load-image-background opacity lazy-load-image-loaded"
                                      style={{
                                        color: "transparent",
                                        display: "inlineBlock",
                                      }}
                                    >
                                      <img
                                        className="_1b153uwe _1h4pbgya3k"
                                        src={post.pimg_list[0].imgurl}
                                        alt="썸네일"
                                        onError={(e) => {
                                          // 부모 span 태그를 DOM에서 제거
                                          const parentSpan =
                                            e.target.parentNode;

                                          // 새로운 div를 생성하고 아이콘을 삽입
                                          const fallbackIcon =
                                            document.createElement("div");
                                          fallbackIcon.innerHTML = `
                <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocalMallIcon" data-first-child="" style="width: 100%; height: 100%; z-index: 1; color: rgb(255, 111, 97); box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px; background-color: rgb(249, 249, 249);"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3m0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5"></path></svg>`;
                                          parentSpan.parentNode.appendChild(
                                            fallbackIcon
                                          );
                                          parentSpan.remove();
                                        }}
                                      />
                                    </span>
                                  ) : (
                                    <LocalMallIcon
                                      style={{
                                        width: "100%", // 아이콘의 너비를 100%로 설정
                                        height: "100%", // 아이콘의 높이를 100%로 설정
                                        zIndex: 1, // 필요하면 z-index로 가시성을 확보
                                        color: "#ff6f61", // 이쁜 코랄 계열 색상
                                        backgroundColor: "#f9f9f9", // 아이콘 뒤 배경 색상
                                      }}
                                    />
                                  )}
                                </div>
                                <div className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9wg _1h4pbgy90g">
                                  <div className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9wg _1h4pbgy8zs _1h4pbgy8g _1h4pbgy8jc">
                                    <div className="_1b153uwf _1h4pbgy7ao _1h4pbgy780 _1h4pbgya2w _1h4pbgy8og _1h4pbgya54">
                                      <font>{post.title}</font>
                                    </div>
                                    <div className="_1b153uwg _1h4pbgy7ag _1h4pbgy780 _1h4pbgya54">
                                      <font>
                                        {post.price == 0
                                          ? "나눔♥"
                                          : new Intl.NumberFormat(
                                              "ko-KR"
                                            ).format(post.price) + "원"}
                                      </font>
                                    </div>
                                  </div>
                                  <div className="_1b153uwh _1h4pbgy8jc">
                                    <h2 className="_1b153uwi _1h4pbgy7ao _1h4pbgy79s _1h4pbgy80 _1h4pbgya54 _1h4pbgy8jc _1h4pbgya2w">
                                      <font>
                                        {post.townVO && post.townVO.region3}
                                      </font>
                                    </h2>
                                  </div>
                                </div>
                              </article>
                            </Link>
                          </div>
                        ))}
                      {/* 상품 끝 */}
                      <Link href="/post?sort=recent&minPrice=0&maxPrice=0">
                        <div className="_1kquttw0 _1b153uw8 _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy174 _1h4pbgy3oo _1h4pbgy94w _1kquttw1 _1b153uw6">
                          <div className="_1h4pbgy9ug _1h4pbgy8zs">
                            <span className="_1h4pbgy8g _1h4pbgy7ao">
                              <font>전체 보기</font>
                            </span>
                            <span className="_1h4pbgy9ug _1h4pbgy9xc _1h4pbgy9wo">
                              <span
                                style={{
                                  display: "inline-flex",
                                  width: "14px",
                                  height: "14px",
                                }}
                                data-seed-icon="icon_chevron_right_fill"
                                data-seed-icon-version="0.2.1"
                              >
                                <svg
                                  id="icon_chevron_right_fill"
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  data-karrot-ui-icon="true"
                                >
                                  <g>
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M8.64948 3.27994L16.6995 11.3299C17.0695 11.6999 17.0695 12.2999 16.6995 12.6699L8.64948 20.7199C8.27948 21.0899 7.67948 21.0899 7.30948 20.7199C6.93948 20.3499 6.93948 19.7499 7.30948 19.3799L14.6895 11.9999L7.30948 4.61994C6.93948 4.24994 6.93948 3.64994 7.30948 3.27994C7.67948 2.90994 8.27948 2.90994 8.64948 3.27994Z"
                                      fill="currentColor"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div
                    data-direct="left"
                    className="_1n1zga86 _1h4pbgya0w _1h4pbgy98o _1h4pbgy8tk _1h4pbgy8gg _1h4pbgy9u0 _1h4pbgy9ub _1n1zga87 _1n1zga89"
                  ></div>
                  <div
                    data-direct="right"
                    className="_1n1zga86 _1h4pbgya0w _1h4pbgy98o _1h4pbgy8tk _1h4pbgy8gg _1h4pbgy9u0 _1h4pbgy9ub _1n1zga88"
                  ></div>
                  <div
                    onClick={slide_l}
                    className="_1n1zga8a _1n1zga8b"
                    style={{
                      _1n1zga81: "var(_1b153uw3)",
                      _1n1zga82: "var(_1b153uw4)",
                      _1n1zga83: "var(_1b153uw5)",
                    }}
                  >
                    <div className="_1n1zga8d _1h4pbgya0w _1h4pbgy9dc _1h4pbgy1u0 _1h4pbgy8i8 _1h4pbgy8sg _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy98g _1h4pbgy9yw _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgya5s _1n1zga8e _1n1zga8g">
                      <span
                        style={{ display: "inline-flex" }}
                        className="_1n1zga8h"
                        data-seed-icon="icon_chevron_left_thin"
                        data-seed-icon-version="0.2.1"
                      >
                        <svg
                          id="icon_chevron_left_thin"
                          width="100%"
                          height="100%"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          data-karrot-ui-icon="true"
                        >
                          <g>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6225 3.17006C16.8525 3.40006 16.8525 3.78006 16.6225 4.01006L8.63245 12.0001L16.6225 19.9901C16.8525 20.2201 16.8525 20.6001 16.6225 20.8301C16.3925 21.0601 16.0125 21.0601 15.7825 20.8301L7.37245 12.4201C7.14245 12.1901 7.14245 11.8101 7.37245 11.5801L15.7825 3.17006C16.0125 2.94006 16.3925 2.94006 16.6225 3.17006Z"
                              fill="currentColor"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div
                    onClick={slide_r}
                    className="_1n1zga8a _1n1zga8c"
                    style={{
                      _1n1zga81: "var(_1b153uw3)",
                      _1n1zga82: "var(_1b153uw4)",
                      _1n1zga83: "var(_1b153uw5)",
                    }}
                  >
                    <div className="_1n1zga8d _1h4pbgya0w _1h4pbgy9dc _1h4pbgy1u0 _1h4pbgy8i8 _1h4pbgy8sg _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy98g _1h4pbgy9yw _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgya5s _1n1zga8f">
                      <span
                        style={{ display: "inline-flex" }}
                        className="_1n1zga8h"
                        data-seed-icon="icon_chevron_right_thin"
                        data-seed-icon-version="0.2.1"
                      >
                        <svg
                          id="icon_chevron_right_thin"
                          width="100%"
                          height="100%"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          data-karrot-ui-icon="true"
                        >
                          <g>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.22246 3.17006L16.6325 11.5801C16.8625 11.8101 16.8625 12.1901 16.6325 12.4201L8.22246 20.8301C7.99246 21.0601 7.61246 21.0601 7.38246 20.8301C7.15246 20.6001 7.15246 20.2201 7.38246 19.9901L15.3725 12.0001L7.38246 4.01006C7.15246 3.78006 7.15246 3.40006 7.38246 3.17006C7.61246 2.94006 7.99246 2.94006 8.22246 3.17006Z"
                              fill="currentColor"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* 카테고리 */}
          <section className="_1h4pbgy9ug _1h4pbgy9vs">
            <header className="_1h4pbgy7xc _1h4pbgy7xv _1h4pbgy828 _1h4pbgy82r _1h4pbgy9ug _1h4pbgy9xs">
              <div
                data-gtm="main_article"
                className="_1h4pbgy8g _1h4pbgy7ag _1h4pbgy78o _1h4pbgy797 _1h4pbgy9w0"
              >
                <font>모든 카테고리</font>
              </div>
              <Link
                className="_1h4pbgy9ug _1h4pbgy76o _1h4pbgy78j _1h4pbgy784 _1h4pbgy78l _1h4pbgy7ao"
                href="/category"
              >
                <span
                  data-gtm="main_see_all"
                  className="m79qaj0 _1h4pbgyu0 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8zs"
                >
                  <font>더보기</font>
                </span>
                <span className="_1h4pbgy9ug _1h4pbgy9wo">
                  <span
                    style={{
                      display: "inline-flex",
                      width: "16px",
                      height: "16px",
                    }}
                    className="_1h4pbgyu0"
                    data-seed-icon="icon_chevron_right_fill"
                    data-seed-icon-version="0.2.1"
                  >
                    <svg
                      id="icon_chevron_right_fill"
                      width="100%"
                      height="100%"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      data-karrot-ui-icon="true"
                    >
                      <g>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.64948 3.27994L16.6995 11.3299C17.0695 11.6999 17.0695 12.2999 16.6995 12.6699L8.64948 20.7199C8.27948 21.0899 7.67948 21.0899 7.30948 20.7199C6.93948 20.3499 6.93948 19.7499 7.30948 19.3799L14.6895 11.9999L7.30948 4.61994C6.93948 4.24994 6.93948 3.64994 7.30948 3.27994C7.67948 2.90994 8.27948 2.90994 8.64948 3.27994Z"
                          fill="currentColor"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </span>
              </Link>
            </header>
            <div className="wa1ti51 _9rcp1w1 _1xxhs21j">
              <div className="_1n1zga84 _1n1zga80 _1h4pbgya0o">
                <div
                  data-scroll_div="scroll_div"
                  data-scroll_idx="0"
                  data-scroll_range="3"
                  className="_1n1zga85 _1h4pbgy9zk _1h4pbgy8jc"
                >
                  <div className="wa1ti52 _1h4pbgy7nk _1h4pbgy7o1 _1h4pbgy7oy _1h4pbgy7m3 _1h4pbgy7s8 _1h4pbgy7sp _1h4pbgy7tm _1h4pbgy7qr _1h4pbgy90w _1h4pbgya54">
                    <Category category_list={category_list} />
                  </div>
                </div>
                <div
                  data-direct="left"
                  className="_1n1zga86 _1h4pbgya0w _1h4pbgy98o _1h4pbgy8tk _1h4pbgy8gg _1h4pbgy9u0 _1h4pbgy9ub _1n1zga87 _1n1zga89"
                ></div>
                <div
                  data-direct="right"
                  className="_1n1zga86 _1h4pbgya0w _1h4pbgy98o _1h4pbgy8tk _1h4pbgy8gg _1h4pbgy9u0 _1h4pbgy9ub _1n1zga88"
                ></div>
                <div
                  onClick={slide_l}
                  className="_1n1zga8a _1n1zga8b"
                  style={{
                    _1n1zga81: "var(_1xxhs219)",
                    _1n1zga82: "var(_1xxhs21c)",
                    _1n1zga83: "var(_1xxhs21f)",
                  }}
                >
                  <div className="_1n1zga8d _1h4pbgya0w _1h4pbgy9dc _1h4pbgy1u0 _1h4pbgy8i8 _1h4pbgy8sg _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy98g _1h4pbgy9yw _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgya5s _1n1zga8e _1n1zga8g">
                    <span
                      style={{ display: "inline-flex" }}
                      className="_1n1zga8h"
                      data-seed-icon="icon_chevron_left_thin"
                      data-seed-icon-version="0.2.1"
                    >
                      <svg
                        id="icon_chevron_left_thin"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        data-karrot-ui-icon="true"
                      >
                        <g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M16.6225 3.17006C16.8525 3.40006 16.8525 3.78006 16.6225 4.01006L8.63245 12.0001L16.6225 19.9901C16.8525 20.2201 16.8525 20.6001 16.6225 20.8301C16.3925 21.0601 16.0125 21.0601 15.7825 20.8301L7.37245 12.4201C7.14245 12.1901 7.14245 11.8101 7.37245 11.5801L15.7825 3.17006C16.0125 2.94006 16.3925 2.94006 16.6225 3.17006Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
                <div
                  onClick={slide_r}
                  className="_1n1zga8a _1n1zga8c"
                  style={{
                    _1n1zga81: "var(_1xxhs219)",
                    _1n1zga82: "var(_1xxhs21c)",
                    _1n1zga83: "var(_1xxhs21f)",
                  }}
                >
                  <div className="_1n1zga8d _1h4pbgya0w _1h4pbgy9dc _1h4pbgy1u0 _1h4pbgy8i8 _1h4pbgy8sg _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy98g _1h4pbgy9yw _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgya5s _1n1zga8f">
                    <span
                      style={{ display: "inline-flex" }}
                      className="_1n1zga8h"
                      data-seed-icon="icon_chevron_right_thin"
                      data-seed-icon-version="0.2.1"
                    >
                      <svg
                        id="icon_chevron_right_thin"
                        width="100%"
                        height="100%"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        data-karrot-ui-icon="true"
                      >
                        <g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.22246 3.17006L16.6325 11.5801C16.8625 11.8101 16.8625 12.1901 16.6325 12.4201L8.22246 20.8301C7.99246 21.0601 7.61246 21.0601 7.38246 20.8301C7.15246 20.6001 7.15246 20.2201 7.38246 19.9901L15.3725 12.0001L7.38246 4.01006C7.15246 3.78006 7.15246 3.40006 7.38246 3.17006C7.61246 2.94006 7.99246 2.94006 8.22246 3.17006Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 카테고리 3개 */}
          {cate_list &&
            cate_list.length > 0 &&
            cate_list.map(
              (child_list, i) =>
                child_list &&
                child_list.length > 0 && (
                  <section key={i} className="_1h4pbgy9ug _1h4pbgy9vs">
                    <header className="_1h4pbgy7xc _1h4pbgy7xv _1h4pbgy828 _1h4pbgy82r _1h4pbgy9ug _1h4pbgy9xs">
                      <div
                        data-gtm="main_article"
                        className="_1h4pbgy8g _1h4pbgy7ag _1h4pbgy78o _1h4pbgy797 _1h4pbgy9w0"
                      >
                        {category_list.map((cate, i) =>
                          child_list &&
                          child_list.length > 0 &&
                          child_list[0].categorykey == cate.categorykey ? (
                            <font key={i}>{cate.categoryname}</font>
                          ) : (
                            ""
                          )
                        )}
                      </div>
                      <Link
                        className="_1h4pbgy9ug _1h4pbgy76o _1h4pbgy78j _1h4pbgy784 _1h4pbgy78l _1h4pbgy7ao"
                        href={`/post?sort=recent&category=${child_list && child_list.length > 0 && child_list[0].categorykey}`}
                      >
                        <span
                          data-gtm="main_see_all"
                          className="m79qaj0 _1h4pbgyu0 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8zs"
                        >
                          <font>
                            <font>더보기</font>
                          </font>
                        </span>
                        <span className="_1h4pbgy9ug _1h4pbgy9wo">
                          <span
                            style={{
                              display: "inline-flex",
                              width: "16px",
                              height: "16px",
                            }}
                            className="_1h4pbgyu0"
                            data-seed-icon="icon_chevron_right_fill"
                            data-seed-icon-version="0.2.1"
                          >
                            <svg
                              id="icon_chevron_right_fill"
                              width="100%"
                              height="100%"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              data-karrot-ui-icon="true"
                            >
                              <g>
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M8.64948 3.27994L16.6995 11.3299C17.0695 11.6999 17.0695 12.2999 16.6995 12.6699L8.64948 20.7199C8.27948 21.0899 7.67948 21.0899 7.30948 20.7199C6.93948 20.3499 6.93948 19.7499 7.30948 19.3799L14.6895 11.9999L7.30948 4.61994C6.93948 4.24994 6.93948 3.64994 7.30948 3.27994C7.67948 2.90994 8.27948 2.90994 8.64948 3.27994Z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </Link>
                    </header>
                    <div className="wa1ti51 _9rcp1w1 _1b153uw7">
                      <div className="_1n1zga84 _1n1zga80 _1h4pbgya0o">
                        <div
                          data-scroll_div="scroll_div"
                          data-scroll_idx="0"
                          data-scroll_range="2"
                          className="_1n1zga85 _1h4pbgy9zk _1h4pbgy8jc"
                        >
                          <div className="wa1ti52 _1h4pbgy7nk _1h4pbgy7o1 _1h4pbgy7oy _1h4pbgy7m3 _1h4pbgy7s8 _1h4pbgy7sp _1h4pbgy7tm _1h4pbgy7qr _1h4pbgy90w _1h4pbgya54">
                            {child_list.map((post, i) => (
                              <div key={i} className="wa1ti53">
                                <Link
                                  href={`/post/detail?postkey=${post.postkey}`}
                                >
                                  <article className="_1b153uw9 _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy90g _1b153uw8 _1b153uwb _1b153uw7">
                                    <div className="_1b153uwd _1h4pbgy1ts _1h4pbgya0o _1h4pbgya2w _1h4pbgy94w">
                                      {post.pimg_list &&
                                      post.pimg_list.length > 0 ? (
                                        <span
                                          className=" lazy-load-image-background opacity lazy-load-image-loaded"
                                          style={{
                                            color: "transparent",
                                            display: "inlineBlock",
                                          }}
                                        >
                                          <img
                                            className="_1b153uwe _1h4pbgya3k"
                                            src={post.pimg_list[0].imgurl}
                                            alt="썸네일"
                                            onError={(e) => {
                                              // 부모 span 태그를 DOM에서 제거
                                              const parentSpan =
                                                e.target.parentNode;

                                              // 새로운 div를 생성하고 아이콘을 삽입
                                              const fallbackIcon =
                                                document.createElement("div");
                                              fallbackIcon.innerHTML = `
                    <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="LocalMallIcon" data-first-child="" style="width: 100%; height: 100%; z-index: 1; color: rgb(255, 111, 97); box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px; background-color: rgb(249, 249, 249);"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3m0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5"></path></svg>`;
                                              parentSpan.parentNode.appendChild(
                                                fallbackIcon
                                              );
                                              parentSpan.remove();
                                            }}
                                          />
                                        </span>
                                      ) : (
                                        <LocalMallIcon
                                          style={{
                                            width: "100%", // 아이콘의 너비를 100%로 설정
                                            height: "100%", // 아이콘의 높이를 100%로 설정
                                            zIndex: 1, // 필요하면 z-index로 가시성을 확보
                                            color: "#ff6f61", // 이쁜 코랄 계열 색상
                                            backgroundColor: "#f9f9f9", // 아이콘 뒤 배경 색상
                                          }}
                                        />
                                      )}
                                    </div>
                                    <div className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9wg _1h4pbgy90g">
                                      <div className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9wg _1h4pbgy8zs _1h4pbgy8g _1h4pbgy8jc">
                                        <div className="_1b153uwf _1h4pbgy7ao _1h4pbgy780 _1h4pbgya2w _1h4pbgy8og _1h4pbgya54">
                                          <font>
                                            <font>{post.title}</font>
                                          </font>
                                        </div>
                                        <div className="_1b153uwg _1h4pbgy7ag _1h4pbgy780 _1h4pbgya54">
                                          <font>
                                            <font>
                                              {post.price == 0
                                                ? "나눔♥"
                                                : new Intl.NumberFormat(
                                                    "ko-KR"
                                                  ).format(post.price) + "원"}
                                            </font>
                                          </font>
                                        </div>
                                      </div>
                                      <div className="_1b153uwh _1h4pbgy8jc">
                                        <h2 className="_1b153uwi _1h4pbgy7ao _1h4pbgy79s _1h4pbgy80 _1h4pbgya54 _1h4pbgy8jc _1h4pbgya2w">
                                          <font>
                                            <font>
                                              {post.townVO &&
                                                post.townVO.region3}
                                            </font>
                                          </font>
                                        </h2>
                                      </div>
                                    </div>
                                  </article>
                                </Link>
                              </div>
                            ))}
                            <Link
                              href={`/post?sort=recent&category=${child_list && child_list.length > 0 && child_list[0].categorykey}`}
                            >
                              <div className="_1kquttw0 _1b153uw8 _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy174 _1h4pbgy3oo _1h4pbgy94w _1kquttw1 _1b153uw6">
                                <div className="_1h4pbgy9ug _1h4pbgy8zs">
                                  <span className="_1h4pbgy8g _1h4pbgy7ao">
                                    <font>
                                      <font>전체 보기</font>
                                    </font>
                                  </span>
                                  <span className="_1h4pbgy9ug _1h4pbgy9xc _1h4pbgy9wo">
                                    <span
                                      style={{
                                        display: "inline-flex",
                                        width: "14px",
                                        height: "14px",
                                      }}
                                      data-seed-icon="icon_chevron_right_fill"
                                      data-seed-icon-version="0.2.1"
                                    >
                                      <svg
                                        id="icon_chevron_right_fill"
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        data-karrot-ui-icon="true"
                                      >
                                        <g>
                                          <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M8.64948 3.27994L16.6995 11.3299C17.0695 11.6999 17.0695 12.2999 16.6995 12.6699L8.64948 20.7199C8.27948 21.0899 7.67948 21.0899 7.30948 20.7199C6.93948 20.3499 6.93948 19.7499 7.30948 19.3799L14.6895 11.9999L7.30948 4.61994C6.93948 4.24994 6.93948 3.64994 7.30948 3.27994C7.67948 2.90994 8.27948 2.90994 8.64948 3.27994Z"
                                            fill="currentColor"
                                          ></path>
                                        </g>
                                      </svg>
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div
                          data-direct="left"
                          className="_1n1zga86 _1h4pbgya0w _1h4pbgy98o _1h4pbgy8tk _1h4pbgy8gg _1h4pbgy9u0 _1h4pbgy9ub _1n1zga87 _1n1zga89"
                        ></div>
                        <div
                          data-direct="right"
                          className="_1n1zga86 _1h4pbgya0w _1h4pbgy98o _1h4pbgy8tk _1h4pbgy8gg _1h4pbgy9u0 _1h4pbgy9ub _1n1zga88"
                        ></div>
                        <div
                          onClick={slide_l}
                          className="_1n1zga8a _1n1zga8b"
                          style={{
                            _1n1zga81: "var(_1b153uw3)",
                            _1n1zga82: "var(_1b153uw4)",
                            _1n1zga83: "var(_1b153uw5)",
                          }}
                        >
                          <div className="_1n1zga8d _1h4pbgya0w _1h4pbgy9dc _1h4pbgy1u0 _1h4pbgy8i8 _1h4pbgy8sg _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy98g _1h4pbgy9yw _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgya5s _1n1zga8e _1n1zga8g">
                            <span
                              style={{ display: "inline-flex" }}
                              className="_1n1zga8h"
                              data-seed-icon="icon_chevron_left_thin"
                              data-seed-icon-version="0.2.1"
                            >
                              <svg
                                id="icon_chevron_left_thin"
                                width="100%"
                                height="100%"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                data-karrot-ui-icon="true"
                              >
                                <g>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16.6225 3.17006C16.8525 3.40006 16.8525 3.78006 16.6225 4.01006L8.63245 12.0001L16.6225 19.9901C16.8525 20.2201 16.8525 20.6001 16.6225 20.8301C16.3925 21.0601 16.0125 21.0601 15.7825 20.8301L7.37245 12.4201C7.14245 12.1901 7.14245 11.8101 7.37245 11.5801L15.7825 3.17006C16.0125 2.94006 16.3925 2.94006 16.6225 3.17006Z"
                                    fill="currentColor"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </div>
                        </div>
                        <div
                          onClick={slide_r}
                          className="_1n1zga8a _1n1zga8c"
                          style={{
                            _1n1zga81: "var(_1b153uw3)",
                            _1n1zga82: "var(_1b153uw4)",
                            _1n1zga83: "var(_1b153uw5)",
                          }}
                        >
                          <div className="_1n1zga8d _1h4pbgya0w _1h4pbgy9dc _1h4pbgy1u0 _1h4pbgy8i8 _1h4pbgy8sg _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy98g _1h4pbgy9yw _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgya5s _1n1zga8f">
                            <span
                              style={{ display: "inline-flex" }}
                              className="_1n1zga8h"
                              data-seed-icon="icon_chevron_right_thin"
                              data-seed-icon-version="0.2.1"
                            >
                              <svg
                                id="icon_chevron_right_thin"
                                width="100%"
                                height="100%"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                data-karrot-ui-icon="true"
                              >
                                <g>
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M8.22246 3.17006L16.6325 11.5801C16.8625 11.8101 16.8625 12.1901 16.6325 12.4201L8.22246 20.8301C7.99246 21.0601 7.61246 21.0601 7.38246 20.8301C7.15246 20.6001 7.15246 20.2201 7.38246 19.9901L15.3725 12.0001L7.38246 4.01006C7.15246 3.78006 7.15246 3.40006 7.38246 3.17006C7.61246 2.94006 7.99246 2.94006 8.22246 3.17006Z"
                                    fill="currentColor"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )
            )}
          {/* cate1_list */}
        </article>
      </div>
    </>
  );
}
