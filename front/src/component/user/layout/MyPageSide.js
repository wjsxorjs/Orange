"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import "/public/css/myPage.css";
import axios from "axios";
import FaqModal from "../customer/FaqModal";
import QnaModal from "../customer/QnaModal";

export default function MyPageSide(props) {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState("");

  // 클라이언트 사이드에서만 useSearchParams 사용
  const searchParams = useSearchParams(); // 클라이언트에서만 실행
  useEffect(() => {
    if (searchParams) {
      const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
      setCurrentPath(fullPath); // fullPath 설정
    } else {
      setCurrentPath(pathname); // pathname만 설정
    }
  }, [pathname]);

  const BC_URL = "/api/admin/board/getAllBc";
  const [bc_list, setBc_list] = useState([]);

  function getData() {
    axios.get(BC_URL).then((res) => {
      setBc_list(res.data.bc_list);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      // 전체 링크를 가져와서 각각 처리
      document.querySelectorAll("a[data-href]").forEach((link) => {
        const linkHref = link.getAttribute("data-href");
  
        // 쿼리 파라미터가 있는 링크는 전체 경로로 비교하고, 없는 링크는 pathname으로만 비교
        if (linkHref === currentPath || (linkHref === pathname && !linkHref.includes("?"))) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }, [currentPath, pathname]);

  //FAQ
  const [faqOpen, setFaqOpen] = useState(false);
  const handleFaqOpen = (e) => {
    e.preventDefault(); // 링크의 기본 동작 방지
    setFaqOpen(true);
  };
  const handleFaqClose = () => {
    setFaqOpen(false);
  };

  //QnA
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

  return (
    <div
      data-v-0adb81cc=""
      className="snb_area _1d991sp0 _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgy9vs"
      data-v-1ed3965f=""
    >
      <nav data-v-7bcac446="" data-v-0adb81cc="" className="snb">
        <div data-v-7bcac446="" className="snb_list1">
          <strong data-v-7bcac446="" className="snb_title">
            나의 거래
          </strong>
          <ul data-v-7a824f04="" data-v-7bcac446="" className="snb_menu">
            <li data-v-7a824f04="" className="menu_item">
              <Link
                data-href="/myPage/likelist"
                data-v-7a824f04=""
                href="/myPage/likelist"
                className="menu_link"
              >
                관심목록
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link
                data-href="/myPage/celllist"
                data-v-7a824f04=""
                href="/myPage/celllist"
                className="menu_link"
              >
                판매내역
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link
                data-href="/myPage/buylist"
                data-v-7a824f04=""
                href="/myPage/buylist"
                className="menu_link"
              >
                구매내역
              </Link>
            </li>
          </ul>
        </div>
        <div data-v-7bcac446="" className="snb_list1">
          <strong data-v-7bcac446="" className="snb_title">
            나의 정보
          </strong>
          <ul data-v-7a824f04="" data-v-7bcac446="" className="snb_menu">
            <li data-v-7a824f04="" className="menu_item">
              <Link
                data-href="/myPage"
                data-v-7a824f04=""
                href="/myPage"
                className="menu_link"
              >
                마이페이지
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link
                data-href="/myPage/profile"
                data-v-7a824f04=""
                href="/myPage/profile"
                className="menu_link"
              >
                프로필
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="/myPage/userManage?category=likeUser" className="menu_link"
                    data-href="/myPage/userManage?category=likeUser">
                사용자 관리
              </Link>
            </li>
            {/* <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="/myPage/userManage?category=blockedUser" className="menu_link"
                    data-href="/myPage/userManage?category=blockedUser">
                차단 사용자 관리
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="/myPage/userManage?category=noseeUser" className="menu_link"
                    data-href="/myPage/userManage?category=noseeUser">
                게시글 미노출 사용자 관리
              </Link>
            </li> */}
            {/* <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="#" className="menu_link">
                관심 카테고리 설정
              </Link>
            </li> */}
            <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="#" className="menu_link">
                알림 설정
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link
                data-href="/myPage/qna"
                data-v-7a824f04=""
                href="/myPage/qna"
                className="menu_link">
                문의사항
              </Link>
            </li>
            {/* <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="#" className="menu_link">
                매너온도
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="#" className="menu_link">
                활동 배지
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="#" className="menu_link">
                받은 매너 평가
              </Link>
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="#" className="menu_link">
                받은 거래 후기
              </Link>
            </li> */}
          </ul>
        </div>
        <div data-v-7bcac446="" className="snb_list1">
          <strong data-v-7bcac446="" className="snb_title">
            쌍용 소식
          </strong>
          <ul data-v-7a824f04="" data-v-7bcac446="" className="snb_menu">
            {bc_list.map((ar, index) => (
              <li data-v-7a824f04=""  key={index} className="menu_item">
                <Link data-v-7a824f04="" className="menu_link" href={`/Board/list/${ar.key}`}target="_self">
                  <font>{ar.value}</font>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div data-v-7bcac446="" className="snb_list1">
          <strong data-v-7bcac446="" className="snb_title">
            기타
          </strong>
          <ul data-v-7a824f04="" data-v-7bcac446="" className="snb_menu">
            {/* <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="#" className="menu_link">
                키워드 알림 설정
              </Link>
            </li> */}
            <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="#" className="menu_link" onClick={handleFaqOpen}>
                    자주 묻는 질문
              </Link>
              <FaqModal faqOpen={faqOpen} handleFaqClose={handleFaqClose} handleQnaOpen={handleQnaOpen} />
              <QnaModal qnaOpen={qnaOpen} handleQnaClose={handleQnaClose} />
            </li>
            <li data-v-7a824f04="" className="menu_item">
              <Link data-v-7a824f04="" href="/Board/terms" className="menu_link">
                약관 및 정책
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
