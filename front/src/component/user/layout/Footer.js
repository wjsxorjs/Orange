import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import QnaModal from "../customer/QnaModal";
import FaqModal from "../customer/FaqModal";
export default function Footer() {

  //문의하기
  const [qnaOpen, setQnaOpen] = useState(false);
  const handleQnaOpen = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault(); // 이벤트가 있을 때만 링크 원래 기능 막기
    }
    setQnaOpen(true);
  };
  const handleQnaClose = () => {
    setQnaOpen(false);
  };

  //FAQ
  const [faqOpen, setFaqOpen] = useState(false);
  const handleFaqOpen = (e) => {
    e.preventDefault(); // 링크의 기본 동작 방지
    setFaqOpen(true);
  };
  const handleFaqClose = () => {
    setFaqOpen(false);
  };

  return (
    <>
      <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
        <div className="dmu53n0 _1h4pbgy7g8 _1h4pbgy7kw _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy1u0 _1h4pbgy8g">
          <div className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9vn">
            <div className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy834 _1h4pbgy9w0">
              <div className="_1h4pbgy828">
                <img
                  src="/img/Orange_logo_final.png"
                  alt="당근마켓 로고"
                  style={{ width: "100px", height: "auto" }}
                />
              </div>
            </div>
            <div className="dmu53n1 _1h4pbgy9vc _1h4pbgy91s">
              <div className="dmu53n2">
                <div className="_1h4pbgy780 _1h4pbgy7ag _1h4pbgy81k">
                  <font>
                    <font>오렌지마켙</font>
                  </font>
                </div>
                <div className="_1h4pbgy9ug _1h4pbgy9vs">
                  <Link
                    data-gtm="footer_navigation"
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                    href="/about_us"
                  >
                    <font>
                      <font>회사 소개</font>
                    </font>
                  </Link>
                  <Link
                    data-gtm="footer_navigation"
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                    href="/team_introduce"
                  >
                    <font>
                      <font>개발자 소개</font>
                    </font>
                  </Link>
                </div>
              </div>

              <div className="dmu53n2">
                <div className="_1h4pbgy780 _1h4pbgy7ag _1h4pbgy81k">
                  <font>오렌지소식</font>
                </div>
                <div className="_1h4pbgy9ug _1h4pbgy9vs">
                  <Link
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                    href='/Board/list/1' // 각 카테고리의 링크를 설정
                    target="_self"
                  >
                    <font>공지사항</font> {/* 카테고리 이름 표시 */}
                  </Link>
                  <Link
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                    href='/Board/list/2' // 각 카테고리의 링크를 설정
                    target="_self"
                  >
                    <font>이벤트</font> {/* 카테고리 이름 표시 */}
                  </Link>
                </div>
              </div>

              <div className="dmu53n2">
                <div className="_1h4pbgy780 _1h4pbgy7ag _1h4pbgy81k">
                  <font>
                    <font>고객센터</font>
                  </font>
                </div>
                <div className="_1h4pbgy9ug _1h4pbgy9vs">
                  <Link
                    data-gtm="footer_navigation"
                    href="#"
                    rel="noreferrer noopener"
                    onClick={handleFaqOpen}
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                  >
                    <font>
                      <font>자주 묻는 질문</font>
                    </font>
                  </Link>
                  <FaqModal faqOpen={faqOpen} handleFaqClose={handleFaqClose} handleQnaOpen={handleQnaOpen}/>
                  <Link
                    data-gtm="footer_navigation"
                    href="#"
                    rel="noreferrer noopener"
                    onClick={handleQnaOpen}
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                  >
                    <font>
                      <font>문의하기</font>
                    </font>
                  </Link>
                  <QnaModal qnaOpen={qnaOpen} handleQnaClose={handleQnaClose} />
                </div>
              </div>
              <div className="dmu53n2">
                <div className="_1h4pbgy780 _1h4pbgy7ag _1h4pbgy81k">
                  <font>
                    <font>약관 및 정책</font>
                  </font>
                </div>
                <div className="_1h4pbgy9ug _1h4pbgy9vs">
                  <Link
                    data-gtm="footer_navigation"
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                    href="/Board/terms"
                    rel="noreferrer noopener"
                  >
                    <font>
                      <font>서비스 이용약관</font>
                    </font>
                  </Link>
                  <Link
                    href={{
                      pathname: "/Board/terms",
                      query: { term: "개인정보 처리방침" },
                    }}
                    data-gtm="footer_navigation"
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                    rel="noreferrer noopener"
                  >
                    <font>
                      <font>개인정보 처리방침</font>
                    </font>
                  </Link>
                  <Link
                    href={{
                      pathname: "/Board/terms",
                      query: { term: "위치기반 서비스 이용약관" },
                    }}
                    data-gtm="footer_navigation"
                    className="dmu53n3 _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8g _1h4pbgy76o _1h4pbgy81c _1h4pbgya28"
                    rel="noreferrer noopener"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <font>
                      <font>위치기반 서비스 이용약관</font>
                    </font>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="_1h4pbgy7y8 _1h4pbgy834 _1h4pbgy17k _1h4pbgy8pc"></div>
          <div className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9vn _1h4pbgy9xs">
            <div className="_1h4pbgy82o _1h4pbgy803 _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9vn">
              <div className="_1h4pbgy76o _1h4pbgy7ag _1h4pbgy7s _1h4pbgy80w _1h4pbgy8ao">
                <font>
                  <font>주식회사 오렌지마켙</font>
                </font>
              </div>
              <div className="_1h4pbgy76o _1h4pbgy7s"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
