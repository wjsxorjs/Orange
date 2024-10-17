"use client";

import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import IconButton from "@mui/joy/IconButton";
import AspectRatio from "@mui/joy/AspectRatio";
import Typography from "@mui/joy/Typography";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import {
  Backdrop,
  Box,
  Breadcrumbs,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  ImageList,
  ImageListItem,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import "/public/css/myPage.css";
import "/public/css/profile.css";
import Cookies from "js-cookie";
import EditPostModal from "@/component/user/post/detail/EditPostModal";

export default function page() {
  const [region2_list, setRegion2_list] = useState([]);
  const [category_list, setCategory_list] = useState([]);
  const [post_list, setPost_list] = useState([]);

  const router = useRouter();

  // 현재 가져온 상품 개수
  const [lastPostKey, setLastPostKey] = useState(0);
  // 상품 수 15개 보다 적을 경우 더보기 숨김
  const [viewMore, setViewMore] = useState(true);
  // 위치 파라미터 값
  const [loc1Param, setLoc1Param] = useState("");
  const [loc2Param, setLoc2Param] = useState([]);
  // 판매중인 상품만 보기
  const [onsaleParam, setOnsaleParam] = useState("false");
  // 게시글 검색 값
  const [searchParam, setSearchParam] = useState("");
  // 카테고리 파라미터 값
  const [categoryParam, setCategoryParam] = useState(null);
  // 정렬 파라미터 값
  const [sortParam, setSortParam] = useState(null);
  // 가격 파라미터 값
  const [minPriceParam, setMinPriceParam] = useState(null);
  const [maxPriceParam, setMaxPriceParam] = useState(null);
  // 쿠키 - 현재위치
  const cookie_latitude = Cookies.get("latitude");
  const cookie_longitude = Cookies.get("longitude");
  const [cookie_region1, setCookie_region1] = useState("");
  const [cookie_region2, setCookie_region2] = useState("");
  const [cookie_region3, setCookie_region3] = useState("");
  // 프로그레스 띄우기용
  const [loading, setLoading] = useState(false);

  // #region 비동기-카테고리 리스트
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
  // #endregion

  // #region 비동기-Region2 리스트
  function getRegion2(loc1, loc2) {
    axios({
      url: "/api/town/postside",
      method: "post",
      data: {
        key: "1",
        value: loc1,
        now: loc2,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setRegion2_list(res.data.res_list);
    });
  }
  // #endregion

  // #region useEffect-카테고리, 파라미터 초기화
  useEffect(() => {
    setCookie_region1(decodeURIComponent(Cookies.get("region1")));
    setCookie_region2(decodeURIComponent(Cookies.get("region2")));
    setCookie_region3(decodeURIComponent(Cookies.get("region3")));

    getCategory();

    let currentUrl = window.location.href;
    let currentUrlObj = new URL(currentUrl);
    let params = new URLSearchParams(currentUrlObj.search);
    let loc1Param = params.get("loc1");
    let loc2Param = params.getAll("loc2");
    let onsaleParam = params.get("onsale");
    let searchParam = params.get("search");
    let cateParam = params.get("category");
    let srtParam = params.get("sort");
    let minParam = params.get("minPrice");
    let maxParam = params.get("maxPrice");

    if (loc1Param != null && loc1Param != "") {
      getRegion2(loc1Param, loc2Param);
    }

    setLoc1Param(loc1Param);
    setLoc2Param(loc2Param);
    if (onsaleParam == null || onsaleParam == "") {
      onsaleParam = "false";
    }
    setOnsaleParam(onsaleParam);
    setSearchParam(searchParam);
    setCategoryParam(cateParam);
    setSortParam(srtParam);
    setMinPriceParam(minParam);
    setMaxPriceParam(maxParam);

    axios({
      url: "/api/adpost/search",
      method: "post",
      data: {
        userkey: decodeURIComponent(Cookies.get("userkey")),
        onsale: onsaleParam,
        search: searchParam,
        loc1: loc1Param,
        loc2: loc2Param,
        category: cateParam,
        sort: srtParam,
        minPrice: minParam,
        maxPrice: maxParam,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setPost_list(res.data.res_search);
      if (!res.data.res_search || res.data.res_search.length < 15) {
        setViewMore(false);
      }
      if (res.data.lastPostKey != null) {
        setLastPostKey(res.data.lastPostKey);
      }
    });
  }, [router.query]);
  // #endregion

  // #region 상품 더보기
  useEffect(() => {
    if (loading) {
      axios({
        url: "/api/adpost/search",
        method: "post",
        data: {
          userkey: decodeURIComponent(Cookies.get("userkey")),
          onsale: onsaleParam,
          lastPostKey: lastPostKey,
          search: searchParam,
          loc1: loc1Param,
          loc2: loc2Param,
          category: categoryParam,
          sort: sortParam,
          minPrice: minPriceParam,
          maxPrice: maxPriceParam,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.data.res_search || res.data.res_search.length == 0) {
          setViewMore(false);
        } else {
          setPost_list((post) => [...post, ...res.data.res_search]);
          if (res.data.res_search.length < 15) {
            setViewMore(false);
          }
          if (res.data.lastPostKey != null) {
            setLastPostKey(res.data.lastPostKey);
          }
        }
      });
      setLoading(false);
    }
  }, [loading]);
  //
  function showMorePost() {
    setLoading(true);
  }
  // #endregion

  // #region 시간표현
  function timeDifference(postTime) {
    const now = new Date(); // 현재 시간
    const postDate = new Date(postTime); // postVO.create_dtm 값을 Date 객체로 변환

    const timeDiff = now - postDate; // 두 시간의 차이를 밀리초로 계산
    const diffInSeconds = Math.floor(timeDiff / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYear = Math.floor(diffInDays / 365);

    // #regin 차이에 따라 적절한 문자열을 반환
    if (diffInYear > 0) {
      return `${diffInYear}년 전`;
    } else if (diffInMonths > 0) {
      return `${diffInMonths}개월 전`;
    } else if (diffInDays > 0) {
      return `${diffInDays}일 전`;
    } else if (diffInHours > 0) {
      return `${diffInHours}시간 전`;
    } else if (diffInMinutes > 0) {
      return `${diffInMinutes}분 전`;
    } else {
      return "방금 전";
    }
  }
  // #endregion

  // #region 거리 구하기
  function calDistance(post_lati, post_long) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(post_lati - cookie_latitude); // deg2rad below
    var dLon = deg2rad(post_long - cookie_longitude);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(post_lati)) *
        Math.cos(deg2rad(cookie_latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km

    if (d < 1) {
      // 1km보다 작으면 미터로 표시
      return `${Math.round(d * 1000)}m`;
    } else {
      // 1km 이상이면 소수점 첫째 자리까지 km로 표시
      return `${d.toFixed(1)}km`;
    }
  }
  // #endregion

  // #region 내 물건 팔기 버튼
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      const container = document.getElementById("search_article");
      const button = document.querySelector(".write-button");

      const handleScroll = () => {
        const containerRect = container.getBoundingClientRect();
        const buttonHeight = button.offsetHeight;

        // 1. 컨테이너가 화면에 전혀 보이지 않을 때 버튼을 숨김
        if (
          containerRect.bottom < 0 ||
          containerRect.top > window.innerHeight
        ) {
          button.style.display = "none"; // 버튼 숨김
        }
        // 2. 컨테이너가 화면에 있을 때 버튼을 보이게 함
        else {
          button.style.display = "block"; // 버튼 표시

          // 컨테이너의 bottom이 화면의 하단보다 위로 올라갔을 때
          if (containerRect.bottom <= buttonHeight + 20) {
            // 컨테이너 하단에 고정
            button.style.position = "absolute";
            button.style.bottom = "20px";
            button.style.right = "20px";
          }
          // 컨테이너가 화면에 보일 때
          else if (containerRect.top <= window.innerHeight) {
            // 버튼이 화면의 오른쪽 하단에 고정
            button.style.position = "fixed";
            button.style.bottom = "20px";
            button.style.right = `${
              window.innerWidth - containerRect.right + 20
            }px`;
          } else {
            // 기본 absolute 위치
            button.style.position = "absolute";
            button.style.bottom = "20px";
            button.style.right = "20px";
          }
        }
      };

      handleScroll();

      document.addEventListener("scroll", handleScroll);

      return () => {
        document.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  // #endregion

  // #region 민호-물건팔기 모달 open & 임시저장 불러오기
  const [tempPost, setTempPost] = useState({});
  const [tempPostConfirmOpen, setTempPostConfirmOpen] = useState(false);
  const [isTemp, setIsTemp] = useState(false);

  function tempPostClose(chkTemp) {
    setTempPostConfirmOpen(false);
    if (chkTemp == null) return;
    if (chkTemp == 1) setIsTemp(true);
    else setOpen(true);
  }

  function chkTown() {
    // 로그인 확인
    if (Cookies.get("userkey") == null || Cookies.get("userkey") == "") {
      alert("로그인 후 이용해주세요.");
      return;
    }

    // 위치 기반 서비스 확인
    if (
      (region1 == null || region1 == "") &&
      (cookie_region1 == null ||
        cookie_region1 == "" ||
        cookie_region1 == "undefined")
    ) {
      alert("위치 기반 서비스를 허용해주세요.");
      return;
    }

    // 임시저장 확인
    axios({
      url: "/api/adpost/searchTemp",
      method: "get",
      params: {
        userkey: decodeURIComponent(Cookies.get("userkey")),
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setTempPost(res.data.res_searchTemp);
      if (res.data.res_searchTemp != null) {
        setTempPostConfirmOpen(true);
      } else {
        setOpen(true);
      }
    });
  }
  // #endregion

  // #region 판매중인 상품만 보기 선택
  function goOnsale(e) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    params.delete("onsale");
    let newUrl = url.pathname + "?" + params.toString() + url.hash;
    if (e.dataset.checked == "false") {
      newUrl += "&onsale=true";
    }

    // 페이지 이동
    router.push(newUrl);
    window.location.href = newUrl;
  }
  // #endregion

  // #region 동네 선택
  function goLocPage(e) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    if (e.dataset.selected == "true") {
      e.dataset.selected = "false";
    } else {
      e.dataset.selected = "true";
    }

    // URL에서 'loc2' 파라미터 제거
    params.delete("loc2");

    let newUrl = url.pathname + "?" + params.toString() + url.hash;
    if (e.dataset.loc == "all") {
      newUrl += "&loc2=all";
    } else {
      let tmpCnt = 0;
      let tmpNewUrl = "";
      Array.from(document.getElementsByClassName("locationlink")).forEach(
        (item) => {
          if (item.dataset.selected == "true") {
            tmpNewUrl += "&loc2=" + item.dataset.loc;
            tmpCnt++;
          }
        }
      );

      if (tmpCnt == region2_list.length || tmpCnt == 0) {
        newUrl += "&loc2=all";
      } else {
        newUrl += tmpNewUrl;
      }
    }

    // 페이지 이동
    router.push(newUrl);
    window.location.href = newUrl;
  }
  // #endregion

  // #region 카테고리 선택
  function goPage(e, key) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    // URL에서 'category' 파라미터를 제거
    params.delete("category");
    // 선택된 경우 category 추가
    // 선택 해제인 경우 유지
    let newUrl = url.pathname + "?" + params.toString() + url.hash;
    if (e.dataset.selected !== "true") {
      newUrl += "&category=" + key;
    }

    // 페이지 이동
    router.push(newUrl);
    window.location.href = newUrl;
  }
  // #endregion

  // #region 정렬 선택
  function goSortPage(e, key) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    let tmp = params.get("sort");
    // 같으면 수행 안함, 다르면 'sort' 파라미터 제거 후 추가
    if (tmp == key) {
      return;
    } else {
      params.delete("sort");
    }

    let newUrl = url.pathname + "?" + params.toString() + url.hash;
    newUrl += "&sort=" + key;

    // 페이지 이동
    router.push(newUrl);
    window.location.href = newUrl;
  }
  // #endregion

  // #region 가격 선택
  function goPricePage(e, minp, maxp) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    let min = params.get("minPrice");
    let max = params.get("maxPrice");
    if (min == minp && max == maxp) return;

    // 가격 파라미터 제거
    params.delete("minPrice");
    params.delete("maxPrice");

    // 경로와 수정된 쿼리 문자열을 조합하여 새로운 URL을 만듭니다.
    let newUrl = url.pathname + "?" + params.toString() + url.hash;
    newUrl += "&minPrice=" + minp;
    newUrl += "&maxPrice=" + maxp;

    // 페이지 이동
    router.push(newUrl);
    window.location.href = newUrl;
  }
  // #endregion

  // #region 가격 입력
  function goPricePageBtn(e) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    let min = params.get("minPrice");
    let max = params.get("maxPrice");

    let minp = parseInt(document.getElementById("price-from").value, 10);
    let maxp = parseInt(document.getElementById("price-to").value, 10);

    if (min == minp && max == maxp) return;

    if (isNaN(minp) || minp === null || minp === "") minp = 0;
    if (isNaN(maxp) || maxp === null || maxp === "") maxp = 0;
    if (minp > maxp) {
      alert("최소가격이 최대가격보다 큽니다.");
      return;
    }

    // 가격 파라미터 제거
    params.delete("minPrice");
    params.delete("maxPrice");

    // 경로와 수정된 쿼리 문자열을 조합하여 새로운 URL을 만듭니다.
    let newUrl = url.pathname + "?" + params.toString() + url.hash;
    newUrl += "&minPrice=" + minp;
    newUrl += "&maxPrice=" + maxp;

    // 페이지 이동
    router.push(newUrl);
    f;
    window.location.href = newUrl;
  }
  // #endregion

  // #region 필터 삭제
  function deleteSearch(e) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let tmp = e.dataset.deltype;
    switch (tmp) {
      case "onsale":
        params.delete("onsale");
        break;
      case "loc2":
        let loc2Params = params.getAll("loc2");
        // 모두 삭제 후 일치하지 않는 "loc2" 값들 다시 추가
        params.delete("loc2");
        let chk = false;
        loc2Params.forEach((loc2Value) => {
          if (loc2Value !== e.dataset.loc2) {
            params.append("loc2", loc2Value);
            chk = true;
          }
        });
        if (!chk || loc2Params.length === 0) {
          params.append("loc2", "all");
        }
        break;
      case "category":
        params.delete("category");
        break;
      case "price":
        params.delete("minPrice");
        params.delete("maxPrice");
        break;
      case "all":
        params.delete("onsale");
        params.delete("search");
        params.delete("sort");
        params.delete("loc2");
        params.delete("category");
        params.delete("minPrice");
        params.delete("maxPrice");
        params.append("sort", "recent");
        if (cookie_region2 != "undefined")
          params.append("loc2", cookie_region2);
        break;
    }
    // 경로와 수정된 쿼리 문자열을 조합하여 새로운 URL을 만듭니다.
    let newUrl = url.pathname + "?" + params.toString() + url.hash;

    // 페이지 이동
    router.push(newUrl);
    window.location.href = newUrl;
  }
  // #endregion

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("0");
  const [isFree, setIsFree] = useState(false);
  const [price, setPrice] = useState("");
  const [canBargain, setCanBargain] = useState(0);
  const [content, setContent] = useState("");
  const [hope_place, setHope_place] = useState("");
  const [hope_lati, setHope_lati] = useState("");
  const [hope_long, setHope_long] = useState("");
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [region3, setRegion3] = useState("");
  const [savePostKey, setSavePostKey] = useState("");

  const handleClose = () => {
    setTitle("");
    setCategory("");
    setMethod("0");
    setPrice("");
    setCanBargain(0);
    setContent("");
    setHope_place("");
    setHope_lati("");
    setHope_long("");
    setRegion1("");
    setRegion2("");
    setRegion3("");
    setIsFree(false);
    setOpen(false);
    setIsTemp(false);
    setTempPost({});
    setPreviewImages([]);
  };

  // #region 이미지업로드
  const fileInputRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]);

  // 파일 업로드 버튼 클릭 시 파일 입력 요소 클릭 이벤트 발생
  const uploadImg = (e) => {
    fileInputRef.current.click();
  };

  // 파일 입력 요소의 값이 변경되면 호출되는 함수
  const handleChange = (e) => {
    // 선택한 파일들을 배열로 가져옴
    let files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (previewImages.length + files.length > 10) {
      alert("10개를 초과할 수 없습니다.");
      return; // 10개를 초과할 경우 추가하지 않고 함수 종료
    }

    const newPreviewImages = [];

    // 파일들을 미리보기 이미지로 변환하여 저장
    files.forEach((file, index) => {
      let fileReader = new FileReader();
      fileReader.onload = function () {
        const newId = previewImages.length + index;
        newPreviewImages.push({ id: newId, src: fileReader.result, file });
        if (newPreviewImages.length === files.length) {
          setPreviewImages((prevImages) => [
            ...prevImages,
            ...newPreviewImages,
          ]);
        }
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleDelete = (index) => {
    setPreviewImages(previewImages.filter((_, i) => i !== index));
  };
  // #endregion

  // #region 내 물건 팔기
  const handleSubmit = (event) => {
    event.preventDefault();

    // 유저 토큰 확인
    let tmpUserKey = Cookies.get("userkey");
    if (tmpUserKey == null || tmpUserKey == "") {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (
      (region1 == null || region1 == "") &&
      (cookie_region1 == null ||
        cookie_region1 == "" ||
        cookie_region1 == "undefined")
    ) {
      alert("위치 기반 서비스를 허용해주세요.");
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append("userkey", tmpUserKey);

    // 이미지 파일 FormData에 추가
    previewImages.forEach((image) => {
      const fileName = image.file.name;
      formData.append("post_img", image.file, `${tmpUserKey}-${fileName}`);
    });

    // 0: 임시저장  1: 판매중(작성완료)
    const mode = event.currentTarget.dataset.mode;
    formData.append("poststatus", mode === "save" ? 0 : 1);

    // price가 공백("")이면 null 또는 0으로 변환
    formData.set("price", price === "" ? 0 : price);

    // 거래희망장소 위도, 경도
    formData.append("hope_lati", hope_lati);
    formData.append("hope_long", hope_long);

    // town 정보
    formData.append(
      "region1",
      region1 != null && region1 != "" ? region1 : cookie_region1
    );
    formData.append(
      "region2",
      region2 != null && region2 != "" ? region2 : cookie_region2
    );
    formData.append(
      "region3",
      region3 != null && region3 != "" ? region3 : cookie_region3
    );

    // 임시저장 후 작성완료 누를 경우 수정해야 함
    if (savePostKey != null && savePostKey != "") {
      formData.append("postkey", savePostKey);
    }
    formData.set("canBargain", canBargain);
    formData.append("isPostPage", 1);
    axios
      .post(
        savePostKey == null || savePostKey == ""
          ? "/api/adpost/write"
          : "/api/adpost/edit",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        if (mode === "write") {
          setSavePostKey("");
          alert("게시글이 작성되었습니다.");
          window.location.reload();
        } else {
          setSavePostKey(response.data.savePostKey);
          alert("게시글이 저장되었습니다.");
        }
      })
      .catch((error) => {
        console.error("게시글 작성 오류", error);
      });
  };
  // #endregion

  // #region 이미지 드래그
  let dragIdx = null;
  const containerRef = useRef(null); // ref로 container 관리

  useEffect(() => {
    const container = containerRef.current;

    // 드래그 시작 시 실행될 함수
    const handleDragStart = (e) => {
      const draggable = e.target;
      draggable.classList.add("dragging");
      dragIdx = Array.prototype.indexOf.call(container.children, draggable) - 1;
    };

    // 드래그 종료 시 실행될 함수
    const handleDragEnd = (e) => {
      const draggable = e.target;
      draggable.classList.remove("dragging");

      const afterElement = getDragAfterElement(container, e.clientX);
      let toIndex;
      if (afterElement == null || afterElement == undefined) {
        toIndex = container.children.length - 2;
      } else {
        toIndex = Array.prototype.indexOf.call(
          container.children,
          afterElement
        );
        if (dragIdx >= toIndex) toIndex -= 1;
        else toIndex -= 2;
      }

      if (toIndex !== -1) {
        setPreviewImages((prevPreviewImages) => {
          const tmpImages = [...prevPreviewImages]; // 얕은 복사

          // 순서 변경 로직
          const [movedItem] = tmpImages.splice(dragIdx, 1);
          tmpImages.splice(toIndex, 0, movedItem);

          // 각 이미지의 id 값을 다시 설정
          tmpImages.forEach((img, index) => {
            img.id = index;
          });

          return [...tmpImages]; // 깊은 복사하여 새로운 배열로 반환
        });
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      // DOM 조작을 하지 않고 드래그 위치 계산만 수행
    };

    if (container) {
      container.addEventListener("dragover", handleDragOver);

      const draggables = container.querySelectorAll(".draggable");
      draggables.forEach((draggable) => {
        draggable.addEventListener("dragstart", handleDragStart);
        draggable.addEventListener("dragend", handleDragEnd);
      });

      return () => {
        container.removeEventListener("dragover", handleDragOver);
        draggables.forEach((draggable) => {
          draggable.removeEventListener("dragstart", handleDragStart);
          draggable.removeEventListener("dragend", handleDragEnd);
        });
      };
    }
  }, [previewImages]);

  // 드래그 위치를 계산하는 함수
  function getDragAfterElement(container, x) {
    const draggableElements = [
      ...container.querySelectorAll(".draggable:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = x - box.left - box.width / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
  // #endregion

  // #region 내 물건 팔기 - 지도
  const [locationOpen, setLocationOpen] = useState(false);
  const [tmpHope_place, setTmpHope_place] = useState("");
  const [tmpHope_lati, setTmpHope_lati] = useState("");
  const [tmpHope_long, setTmpHope_long] = useState("");
  const [tmpRegion1, setTmpRegion1] = useState("");
  const [tmpRegion2, setTmpRegion2] = useState("");
  const [tmpRegion3, setTmpRegion3] = useState("");

  const locationHandleSubmit = (event) => {
    event.preventDefault();
    setHope_place(tmpHope_place);
    setHope_lati(tmpHope_lati);
    setHope_long(tmpHope_long);
    setRegion1(tmpRegion1);
    setRegion2(tmpRegion2);
    setRegion3(tmpRegion3);
    locationClose();
  };

  const locationClose = () => {
    setTmpHope_place("");
    setTmpHope_lati("");
    setTmpHope_long("");
    setTmpRegion1("");
    setTmpRegion2("");
    setTmpRegion3("");
    setLocationOpen(false);
  };

  function getLocation() {
    const kakaoMapScript = document.createElement("script");
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services&autoload=false`;
    kakaoMapScript.async = false;
    document.head.appendChild(kakaoMapScript);

    kakaoMapScript.onload = () => {
      // Kakao Maps API가 완전히 초기화된 후에 실행
      window.kakao.maps.load(() => {
        if (!window.kakao.maps.services) {
          return;
        }
        setMap(); // API 로드 후에 함수 호출
      });
    };
  }

  function setMap() {
    // Geolocation API 지원 여부 확인
    if ("geolocation" in navigator) {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          if (hope_lati != null && hope_lati != "") {
            latitude = hope_lati;
          }
          if (hope_long != null && hope_long != "") {
            longitude = hope_long;
          }
          if (hope_place != null && hope_place != "") {
            setTmpHope_place(hope_place);
          }

          const geocoder = new window.kakao.maps.services.Geocoder();
          const coord = new kakao.maps.LatLng(latitude, longitude);
          const callback = (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
              setTmpRegion1(result[0].address.region_1depth_name);
              setTmpRegion2(result[0].address.region_2depth_name);
              setTmpRegion3(result[0].address.region_3depth_name);
            }
          };
          geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

          // 주소-좌표 변환 객체 생성
          let locPosition = new kakao.maps.LatLng(latitude, longitude);

          let message =
            '<div style="padding:5px; font-size:11px; text-align:center; display:inline-block;">지도를 움직여 선택하세요.</div>';
          let mapContainer = document.getElementById("map"); // 지도를 표시할 div
          let mapOption = {
            center: locPosition, // 지도의 중심좌표
            level: 6, // 지도의 확대 레벨
          };
          let map = new kakao.maps.Map(mapContainer, mapOption);

          // 마커를 생성합니다
          let marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latitude, longitude),
          });

          let iwContent = message; // 인포윈도우에 표시할 내용

          // 인포윈도우를 생성합니다
          let infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
          });

          // 인포윈도우를 마커위에 표시합니다
          infowindow.open(map, marker);

          setTmpHope_lati(latitude);
          setTmpHope_long(longitude);

          marker.setMap(map);

          // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
          kakao.maps.event.addListener(map, "center_changed", function () {
            try {
              // 지도 중심좌표를 얻어옵니다
              let latlng = map.getCenter();
              marker.setPosition(latlng);
              infowindow.close();
            } catch (Exception) {
              alert("브라우저가 위치 서비스를 지원하지 않습니다.");
              return;
            }
          });

          kakao.maps.event.addListener(map, "dragend", function () {
            try {
              // 지도 중심좌표를 얻어옵니다
              let latlng = map.getCenter();
              setTmpHope_lati(latlng.getLat());
              setTmpHope_long(latlng.getLng());

              const geocoder = new window.kakao.maps.services.Geocoder();
              const callback = (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  setTmpRegion1(result[0].address.region_1depth_name);
                  setTmpRegion2(result[0].address.region_2depth_name);
                  setTmpRegion3(result[0].address.region_3depth_name);
                }
              };
              geocoder.coord2Address(
                latlng.getLng(),
                latlng.getLat(),
                callback
              );
            } catch (Exception) {
              setTmpHope_place("");
              setTmpHope_lati("");
              setTmpHope_long("");
              setTmpRegion1("");
              setTmpRegion2("");
              setTmpRegion3("");
              alert("브라우저가 위치 서비스를 지원하지 않습니다.");
              return;
            }
          });
        });
      } catch (Exception) {
        setTmpHope_place("");
        setTmpHope_lati("");
        setTmpHope_long("");
        setTmpRegion1("");
        setTmpRegion2("");
        setTmpRegion3("");
        alert("브라우저가 위치 서비스를 지원하지 않습니다.");
        return;
      }
    } else {
      setTmpHope_place("");
      setTmpHope_lati("");
      setTmpHope_long("");
      setTmpRegion1("");
      setTmpRegion2("");
      setTmpRegion3("");
      alert("브라우저가 위치 서비스를 지원하지 않습니다.");
      return;
    }
  }
  // #endregion

  return (
    <>
      <article className="_1h4pbgy7wg _1h4pbgy7wz">
        {loading && (
          <Backdrop
            open={loading}
            sx={(theme) => ({
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: "rgba(0, 0, 0, 0.2)", // 배경을 밝게 설정 (0.3로 투명도 조정)
            })}
          >
            <CircularProgress size={100} color="inherit" />
          </Backdrop>
        )}
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section style={{ borderBottom: "1px solid #ebebeb" }} className="">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link
                className="xzyefz5"
                underline="hover"
                color="inherit"
                href="/"
              >
                홈
              </Link>
              <Typography
                className="xzyefz2 xzyefz3"
                sx={{ color: "text.primary" }}
              >
                중고거래
              </Typography>
            </Breadcrumbs>
            <div className="_1h4pbgy7dk _1h4pbgy7j7 _1h4pbgy7j0 _1h4pbgy7il _1h4pbgy7w0">
              {searchParam != null && searchParam != "" && (
                <h1 className="_1h4pbgy78o _1h4pbgy796 _1h4pbgy79g _1h4pbgy7ag _1h4pbgy7c8">
                  "{searchParam}" 검색결과
                </h1>
              )}
            </div>
          </section>
        </div>
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
            <aside className="_1d991sp0 _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgy9vs">
              <header className="_1h4pbgy9ug _1h4pbgy9xs _1h4pbgy9wo">
                <h2 className="_588sy419e _588sy41y _588sy41a8">분류</h2>
                <button
                  className="seed-text-button seed-semantic-typography-label3-regular"
                  data-scope="button"
                  data-part="root"
                  id="button::R15j8p:"
                  type="button"
                  data-size="small"
                  data-variant="secondaryLow"
                  data-style="underlined"
                  data-deltype="all"
                  onClick={(e) => deleteSearch(e.currentTarget)}
                >
                  모두 지우기
                </button>
              </header>
              <section>
                <div className="_588sy41z _588sy421 _588sy4qq _588sy4h2">
                  <Link
                    href="#"
                    className="rx8bta0 rx8bta1"
                    label="Show active listings only"
                    role="checkbox"
                    aria-label="Show active listings only"
                    data-checked={`${onsaleParam}`}
                    onClick={(e) => goOnsale(e.currentTarget)}
                  >
                    <div
                      {...(onsaleParam == "true" ? { "data-checked": "" } : {})}
                      aria-hidden="true"
                      className="rx8bta7 rx8bta9"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        data-seed-icon="true"
                        data-seed-icon-version="0.4.0-beta.2"
                        width="24"
                        height="24"
                        className="rx8bta8 rx8btaf"
                        {...(onsaleParam == "true"
                          ? { "data-checked": "" }
                          : {})}
                      >
                        <g>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.0843 4.18854C21.5325 4.51124 21.6342 5.13618 21.3115 5.58438L11.3115 19.0844C11.1361 19.3281 10.8604 19.48 10.5607 19.4982C10.2609 19.5164 9.96888 19.399 9.7652 19.1784L2.7652 11.6784C2.3906 11.2725 2.4159 10.6399 2.82172 10.2653C3.22755 9.89067 3.8602 9.91597 4.23481 10.3218L10.4041 16.9219L19.6885 4.41577C20.0112 3.96757 20.6361 3.86584 21.0843 4.18854Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <span
                      id="checkbox::Rpqop::label"
                      className="rx8btal rx8btam"
                    >
                      판매중인 상품만 보기
                    </span>
                  </Link>
                </div>
                <div className="_1h4pbgy7eo _1h4pbgy7jc _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy3rc">
                  <h3 className="_588sy4198 _588sy41y _588sy41a2">동네</h3>
                  <div className="_1d991sp2 _1h4pbgya08">
                    <div className="_1h4pbgy7wo _1h4pbgy76o _1h4pbgy7ao _1h4pbgy7c0">
                      {cookie_region1 != null &&
                        cookie_region1 != "undefined" &&
                        cookie_region1}
                    </div>
                    <div className="_1h4pbgy7w8">
                      <div
                        data-orientation="vertical"
                        data-size="medium"
                        className="_1vqth4d0 _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9w8"
                      >
                        <Link
                          className="_1vqth4d2 _1h4pbgy9uw _1h4pbgy9wg _1h4pbgya0o _1h4pbgy9yw _1vqth4d1"
                          data-part="radio"
                          data-selected={
                            loc2Param == null ||
                            loc2Param == [] ||
                            loc2Param.length == 0 ||
                            loc2Param[0] == "all"
                              ? "true"
                              : "false"
                          }
                          data-gtm="search_filter"
                          data-loc="all"
                          href="#"
                          style={{ marginInlineStart: "8px" }}
                          onClick={(e) => {
                            e.preventDefault();
                            goLocPage(e.currentTarget);
                          }}
                        >
                          <input
                            type="radio"
                            data-part="radio-input"
                            aria-hidden="true"
                            tabIndex="-1"
                            className="_1vqth4d3"
                            value="7426"
                          />
                          <div
                            data-part="radio-control"
                            data-selected={
                              loc2Param == null ||
                              loc2Param == [] ||
                              loc2Param.length == 0 ||
                              loc2Param[0] == "all"
                                ? "true"
                                : "false"
                            }
                            className="_1vqth4d4"
                          ></div>
                          <span className="_1vqth4d5" data-part="radio-label">
                            <font style={{ verticalAlign: "inherit" }}>
                              전체
                            </font>
                          </span>
                        </Link>
                        {region2_list &&
                          region2_list.map((region, i) => {
                            let chk = false;

                            if (loc2Param == null || loc2Param == "")
                              chk = true;
                            else {
                              loc2Param.forEach((loc) => {
                                if (loc === region || loc === "all") {
                                  chk = true;
                                }
                              });
                            }

                            return (
                              <>
                                <Link
                                  key={i}
                                  className="locationlink _1vqth4d2 _1h4pbgy9uw _1h4pbgy9wg _1h4pbgya0o _1h4pbgy9yw _1vqth4d1"
                                  data-part="radio"
                                  data-selected={chk}
                                  data-gtm="search_filter"
                                  data-loc={region}
                                  href="#"
                                  style={{ marginInlineStart: "16px" }}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    goLocPage(e.currentTarget);
                                  }}
                                >
                                  <input
                                    type="radio"
                                    data-part="radio-input"
                                    aria-hidden="true"
                                    tabIndex="-1"
                                    className="_1vqth4d3"
                                    value="7438"
                                  />
                                  <div
                                    data-part="radio-control"
                                    data-selected={chk}
                                    className="_1vqth4d4"
                                  ></div>
                                  <span
                                    className="_1vqth4d5"
                                    data-part="radio-label"
                                  >
                                    <font style={{ verticalAlign: "inherit" }}>
                                      {region}
                                    </font>
                                  </span>
                                </Link>
                              </>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="_1h4pbgy7eo _1h4pbgy7jc _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy3rc">
                  <h3 className="_588sy4198 _588sy41y _588sy41a2">
                    <font style={{ verticalAlign: "inherit" }}>카테고리</font>
                  </h3>
                  <div className="_1h4pbgy7w8">
                    <div
                      data-orientation="vertical"
                      data-size="medium"
                      className="_1vqth4d0 _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9w8"
                    >
                      {/* <!-- forEACH 쓰는곳 --> */}
                      {category_list.map((item, i) => (
                        <Link
                          href="#"
                          data-category_key={item.categorykey}
                          key={i}
                          className="_1vqth4d2 _1h4pbgy9uw _1h4pbgy9wg _1h4pbgya0o _1h4pbgy9yw _1vqth4d1"
                          data-part="radio"
                          data-selected={
                            categoryParam == item.categorykey ? "true" : "false"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            goPage(e.currentTarget, `${item.categorykey}`);
                          }}
                        >
                          <input
                            type="radio"
                            data-part="radio-input"
                            aria-hidden="true"
                            tabIndex="-1"
                            className="_1vqth4d3"
                            value="1"
                          />
                          <div
                            data-part="radio-control"
                            data-selected={
                              categoryParam == item.categorykey
                                ? "true"
                                : "false"
                            }
                            className="_1vqth4d4"
                          ></div>
                          <span className="_1vqth4d5" data-part="radio-label">
                            <font style={{ verticalAlign: "inherit" }}>
                              {item.categoryname}
                            </font>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="_1h4pbgy7eo _1h4pbgy7jc _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy3rc">
                  <h3 className="_588sy4198 _588sy41y _588sy41a2">
                    <font style={{ verticalAlign: "inherit" }}>정렬</font>
                  </h3>
                  <div className="_1h4pbgy7w8">
                    <div
                      data-orientation="vertical"
                      data-size="medium"
                      className="_1vqth4d0 _1h4pbgy9ug _1h4pbgy9vs _1h4pbgy9w8"
                    >
                      <Link
                        href="#"
                        className="_1vqth4d2 _1h4pbgy9uw _1h4pbgy9wg _1h4pbgya0o _1h4pbgy9yw _1vqth4d1"
                        data-part="radio"
                        data-selected={sortParam == "recent" ? "true" : "false"}
                        onClick={(e) => {
                          e.preventDefault();
                          goSortPage(e.currentTarget, "recent");
                        }}
                      >
                        <input
                          type="radio"
                          data-part="radio-input"
                          aria-hidden="true"
                          tabIndex="-1"
                          className="_1vqth4d3"
                          value="recent"
                        />
                        <div
                          data-part="radio-control"
                          data-selected={
                            sortParam == "recent" ? "true" : "false"
                          }
                          className="_1vqth4d4"
                        ></div>
                        <span className="_1vqth4d5" data-part="radio-label">
                          <font style={{ verticalAlign: "inherit" }}>
                            최신순
                          </font>
                        </span>
                      </Link>
                      <Link
                        href="#"
                        className="_1vqth4d2 _1h4pbgy9uw _1h4pbgy9wg _1h4pbgya0o _1h4pbgy9yw _1vqth4d1"
                        data-part="radio"
                        data-selected={
                          !(sortParam == "recent") ? "true" : "false"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          goSortPage(e.currentTarget, "popular");
                        }}
                      >
                        <input
                          type="radio"
                          data-part="radio-input"
                          aria-hidden="true"
                          tabIndex="-1"
                          className="_1vqth4d3"
                          value="hottest"
                        />
                        <div
                          data-part="radio-control"
                          data-selected={
                            !(sortParam == "recent") ? "true" : "false"
                          }
                          className="_1vqth4d4"
                        ></div>
                        <span className="_1vqth4d5" data-part="radio-label">
                          <font style={{ verticalAlign: "inherit" }}>
                            인기순
                          </font>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="_1h4pbgy7eo _1h4pbgy7jc _1h4pbgy9ug _1h4pbgy9vs">
                  <h3 className="_588sy4198 _588sy41y _588sy41a2">
                    <font style={{ verticalAlign: "inherit" }}>가격</font>
                  </h3>
                  <div className="_1h4pbgy7w8">
                    <div className="_1h4pbgy9ug _1h4pbgy9vs _1h4pbgy90o">
                      <Link
                        href="#"
                        data-selected={
                          minPriceParam == 0 && maxPriceParam == 0
                            ? "true"
                            : "false"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          goPricePage(e.currentTarget, 0, 0);
                        }}
                        className={
                          minPriceParam == 0 && maxPriceParam == 0
                            ? "_1d991sp4 _1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1d991sp5"
                            : "_1d991sp4 _1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1d991sp6"
                        }
                      >
                        <font style={{ verticalAlign: "inherit" }}>나눔</font>
                      </Link>
                      <Link
                        href=""
                        data-selected={
                          minPriceParam == 0 && maxPriceParam == 10000
                            ? "true"
                            : "false"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          goPricePage(e.currentTarget, 0, 10000);
                        }}
                        className={
                          minPriceParam == 0 && maxPriceParam == 10000
                            ? "_1d991sp4 _1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1d991sp5"
                            : "_1d991sp4 _1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1d991sp6"
                        }
                      >
                        <font style={{ verticalAlign: "inherit" }}>
                          1만원 이하
                        </font>
                      </Link>
                      <Link
                        href="#"
                        data-selected={
                          minPriceParam == 0 && maxPriceParam == 50000
                            ? "true"
                            : "false"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          goPricePage(e.currentTarget, 0, 50000);
                        }}
                        className={
                          minPriceParam == 0 && maxPriceParam == 50000
                            ? "_1d991sp4 _1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1d991sp5"
                            : "_1d991sp4 _1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1d991sp6"
                        }
                      >
                        <font style={{ verticalAlign: "inherit" }}>
                          5만원 이하
                        </font>
                      </Link>
                      <Link
                        href=""
                        data-selected={
                          minPriceParam == 0 && maxPriceParam == 100000
                            ? "true"
                            : "false"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          goPricePage(e.currentTarget, 0, 100000);
                        }}
                        className={
                          minPriceParam == 0 && maxPriceParam == 100000
                            ? "_1d991sp4 _1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1d991sp5"
                            : "_1d991sp4 _1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1d991sp6"
                        }
                      >
                        <font style={{ verticalAlign: "inherit" }}>
                          10만원 이하
                        </font>
                      </Link>
                    </div>
                  </div>
                  <div className="_1h4pbgy9ug _1h4pbgy9wo _1h4pbgy9xc _1h4pbgy908 _1h4pbgy7wo _1h4pbgy7x5">
                    <input
                      id="price-from"
                      className="_1d991sp3 _1h4pbgy7n4 _1h4pbgy7rs _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy8jc _1h4pbgy94w _1h4pbgy65k _1h4pbgy1u0 _1h4pbgy76o _1h4pbgy7ao _1h4pbgy7bs _1h4pbgy7aw"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="최소가격"
                      defaultValue={minPriceParam}
                    />
                    <span className="_1h4pbgy780 _1h4pbgy7ao _1h4pbgy7c0">
                      <font style={{ verticalAlign: "inherit" }}>-</font>
                    </span>
                    <input
                      id="price-to"
                      className="_1d991sp3 _1h4pbgy7n4 _1h4pbgy7rs _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy8jc _1h4pbgy94w _1h4pbgy65k _1h4pbgy1u0 _1h4pbgy76o _1h4pbgy7ao _1h4pbgy7bs _1h4pbgy7aw"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="최대가격"
                      defaultValue={maxPriceParam}
                    />
                  </div>
                  <div className="_1h4pbgy7w0">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        goPricePageBtn();
                      }}
                      className="seed-text-button seed-semantic-typography-label3-regular"
                      data-scope="button"
                      data-part="root"
                      id="button::Ri9j8p:"
                      type="button"
                      data-size="small"
                      data-variant="secondary"
                      data-style="underlined"
                    >
                      <span>
                        <font style={{ verticalAlign: "inherit" }}>적용</font>
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            </aside>
            <div className="_1h4pbgy8jc _1h4pbgy9ug _1h4pbgy9vs">
              <div className="_1kbqy810 _1h4pbgy8jc _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy9x4 _1h4pbgy90g _1h4pbgya54 _1h4pbgy9zk _1h4pbgy7vc _1h4pbgy7x5 _1h4pbgy7vf">
                <div className="_1h4pbgy9ug _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy90g">
                  <ul className="_1h4pbgy9ug _1h4pbgy9x4 _1h4pbgy9wo _1h4pbgy90g">
                    <li className="_1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1h4pbgy194 _1h4pbgy1q7 _1h4pbgy68">
                      {sortParam == "recent" ? "최신순" : "인기순"}
                    </li>
                    {onsaleParam == "true" && (
                      <li className="_1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1h4pbgy194 _1h4pbgy1q7 _1h4pbgy68">
                        판매중인 상품
                        <span
                          data-deltype="onsale"
                          onClick={(e) => deleteSearch(e.currentTarget)}
                          className="_1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy9yw"
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              width: "14px",
                              height: "14px",
                            }}
                            data-seed-icon="icon_close_regular"
                            data-seed-icon-version="0.2.1"
                          >
                            <svg
                              id="icon_close_regular"
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
                                  d="M3.72633 3.72633C4.0281 3.42456 4.51736 3.42456 4.81913 3.72633L12 10.9072L19.1809 3.72633C19.4826 3.42456 19.9719 3.42456 20.2737 3.72633C20.5754 4.0281 20.5754 4.51736 20.2737 4.81913L13.0928 12L20.2737 19.1809C20.5754 19.4826 20.5754 19.9719 20.2737 20.2737C19.9719 20.5754 19.4826 20.5754 19.1809 20.2737L12 13.0928L4.81913 20.2737C4.51736 20.5754 4.0281 20.5754 3.72633 20.2737C3.42456 19.9719 3.42456 19.4826 3.72633 19.1809L10.9072 12L3.72633 4.81913C3.42456 4.51736 3.42456 4.0281 3.72633 3.72633Z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </li>
                    )}
                    {loc2Param &&
                      loc2Param.length > 0 &&
                      loc2Param.sort().map((loc, i) => (
                        <li
                          key={i}
                          className="_1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1h4pbgy194 _1h4pbgy1q7 _1h4pbgy68"
                        >
                          {loc == "all" ? `${cookie_region1} 전체` : loc}
                          {loc != "all" && (
                            <span
                              data-deltype="loc2"
                              data-loc2={loc}
                              onClick={(e) => deleteSearch(e.currentTarget)}
                              className="_1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy9yw"
                            >
                              <span
                                style={{
                                  display: "inline-flex",
                                  width: "14px",
                                  height: "14px",
                                }}
                                data-seed-icon="icon_close_regular"
                                data-seed-icon-version="0.2.1"
                              >
                                <svg
                                  id="icon_close_regular"
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
                                      d="M3.72633 3.72633C4.0281 3.42456 4.51736 3.42456 4.81913 3.72633L12 10.9072L19.1809 3.72633C19.4826 3.42456 19.9719 3.42456 20.2737 3.72633C20.5754 4.0281 20.5754 4.51736 20.2737 4.81913L13.0928 12L20.2737 19.1809C20.5754 19.4826 20.5754 19.9719 20.2737 20.2737C19.9719 20.5754 19.4826 20.5754 19.1809 20.2737L12 13.0928L4.81913 20.2737C4.51736 20.5754 4.0281 20.5754 3.72633 20.2737C3.42456 19.9719 3.42456 19.4826 3.72633 19.1809L10.9072 12L3.72633 4.81913C3.42456 4.51736 3.42456 4.0281 3.72633 3.72633Z"
                                      fill="currentColor"
                                    ></path>
                                  </g>
                                </svg>
                              </span>
                            </span>
                          )}
                        </li>
                      ))}
                    {categoryParam != null && (
                      <li className="_1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1h4pbgy194 _1h4pbgy1q7 _1h4pbgy68">
                        {category_list.map((category, i) =>
                          category.categorykey == categoryParam ? (
                            <font key={i} style={{ verticalAlign: "inherit" }}>
                              {category.categoryname}
                            </font>
                          ) : (
                            ""
                          )
                        )}
                        <span
                          data-deltype="category"
                          onClick={(e) => deleteSearch(e.currentTarget)}
                          className="_1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy9yw"
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              width: "14px",
                              height: "14px",
                            }}
                            data-seed-icon="icon_close_regular"
                            data-seed-icon-version="0.2.1"
                          >
                            <svg
                              id="icon_close_regular"
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
                                  d="M3.72633 3.72633C4.0281 3.42456 4.51736 3.42456 4.81913 3.72633L12 10.9072L19.1809 3.72633C19.4826 3.42456 19.9719 3.42456 20.2737 3.72633C20.5754 4.0281 20.5754 4.51736 20.2737 4.81913L13.0928 12L20.2737 19.1809C20.5754 19.4826 20.5754 19.9719 20.2737 20.2737C19.9719 20.5754 19.4826 20.5754 19.1809 20.2737L12 13.0928L4.81913 20.2737C4.51736 20.5754 4.0281 20.5754 3.72633 20.2737C3.42456 19.9719 3.42456 19.4826 3.72633 19.1809L10.9072 12L3.72633 4.81913C3.42456 4.51736 3.42456 4.0281 3.72633 3.72633Z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </li>
                    )}
                    {minPriceParam != null && maxPriceParam != null && (
                      <li className="_1h4pbgy7nc _1h4pbgy7s0 _1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy79s _1h4pbgy7ao _1h4pbgy7c0 _1h4pbgy900 _1h4pbgy980 _1h4pbgy194 _1h4pbgy1q7 _1h4pbgy68">
                        <font style={{ verticalAlign: "inherit" }}>
                          {minPriceParam == 0 && maxPriceParam == 0
                            ? "나눔"
                            : minPriceParam == 0 && maxPriceParam == 10000
                              ? "1만원 이하"
                              : minPriceParam == 0 && maxPriceParam == 50000
                                ? "5만원 이하"
                                : minPriceParam == 0 && maxPriceParam == 100000
                                  ? "10만원 이하"
                                  : minPriceParam == null ||
                                      minPriceParam !== 0 ||
                                      maxPriceParam == null
                                    ? `${minPriceParam} - ${maxPriceParam}`
                                    : ""}
                        </font>
                        <span
                          data-deltype="price"
                          onClick={(e) => deleteSearch(e.currentTarget)}
                          className="_1h4pbgy9uw _1h4pbgy9xc _1h4pbgy9wo _1h4pbgy9yw"
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              width: "14px",
                              height: "14px",
                            }}
                            data-seed-icon="icon_close_regular"
                            data-seed-icon-version="0.2.1"
                          >
                            <svg
                              id="icon_close_regular"
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
                                  d="M3.72633 3.72633C4.0281 3.42456 4.51736 3.42456 4.81913 3.72633L12 10.9072L19.1809 3.72633C19.4826 3.42456 19.9719 3.42456 20.2737 3.72633C20.5754 4.0281 20.5754 4.51736 20.2737 4.81913L13.0928 12L20.2737 19.1809C20.5754 19.4826 20.5754 19.9719 20.2737 20.2737C19.9719 20.5754 19.4826 20.5754 19.1809 20.2737L12 13.0928L4.81913 20.2737C4.51736 20.5754 4.0281 20.5754 3.72633 20.2737C3.42456 19.9719 3.42456 19.4826 3.72633 19.1809L10.9072 12L3.72633 4.81913C3.42456 4.51736 3.42456 4.0281 3.72633 3.72633Z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </span>
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {/* 게시글 진열 */}
              <div
                data-gtm="search_article"
                id="search_article"
                className="_13tpfox0 _1h4pbgy9vc _1h4pbgy8jc _13tpfox1"
                style={{ minWidth: "0", position: "relative" }}
              >
                {post_list ? (
                  <>
                    {post_list.map((post, i) => (
                      <Link
                        key={i}
                        data-gtm="search_article"
                        className="_1h4pbgy9ug"
                        href={`/post/detail?postkey=${post.postkey}`}
                        style={{ minWidth: "0" }}
                      >
                        <Card
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "0",
                            padding: "5px",
                            gap: "0.5rem",
                            backgroundColor: "white",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              minWidth: "0",
                              marginLeft: "5px",
                            }}
                          >
                            <Typography
                              component="span"
                              level="title-lg"
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "100%", // 제목이 있는 부모 요소의 너비에 맞춰서 제한
                                display: "flex", // Flexbox 레이아웃으로 변경
                                justifyContent: "space-between", // 제목과 아이콘 사이에 공간 생성
                                alignItems: "center", // 세로 중앙 정렬
                                minWidth: "0", // 텍스트가 줄어들지 않도록 설정
                                marginTop: "5px",
                              }}
                            >
                              <span
                                style={{
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                {post.title}
                              </span>
                            </Typography>
                            <Typography
                              level="body-sm"
                              sx={{ fontSize: "0.7rem" }}
                            >
                              {post.cvo.categoryname}
                            </Typography>
                            <Typography level="body-sm">
                              {post.hope_place != null &&
                                post.hope_place != "" &&
                                post.hope_lati != null &&
                                post.hope_long != null &&
                                loc1Param != null &&
                                cookie_latitude != null &&
                                cookie_latitude != "undefined" &&
                                (() => {
                                  const distance = calDistance(
                                    post.hope_lati,
                                    post.hope_long
                                  ); // 거리 계산
                                  return `${distance} ·`; // 계산된 거리를 렌더링
                                })()}
                              {post.townVO && ` ${post.townVO.region3} · `}
                              {post.remind_dtm
                                ? `끌올 ${timeDifference(post.remind_dtm)}`
                                : timeDifference(post.create_dtm)}
                            </Typography>
                          </div>
                          <AspectRatio
                            minHeight="200px"
                            maxHeight="200px"
                            minWidth="200px"
                            maxwidth="200px"
                            margin="0"
                            padding="0"
                          >
                            {post.pimg_list && post.pimg_list.length > 0 ? (
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
                                  onError={(e) => {
                                    // 부모 span 태그를 DOM에서 제거
                                    const parentSpan = e.target.parentNode;

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
                            {post.poststatus == 2 ? (
                              <span className="_1b153uwj _1h4pbgy7ag _1h4pbgy788 _1b153uwl">
                                예약중
                              </span>
                            ) : post.poststatus == 3 ? (
                              <span className="_1b153uwj _1h4pbgy7ag _1h4pbgy788 _1b153uwm">
                                거래완료
                              </span>
                            ) : (
                              ""
                            )}
                          </AspectRatio>
                          <CardContent
                            orientation="horizontal"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "5px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "lg",
                                fontWeight: "lg",
                                flexGrow: 1,
                                marginLeft: "5px",
                              }}
                            >
                              {post.price == 0
                                ? "나눔♥"
                                : new Intl.NumberFormat("ko-KR").format(
                                    post.price
                                  ) + "원"}
                            </Typography>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "0",
                              }}
                            >
                              <IconButton
                                variant="plain"
                                size="sm"
                                sx={{ padding: "4px" }}
                              >
                                <RemoveRedEyeOutlinedIcon
                                  style={{ fontSize: "14px" }}
                                />
                              </IconButton>
                              <span
                                style={{ fontSize: "12px", marginLeft: "0" }}
                              >
                                {post.viewqty}
                              </span>
                              <IconButton
                                variant="plain"
                                size="sm"
                                sx={{ padding: "4px" }}
                              >
                                <ChatBubbleOutlineOutlinedIcon
                                  style={{ fontSize: "14px" }}
                                />
                              </IconButton>
                              <span
                                style={{ fontSize: "12px", marginLeft: "0" }}
                              >
                                {post.chatroomqty}
                              </span>
                              <IconButton
                                variant="plain"
                                size="sm"
                                sx={{ padding: "4px" }}
                              >
                                <FavoriteBorderOutlinedIcon
                                  style={{ fontSize: "14px" }}
                                />
                              </IconButton>
                              <span
                                style={{ fontSize: "12px", marginLeft: "0" }}
                              >
                                {post.likedqty}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    <div></div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100vh",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          lineHeight: "1.2",
                          transform: "translateY(-200px)",
                        }}
                      >
                        게시글이 없습니다.
                      </div>
                    </div>
                    <div></div>
                  </>
                )}
              </div>
              <Button
                className="write-button"
                style={{
                  color: "white",
                  backgroundColor: "#ff6f0f",
                  zIndex: "1000",
                }}
                variant="contained"
                starticon={<AddIcon />}
                onClick={chkTown}
              >
                내 물건 팔기
              </Button>
              <div
                style={{ display: viewMore ? "block" : "none" }} // viewMore가 t
                data-gtm="search_show_more_articles"
                className="_1h4pbgy7y8"
              >
                <Button
                  variant="contained"
                  style={{ width: "100%" }}
                  className="seed-box-button"
                  data-size="medium"
                  data-variant="secondary"
                  onClick={showMorePost}
                >
                  더보기
                </Button>
              </div>
            </div>
          </section>
        </div>
      </article>
      {/* 내 물건 팔기 모달 */}
      {open && (
        <React.Fragment>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: "form",
              onSubmit: handleSubmit,
            }}
            scroll="paper"
          >
            <DialogTitle
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              내 물건 팔기
              {tempPost ? (
                <Button
                  variant="outlined"
                  type="button"
                  style={{
                    marginLeft: "auto",
                    backgroundColor: "#efefef",
                    color: "#a0a0a0",
                    border: 0,
                    cursor: "default",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    alert("임시저장 중인 문서가 이미 존재합니다.");
                  }}
                >
                  임시저장
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  type="submit"
                  onClick={(e) =>
                    (e.currentTarget.closest("form").dataset.mode = "save")
                  }
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  임시저장
                </Button>
              )}
            </DialogTitle>
            <DialogContent dividers="paper">
              <FormControl fullWidth margin="dense">
                <ImageList
                  cols={11}
                  gap={8}
                  id="dragImageList"
                  ref={containerRef}
                >
                  <ImageListItem
                    style={{
                      width: 100,
                      height: 100,
                      position: "relative",
                    }}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      name="file"
                      onChange={handleChange}
                      accept="image/*" // 이미지 파일만 허용
                      style={{ display: "none" }}
                      multiple
                    />
                    <AddPhotoAlternateIcon
                      color="primary"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        cursor: "pointer",
                      }}
                      onClick={uploadImg}
                    />
                    <Typography
                      variant="caption"
                      style={{
                        position: "absolute",
                        bottom: 5, // 아이콘 아래에 배치
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        color: "black",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        fontSize: "16px",
                      }}
                    >
                      {`${previewImages.length}/10`}
                    </Typography>
                  </ImageListItem>
                  {previewImages.map((img, i) => (
                    <ImageListItem
                      key={i}
                      style={{
                        width: 100,
                        height: 100,
                        border: "2px solid #ccc", // 이미지에 보더 추가
                        position: "relative",
                      }}
                      draggable="true"
                      className="draggable"
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(i)}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "rgba(255, 255, 255, 0.7)",
                          padding: 2,
                          zIndex: 10,
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <img
                        src={img.src}
                        alt={`Uploaded Preview ${i}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                      {i === 0 && (
                        <Typography
                          variant="caption"
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            color: "white",
                            padding: "2px 0",
                          }}
                        >
                          대표 사진
                        </Typography>
                      )}
                    </ImageListItem>
                  ))}
                </ImageList>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <TextField
                  required
                  margin="dense"
                  id="title"
                  name="title"
                  label="제목"
                  type="text"
                  fullWidth
                  size="small"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <TextField
                  required
                  margin="dense"
                  id="categorykey"
                  name="categorykey"
                  label="카테고리"
                  select
                  fullWidth
                  size="small"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {category_list.map((item, i) => (
                    <MenuItem key={i} value={item.categorykey}>
                      {item.categoryname}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
              <FormControl fullWidth margin="dense">
                <FormLabel
                  required
                  id="demo-simple-row-radio-buttons-group-label"
                >
                  거래 방식
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="method"
                  value={method}
                  onChange={(e) => {
                    setMethod(e.target.value);
                    setIsFree(e.target.value == 0 ? false : true);
                    setPrice(e.target.value == 0 ? "" : 0);
                  }}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="판매하기"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="나눔하기"
                  />
                </RadioGroup>
                <OutlinedInput
                  size="small"
                  id="price"
                  name="price"
                  placeholder="가격을 입력해주세요."
                  disabled={isFree}
                  value={isFree ? 0 : price}
                  onChange={(e) => setPrice(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">원</InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                />
                <FormControlLabel
                  id="canbargain"
                  name="canbargain"
                  style={{ display: isFree ? "none" : "block" }}
                  control={
                    <Checkbox
                      checked={canBargain === 1}
                      onChange={(e) => setCanBargain(e.target.checked ? 1 : 0)}
                    />
                  }
                  label="가격 제안 받기"
                />
              </FormControl>
              <FormControl fullWidth margin="dense">
                <TextField
                  required
                  id="content"
                  name="content"
                  label="자세한 설명"
                  multiline
                  rows={7}
                  placeholder={`OO동에 올릴 게시글 내용을 작성해 주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)\n\n신뢰할 수 있는 거래를 위해 자세히 적어주세요.`}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </FormControl>
              <FormControl
                fullWidth
                margin="dense"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Link
                  href="#"
                  component="button"
                  variant="body2"
                  onClick={() => {
                    setHope_place("");
                    setHope_lati("");
                    setHope_long("");
                  }}
                  style={{
                    marginLeft: "auto",
                  }}
                >
                  삭제
                </Link>
                <TextField
                  margin="dense"
                  id="hope_place"
                  name="hope_place"
                  label="거래 희망 장소"
                  type="text"
                  fullWidth
                  size="small"
                  value={hope_place}
                  onClick={() => {
                    getLocation();
                    setLocationOpen(true);
                  }}
                  InputProps={{
                    readOnly: true, // readonly 설정
                  }}
                />
              </FormControl>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "0.8rem", textAlign: "left" }}>
                *거래 희망 장소 미등록 시 현재 위치 기준으로 게시글이
                작성됩니다.
              </span>
              <div>
                <Button
                  type="submit"
                  onClick={(e) =>
                    (e.currentTarget.closest("form").dataset.mode = "write")
                  }
                  style={{ marginRight: "8px" }} // 오른쪽에 간격 추가
                >
                  작성완료
                </Button>
                <Button onClick={handleClose}>취소</Button>
              </div>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
      {/* 거래 희망 장소 모달 */}
      {locationOpen && (
        <React.Fragment>
          <Dialog
            open={locationOpen}
            onClose={locationClose}
            id="hopeDialog"
            PaperProps={{
              component: "form",
              onSubmit: locationHandleSubmit,
            }}
          >
            <DialogTitle
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              위치 추가
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={locationClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>
                이웃과 만나서 거래하고 싶은 장소를 선택해주세요.
              </Typography>
              <DialogContentText
                style={{ marginBottom: "20px" }}
                sx={{ fontSize: "0.875rem" }}
              >
                만나서 거래할 때는 누구나 찾기 쉬운 공공장소가 좋아요.
              </DialogContentText>
              <FormLabel
                required
                id="demo-simple-row-radio-buttons-group-label"
              >
                거래 희망 장소명
              </FormLabel>
              <TextField
                required
                margin="dense"
                id="tmpHope_place"
                name="tmpHope_place"
                placeholder="예) 강남역 1번 출구, 교보타워 앞"
                type="text"
                fullWidth
                size="small"
                value={tmpHope_place}
                onChange={(e) => setTmpHope_place(e.target.value)}
              />
              <div
                id="map"
                style={{
                  border: "0.5px solid black",
                  marginTop: "10px",
                  width: "100%",
                  height: "350px",
                }}
              ></div>
            </DialogContent>
            <DialogActions>
              <Button type="submit">선택 완료</Button>
              <Button onClick={locationClose}>취소</Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
      {/* 임시저장 확인 모달 */}
      {tempPostConfirmOpen && (
        <Dialog
          open={tempPostConfirmOpen}
          onClose={() => tempPostClose(null)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"작성중인 게시글이 있습니다."}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`'${tempPost ? tempPost.title : ""}' 글을 이어서 작성하시겠습니까?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => tempPostClose(1)}>이어서 쓰기</Button>
            <Button onClick={() => tempPostClose(0)}>새로 쓰기</Button>
          </DialogActions>
        </Dialog>
      )}
      {/* 임시저장 게시글 작성 모달 */}
      {isTemp && (
        <EditPostModal
          open={isTemp}
          isTemp={true}
          handleClose={handleClose}
          pvo={tempPost}
        />
      )}
    </>
  );
}
