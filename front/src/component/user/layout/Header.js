"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import HeaderItem from "./HeaderItem";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import React from "react";
import PlaceIcon from "@mui/icons-material/Place";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  TextField,
  Paper,
  InputBase,
  List,
  ListItemText,
  ListItem,
  Menu,
  MenuItem,
  Divider,
  Box,
} from "@mui/material";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { IconButton, ListDivider, Typography } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled, alpha } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Bell } from "lucide-react";
import NotificationUI from "./notification-ui";
import NotificationIcon from "./notification-icon";

// #region 민호-동네설정메뉴
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 200,
    color: "rgb(55, 65, 81)",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
    ...theme.applyStyles("dark", {
      color: theme.palette.grey[300],
    }),
  },
}));
// #endregion

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession(); //nextAtuh파일에서 nickname을 세션에 저장해서 받아옴
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userkey = Cookies.get("userkey");

  // #region 민호-현재 링크 표시
  useEffect(() => {
    const currentPath = pathname || "/";
    const activeLink = document.querySelector(`a[data-href="${currentPath}"]`);

    // 모든 링크에서 'active' 클래스를 제거한 후 현재 링크에 추가
    document
      .querySelectorAll("a[data-href]")
      .forEach((link) => link.classList.remove("_1nvz3xsp"));
    if (activeLink) {
      activeLink.classList.add("_1nvz3xsp");
    }
  }, [pathname]);
  // #endregion

  // 로그인한 사용자의 알림을 가져옴
  useEffect(() => {
    axios
      .get(`/api/alarm`, { params: { userkey } })
      .then((response) => {
        setNotifications(response.data); // 알림 데이터 설정
        const unread = response.data.filter((notif) => !notif.read).length; // 읽지 않은 알림 수 계산
        setUnreadCount(unread); // 알림 버튼에 보여줄 숫자 설정
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [userkey]);

  // #region 민호-인기검색어
  const [searchlog, setSearchlog] = useState([]);
  function getSearchlog() {
    axios({
      url: "/api/searchlog/getSearchlog",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setSearchlog(res.data.getSearchlog);
    });
  }

  function goSearchPost(link) {
    let tmpLocParam = "";
    if (region1 != "undefined" && region1 != null && region1 != "") {
      tmpLocParam = "&loc1=" + region1 + "&loc2=" + region2;
    }

    let url = "/post?sort=recent" + tmpLocParam + "&search=" + link;
    router.push(url);
    window.location.href = url;
  }
  // #endregion

  // #region 민호-동네설정 메뉴
  const [anchorEl, setAnchorEl] = useState(null);
  const locationMenuOpen = Boolean(anchorEl);
  const locationMenuClick = (event) => {
    if (Cookies.get("userkey") == null || Cookies.get("userkey") == undefined) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    if (region1 == null || region1 == "") {
      setLocationOpen(true);
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const locationMenuClose = () => {
    setAnchorEl(null);
  };
  // #endregion

  // #region 민호-동네설정 모달
  const [locationOpen, setLocationOpen] = useState(false);

  const locationClose = () => {
    setSearchLoc("");
    setPrevAddrKey("");
    setPrevTown({});
    setSearchHere([]);
    setLocationOpen(false);
  };
  // #endregion

  // #region 민호-주소검색
  const [searchLoc, setSearchLoc] = useState("");

  function searchLocation() {
    if (searchLoc == null || searchLoc.trim() == "") {
      alert("검색어를 입력하세요.");
      return;
    }
    axios({
      url: "/api/town/getNearTown",
      method: "get",
      params: {
        region1: "",
        region2: searchLoc,
      },
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setSearchHere(res.data.getNearTown);
    });
  }
  // #endregion

  // #region 민호-주소 초기화
  const [region1, setRegion1] = useState("");
  const [region2, setRegion2] = useState("");
  const [region3, setRegion3] = useState("");

  // 사용자 주소
  const [userAddress, setUserAddress] = useState([]);
  const [searchHere, setSearchHere] = useState([]);
  function getUserAddress() {
    // 로그인 되어있는 경우 사용자 주소 가져오기
    let userkey = decodeURIComponent(Cookies.get("userkey"));

    if (userkey != null && userkey != "" && userkey != "undefined") {
      axios({
        url: "/api/address/getAddress",
        method: "post",
        params: {
          userkey: userkey,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        setUserAddress(res.data.getAddress);
        if (res.data.getAddress && res.data.getAddress.length > 0) {
          let reg1 = res.data.getAddress[0].tvo.region1;
          let reg2 = res.data.getAddress[0].tvo.region2;
          let reg3 = res.data.getAddress[0].tvo.region3;
          Cookies.set("region1", encodeURIComponent(reg1));
          Cookies.set("region2", encodeURIComponent(reg2));
          Cookies.set("region3", encodeURIComponent(reg3));
          setRegion1(reg1);
          setRegion2(reg2);
          setRegion3(reg3);
        }
      });

      return;
    }

    let tmp = Cookies.get("region1");
    // 로그인 안돼있으면서 위치정보 안받아온 경우 받아오기
    if (
      (userkey == null || userkey == "" || userkey == "undefined") &&
      (tmp == null || tmp == "" || tmp == "undefined")
    ) {
      getLocation(); // API 로드 후에 함수 호출
    }
  }
  useEffect(() => {
    getUserAddress();
    getSearchlog();
  }, []);

  function getLocation(e) {
    if (typeof window !== "undefined") {
      const kakaoMapScript = document.createElement("script");
      kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services&autoload=false`;
      kakaoMapScript.async = false;
      document.head.appendChild(kakaoMapScript);
      console.log("getlocation 실행 1");
      kakaoMapScript.onload = () => {
        // Kakao Maps API가 완전히 초기화된 후에 실행
        window.kakao.maps.load(() => {
          if (!window.kakao.maps.services) {
            return;
          }
          console.log("kakaomap 로드  2");
          // Geolocation API 지원 여부 확인
          if ("geolocation" in navigator) {
            console.log("지올로케이션 있음");
            navigator.geolocation.getCurrentPosition((position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              console.log("현재위치 로드  3");

              // 주소-좌표 변환 객체를 생성합니다
              const geocoder = new window.kakao.maps.services.Geocoder();
              const coord = new kakao.maps.LatLng(latitude, longitude);

              let reg1 = "";
              let reg2 = "";
              let reg3 = "";

              const callback = (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  reg1 = result[0].address.region_1depth_name;
                  reg2 = result[0].address.region_2depth_name;
                  reg3 = result[0].address.region_3depth_name;
                  console.log("콜백 4");
                  console.log(reg2);

                  if (e != null) {
                    setSearchHere([[reg1, reg2, reg3]]);
                  } else {
                    setRegion1(reg1);
                    setRegion2(reg2);
                    setRegion3(reg3);
                    let tmp = Cookies.get("region1");
                    if (tmp == null || tmp == '' || tmp == 'undefined'){
                      Cookies.set("region1", encodeURIComponent(reg1));
                      Cookies.set("region2", encodeURIComponent(reg2));
                      Cookies.set("region3", encodeURIComponent(reg3));
                    }
                    Cookies.set("latitude", encodeURIComponent(latitude));
                    Cookies.set("longitude", encodeURIComponent(longitude));
                  }
                }
              };

              geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
            },
            (error) => {
              console.error("Geolocation API 오류:", error.message);
            });
          } else {
            alert("브라우저가 위치 서비스를 지원하지 않습니다.");
            return;
          }
        });
      };
    }
  }
  // #endregion

  // #region 민호-주소 변경
  const [prevAddrKey, setPrevAddrKey] = useState("");
  const [prevTown, setPrevTown] = useState({});
  function changeLoc(addrKey, reg1, reg2, reg3, isselected, nowReg) {
    if (isselected == 1) {
      setAnchorEl(null);
      return;
    }

    if (reg3 == undefined || reg3 == "") {
      reg1 = nowReg[0];
      reg2 = nowReg[1];
      reg3 = nowReg[2];
    }

    // addrKey가 0인 경우 동네 추가
    if (addrKey == "") {
      if (confirm("'" + reg3 + "'을 내 동네에 추가하시겠습니까?")) {
        axios({
          url: "/api/address/addAddress",
          method: "get",
          params: {
            userkey: decodeURIComponent(Cookies.get("userkey")),
            region1: reg1,
            region2: reg2,
            region3: reg3,
            nowLength: userAddress && userAddress.length > 0 ? 1 : 0,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.data.issuccess <= 0)
            alert("추가에 실패했습니다. 다시 시도해주세요.");
          else {
            getUserAddress();
            router.push("/");
            window.location.href = "/";
          }
        });
      }
    } else {
      if (prevAddrKey != "") {
        // 주소 변경
        let prev =
          prevTown.region1 + " " + prevTown.region2 + " " + prevTown.region3;
        let next = reg1 + " " + reg2 + " " + reg3;
        if (prev == next) return;
        if (confirm("'" + prev + "'을 '" + next + "'으로 변경하시겠습니까?")) {
          axios({
            url: "/api/address/modifyAddress",
            method: "get",
            params: {
              addresskey: prevAddrKey,
              region1: reg1,
              region2: reg2,
              region3: reg3,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res.data.issuccess <= 0)
              alert("변경에 실패했습니다. 다시 시도해주세요.");
            else {
              getUserAddress();
              router.push("/");
              window.location.href = "/";
            }
          });
        }
      } else {
        // 대표 동네 변경
        if (confirm("대표 동네를 '" + reg3 + "'으로 변경하시겠습니까?")) {
          axios({
            url: "/api/address/changeSelected",
            method: "get",
            params: {
              userkey: decodeURIComponent(Cookies.get("userkey")),
            },
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            if (res.data.issuccess <= 0)
              alert("변경에 실패했습니다. 다시 시도해주세요.");
            else {
              getUserAddress();
              router.push("/");
              window.location.href = "/";
            }
          });
        }
      }
    }
  }
  // #endregion

  // #region 민호-주소 삭제
  function deleteAddress(addrKey, reg3, isselected) {
    if (userAddress.length == 1) {
      if (
        confirm(
          "동네는 최소 1개 이상 선택해셔야 합니다.\r\n현재 설정된 동네를 변경하시겠습니까?"
        )
      ) {
        setPrevAddrKey(addrKey);
        setLocationOpen(true);
      }
      return;
    }

    if (confirm("'" + reg3 + "'을 삭제하시겠습니까?")) {
      axios({
        url: "/api/address/deleteAddress",
        method: "get",
        params: {
          addresskey: addrKey,
          isselected: isselected,
          userkey: decodeURIComponent(Cookies.get("userkey")),
        },
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.issuccess <= 0)
          alert("삭제에 실패했습니다. 다시 시도해주세요.");
        else {
          router.push("/");
          window.location.href = "/";
        }
      });
    }
  }
  // #endregion

  // #region 민호-게시글검색
  const [txtSearchPost, setTxtSearchPost] = useState("");

  function searchPost() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);

    params.delete("search");
    let newUrl = url.pathname + "?" + params.toString() + url.hash;
    newUrl += "&search=" + txtSearchPost;

    // 페이지 이동
    router.push(newUrl);
    window.location.href = newUrl;
  }

  function delTxtSearchPost() {
    setTxtSearchPost("");
  }
  // #endregion

  // #region 지은-로그인관련
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const router = useRouter();

  //회원가입 페이지 이동
  const handleSignUp = () => {
    setOpen(false);
    router.push("/SignUp");
  };

  //jwt 로그아웃 처리
  const logout_url = "/user/api/logout";

  function logout() {
    axios({
      url: logout_url,
      method: "POST",
    }).then((res) => {
      if (res.data.msg == "로그아웃") {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("userkey");
        Cookies.remove("next-auth.session-token");
        Cookies.remove("next-auth.csrf-token");

        signOut({ redirect: false });
        window.location.href = "/";
      }
    });
  }

  //jwt 로그인 처리
  const login_url = "/user/api/login";
  const [user, setUser] = useState({});

  //token 저장
  const [accessToken, setAccessToken] = useState(null);

  function jwtLogin() {
    axios({
      url: login_url,
      method: "post",
      params: user,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.data.cnt === 1) {
        window.location.href = "/";
      } else {
        alert(res.data.msg);
      }
    });
  }

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setAccessToken(token); // 토큰이 있으면 로그인 상태로 변경
    } else {
      setAccessToken(null); // 토큰이 없으면 로그아웃 상태로 설정
    }
  }, [session]); // session이 변경될 때만 실행

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
    //기존거 복사해서 값을 넣어주는애 name이 키로들어가고 value가 값으로 들어감
  };

  //kakaoLogin
  const kakao_login = async (e) => {
    e.preventDefault(); //다른 기본동작을 실행하지 않도록함
    //nextAuth 콜백 함수 인자로 카카오주고 카카오 프로바이더로 이동.
    signIn("kakao", {
      callbackUrl: "http://localhost:8080/user/api/kakao/login",
    });
  };
  const [chk, setChk] = useState(true);
  useEffect(() => {
    if (chk) {
      if (session && session.user) {
        goController(); // session.user.name이 준비된 후 호출
      }
    }
  }, [session]);

  const kakao_url = "/user/api/kakao/login";
  // kakao controller에 데이터 전달
  const goController = async () => {
    if (session && session.user) {
      axios({
        url: kakao_url,
        method: "post",
        params: {
          nickname: session.user.name,
          email: session.user.email,
          imgurl: session.user.image,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.data.cnt === 1) {
          alert("로그인 성공!");
          setAccessToken(Cookies.get("accessToken"));
          setChk(false);
          //window.location.href = "/";
        } else {
          alert("로그인에 실패하였습니다.");
        }
      });
    }
  };
  // #endregion
  const[notificationCount, setNotificationCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(()=>{
    axios.get(`/api/alarm`, {
      params: {
        userkey : userkey}}).then((res)=>{
          setNotificationCount(res.data.length);
        })
  },[]);

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="_1a7kymo0"></div>
      <div className="_1a7kymo3 _1h4pbgya14 _1h4pbgy98o _1h4pbgy8jc _1h4pbgy9ug _1h4pbgy9xc _1h4pbgy1u0 _1h4pbgya2w">
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <div className="_1a7kymo5 _1h4pbgy7e8 _1h4pbgy7ej _1h4pbgy7iw _1h4pbgy7j7 _1h4pbgy1u0 _1h4pbgya0o _1h4pbgy98o _1h4pbgy9ug _1h4pbgy9xs">
            <div className="_1h4pbgy9ug _1h4pbgy9wo _1h4pbgy8rk">
              <Link
                data-gtm="gnb_logo"
                href="/"
                className="_1h4pbgy9ug _1h4pbgy9wo _1h4pbgy9yw"
              >
                <img
                  src="/img/Orange_logo_final.png"
                  alt="당근마켓 로고"
                  style={{ width: "100px", height: "auto" }}
                />
              </Link>
            </div>
            <div>
              <nav className="_1h4pbgy9u0 _1h4pbgy9uj _1h4pbgy9wo">
                <HeaderItem />
                {accessToken == null ? (
                  <button
                    onClick={handleOpen}
                    id="show_login"
                    style={{ backgroundColor: "#ff6f0f24", color: "#ff6f0f" }}
                    className="seed-box-button"
                    data-scope="button"
                    data-part="root"
                    type="button"
                    data-gtm="gnb_app_download"
                    data-size="xsmall"
                    data-variant="primaryLow"
                  >
                    <span className="seed-semantic-typography-label4-bold">
                      <font>로그인</font>
                    </span>
                  </button>
                ) : (
                  <>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        marginRight: "10px",
                      }}
                    >
                      <NotificationIcon
                        notificationCount={notificationCount}
                        notifications={notifications}
                      />
                    </div>
                    <button
                      onClick={logout}
                      id="logout"
                      style={{ backgroundColor: "#ff6f0f24", color: "#ff6f0f" }}
                      className="seed-box-button"
                      data-scope="button"
                      data-part="root"
                      type="button"
                      data-gtm="gnb_app_download"
                      data-size="xsmall"
                      data-variant="primaryLow"
                    >
                      <span className="seed-semantic-typography-label4-bold">
                        <font>로그아웃</font>
                      </span>
                    </button>
                  </>
                )}
              </nav>
            </div>
          </div>
          <div
            className="_1a7kymoh _1h4pbgy89k _1h4pbgy8eg _1h4pbgya0o _1h4pbgy9ug _1h4pbgy8jc _1a7kymog"
            data-expanded="true"
          >
            {/* #region 동네설정 */}
            <div className="_1h4pbgy9u0 _1h4pbgy9ub _1h4pbgy8bk">
              <Button
                id="demo-customized-button"
                className="lrcwe20 _1h4pbgy8g _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy17c _1h4pbgy7ag _1h4pbgy9yw lrcwe22 _1h4pbgy7nk _1h4pbgy7s8 _1h4pbgy780"
                data-gtm="gnb_location"
                style={{
                  borderRadius: "21px",
                  backgroundColor: "var(--seed-scale-color-gray-100)",
                  border: "none",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
                aria-controls={
                  locationMenuOpen ? "demo-customized-menu" : undefined
                }
                aria-haspopup="true"
                aria-expanded={locationMenuOpen ? "true" : undefined}
                variant="outlined"
                disableElevation
                onClick={locationMenuClick}
                startIcon={<PlaceIcon />}
                endIcon={<KeyboardArrowDownIcon />}
              >
                {userAddress != null &&
                userAddress != "undefined" &&
                userAddress.length > 0
                  ? userAddress[0].tvo.region3
                  : region3 != ""
                    ? region3
                    : "동네설정"}
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={locationMenuOpen}
                onClose={locationMenuClose}
              >
                {userAddress != null &&
                  userAddress !== "undefined" &&
                  userAddress.length > 0 && [
                    ...userAddress.map((addr, i) => (
                      <MenuItem
                        data-modal="false"
                        key={addr.addresskey}
                        onClick={(e) =>
                          changeLoc(
                            addr.addresskey,
                            addr.tvo.region1,
                            addr.tvo.region2,
                            addr.tvo.region3,
                            addr.isselected,
                            ""
                          )
                        }
                        disableRipple
                      >
                        {/* 왼쪽에 [대표] 표시 */}
                        {addr.isselected == 1 ? (
                          <Typography
                            sx={{ marginRight: "8px", color: "blue" }}
                          >
                            [대표]
                          </Typography>
                        ) : (
                          <Typography
                            sx={{ marginRight: "8px", visibility: "hidden" }}
                          >
                            [대표]
                          </Typography>
                        )}
                        {addr.tvo.region3}

                        {/* 오른쪽에 [수정] 버튼 */}
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation(); // 부모 MenuItem의 onClick을 막음
                            setPrevAddrKey(addr.addresskey);
                            setPrevTown(addr.tvo);
                            setLocationOpen(true);
                          }}
                          sx={{ marginLeft: "auto" }} // 자동으로 오른쪽 정렬
                        >
                          <EditIcon />
                        </IconButton>
                        {/* 오른쪽에 [삭제] 버튼 */}
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation(); // 부모 MenuItem의 onClick을 막음
                            setPrevTown(addr.tvo);
                            deleteAddress(
                              addr.addresskey,
                              addr.tvo.region3,
                              addr.isselected
                            ); // 삭제 핸들러 호출
                          }}
                          sx={{ marginLeft: "auto" }} // 자동으로 오른쪽 정렬
                        >
                          <DeleteIcon />
                        </IconButton>
                      </MenuItem>
                    )),
                    userAddress.length === 1 && (
                      <MenuItem
                        key="add"
                        onClick={() => {
                          setLocationOpen(true);
                        }}
                        disableRipple
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Typography>+ 추가</Typography>
                        </Box>
                      </MenuItem>
                    ),
                    // <Divider key="divider" sx={{ my: 0.5 }} />,
                    // 추가 버튼 조건부 렌더링
                  ]}
                {/* <MenuItem onClick={() => setLocationOpen(true)} disableRipple>
                  내 동네 설정
                </MenuItem> */}
              </StyledMenu>
            </div>
            {/* #endregion 동네설정 끝 */}
            <div className="_1h4pbgy9w0 _1h4pbgy8jc _1h4pbgya2z">
              <form action={searchPost}>
                <div className="_1h4pbgya0o">
                  <input
                    className="_1wcdkwr0 _1wcdkwr1"
                    type="search"
                    aria-label="검색 입력"
                    placeholder="무엇을 찾고 계신가요?"
                    name="search"
                    value={txtSearchPost}
                    onChange={(e) => setTxtSearchPost(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // 기본 Enter 동작 방지
                        searchPost(); // 검색 함수 호출
                      }
                    }}
                  />
                  {txtSearchPost != "" && (
                    <button
                      className="_1wcdkwr3 _1h4pbgy7cg _1h4pbgy7h4 _1h4pbgy7ls _1h4pbgy7qg _1h4pbgya0w _1h4pbgy9dc _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy9xc _1h4pbgy9yw _1h4pbgy7s"
                      type="button"
                      aria-label="Reset search results"
                      onClick={delTxtSearchPost}
                    >
                      <span
                        class="_1wcdkwr4 _1h4pbgy7s"
                        data-seed-icon="icon_remove_circle_fill"
                        data-seed-icon-version="0.2.1"
                        style={{ display: "inline-flex" }}
                      >
                        <svg
                          id="icon_remove_circle_fill"
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
                              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM9.18446 8.26829C8.93134 8.01517 8.52096 8.01517 8.26784 8.26829C8.01472 8.52141 8.01472 8.93179 8.26784 9.18491L11.0832 12.0002L8.26784 14.8156C8.01472 15.0687 8.01472 15.4791 8.26784 15.7322C8.52096 15.9853 8.93134 15.9853 9.18446 15.7322L11.9998 12.9169L14.8151 15.7322C15.0682 15.9853 15.4786 15.9853 15.7317 15.7322C15.9849 15.4791 15.9849 15.0687 15.7317 14.8156L12.9164 12.0002L15.7317 9.18491C15.9849 8.93179 15.9849 8.52141 15.7317 8.26829C15.4786 8.01517 15.0682 8.01517 14.8151 8.26829L11.9998 11.0836L9.18446 8.26829Z"
                              fill="currentColor"
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </button>
                  )}
                  <button
                    type="submit"
                    aria-label="찾다"
                    className="_1wcdkwr5 _1h4pbgy7cg _1h4pbgy7h4 _1h4pbgy7ls _1h4pbgy7qg _1h4pbgya0w _1h4pbgy9dc _1h4pbgy9ps _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy9xc _1h4pbgy1qe _1h4pbgy94o _1h4pbgy9yw"
                    onClick={searchPost}
                  >
                    <span
                      style={{ display: "inline-flex" }}
                      className="_1h4pbgy8g _1h4pbgy8gg _1h4pbgy8qo"
                      data-seed-icon="icon_search_fill"
                      data-seed-icon-version="0.2.1"
                    >
                      <svg
                        id="icon_search_fill"
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
                            d="M10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19C12.4869 19 14.3145 18.3183 15.7618 17.176L20.2929 21.7071C20.6834 22.0976 21.3166 22.0976 21.7071 21.7071C22.0976 21.3166 22.0976 20.6834 21.7071 20.2929L17.176 15.7618C18.3183 14.3145 19 12.4869 19 10.5C19 5.80558 15.1944 2 10.5 2ZM4 10.5C4 6.91015 6.91015 4 10.5 4C14.0899 4 17 6.91015 17 10.5C17 14.0899 14.0899 17 10.5 17C6.91015 17 4 14.0899 4 10.5Z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
              <div className="_1a7kymoo _9rcp1w1 _1h4pbgya0o">
                <div className="_1n1zga84 _1n1zga80 _1h4pbgya0o">
                  <div className="_1n1zga85 _1h4pbgy9zk _1h4pbgy8jc">
                    <div className="_1a7kymoq _1h4pbgy7nk _1h4pbgy7o1 _1h4pbgy7oy _1h4pbgy7m3 _1h4pbgy7s8 _1h4pbgy7sp _1h4pbgy7tm _1h4pbgy7qr _1h4pbgy7e8 _1h4pbgy7e3 _1h4pbgy7iw _1h4pbgy7ir _1h4pbgy9uw _1h4pbgy9wo _1h4pbgya54 _1a7kymop _588sy4ph">
                      <div className="_1h4pbgy9u0 _1h4pbgy9ub _1h4pbgy76o _1h4pbgy8bk">
                        <font>인기 검색어</font>
                      </div>
                      <ul className="_1h4pbgy9ug _1h4pbgy9wo">
                        {searchlog &&
                          searchlog.map((log, i) => {
                            return (
                              <li
                                key={i}
                                className="_1a7kymor _1h4pbgy8b4 _1h4pbgy8bf"
                              >
                                <Link
                                  data-gtm="gnb_popular_keyword"
                                  className="_1a7kymos _1h4pbgy7nc _1h4pbgy7lv _1h4pbgy7s0 _1h4pbgy7qj _1h4pbgy8g _1h4pbgy7v _1h4pbgy9ug _1h4pbgy9wo _1h4pbgy76o _1h4pbgy8rk _1h4pbgy8qr _1h4pbgy9yw _1h4pbgy67s _1h4pbgy76b _1h4pbgy95k _1h4pbgy93v"
                                  href="#"
                                  onClick={() => goSearchPost(log)}
                                >
                                  <font>{log}</font>
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                  <div className="_1n1zga86 _1h4pbgya0w _1h4pbgy98o _1h4pbgy8tk _1h4pbgy8gg _1h4pbgy9u0 _1h4pbgy9ub _1n1zga87 _1n1zga89"></div>
                  <div className="_1n1zga86 _1h4pbgya0w _1h4pbgy98o _1h4pbgy8tk _1h4pbgy8gg _1h4pbgy9u0 _1h4pbgy9ub _1n1zga88"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 로그인 모달 */}
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());

              // 여기에 로그인 처리를 위한 로직을 추가
              // 예: axios를 사용한 로그인 요청 보내기

              handleClose();
            },
            style: {
              maxWidth: "500px", // 모달 창의 최대 너비를 설정
              width: "90%", // 뷰포트의 90% 너비를 차지하도록 설정
              margin: "0 auto", // 가운데 정렬
            },
          }}
        >
          <DialogTitle
            style={{
              textAlign: "center",
              padding: "16px 24px",
              position: "relative",
            }}
          >
            {/* X 버튼 추가 */}
            <Button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "7px",
                right: "7px",
                minWidth: "25px",
                minHeight: "25px",
                borderRadius: "50%",
                backgroundColor: "#FF6F0F",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold",
                lineHeight: "16px",
                padding: "0",
              }}
            >
              &times;
            </Button>

            <img
              src="/img/Orange_img.png"
              alt="당근마켓 로고 로그인"
              style={{ marginTop: "20px", width: "70px" }}
            />

            <div
              style={{ fontWeight: "bold", fontSize: "25px", color: "#FF6F0F" }}
            >
              로그인
            </div>
          </DialogTitle>
          <DialogContent style={{ paddingBottom: "0px" }}>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                kakao_login(e); // 카카오 로그인 함수 호출
              }}
              style={{
                backgroundColor: "#E0E0E1",
                color: "#3C1E1E",
                width: "100%",
                padding: "10px 0",
                marginBottom: "12px",
              }}
            >
              <img
                src="/img/kakao.png"
                alt="카카오톡 로그인"
                style={{ marginRight: "8px", height: "24px" }}
              />
              카카오톡으로 로그인
            </Button>
            <div style={{ textAlign: "center", margin: "12px 0" }}>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #ccc",
                  margin: "0",
                }}
              />
              <span
                style={{
                  background: "#fff",
                  padding: "0 10px",
                  position: "relative",
                  top: "-0.6em",
                  color: "#999",
                  fontSize: "12px",
                }}
              >
                or
              </span>
            </div>
            {/* 아이디 입력 필드 */}
            <div style={{ marginBottom: "12px" }}>
              <input
                type="text"
                id="id"
                name="id"
                placeholder="아이디"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  outline: "none",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    jwtLogin();
                  }
                }}
                onChange={handleChange}
                onFocus={(e) => (e.target.style.border = "1px solid #FF6F0F")}
                onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              />
            </div>
            {/* 비밀번호 입력 필드 */}
            <div style={{ marginBottom: "12px" }}>
              <input
                type="password"
                id="pw"
                name="pw"
                placeholder="비밀번호"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxSizing: "border-box",
                  fontSize: "14px",
                  outline: "none",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    jwtLogin();
                  }
                }}
                onChange={handleChange}
                onFocus={(e) => (e.target.style.border = "1px solid #FF6F0F")}
                onBlur={(e) => (e.target.style.border = "1px solid #ccc")}
              />
            </div>
          </DialogContent>
          <DialogActions
            style={{ justifyContent: "center", paddingTop: "12px" }}
          >
            <Button
              type="button"
              onClick={jwtLogin}
              style={{
                backgroundColor: "#FF6F0F",
                color: "#fff",
                width: "93%",
                padding: "10px 0",
              }}
            >
              로그인
            </Button>
          </DialogActions>
          <div style={{ textAlign: "center", paddingBottom: "12px" }}>
            <p style={{ fontSize: "14px", color: "#999" }}>
              가입된 계정이 없으신가요?
              <Link
                href="/SignUp"
                onClick={handleSignUp}
                style={{
                  color: "#FF6F0F",
                  textDecoration: "none",
                  marginLeft: "5px",
                }}
              >
                회원가입
              </Link>
            </p>
          </div>
        </Dialog>
      </React.Fragment>

      {/* 위치설정 */}
      <React.Fragment>
        <Dialog
          open={locationOpen}
          onClose={locationClose}
          PaperProps={
            {
              //component: "form",
              //onSubmit: locationHandleSubmit,
            }
          }
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            동네 설정
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
            <FormControl fullWidth margin="dense">
              <Paper
                component="form"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="동명(읍, 면)으로 검색 (ex. 서초동)"
                  onChange={(e) => setSearchLoc(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // 기본 Enter 동작 방지
                      searchLocation(); // 검색 함수 호출
                    }
                  }}
                />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={searchLocation}
                >
                  <SearchIcon />
                </IconButton>
              </Paper>
            </FormControl>
            <FormControl fullWidth margin="dense">
              <Button
                onClick={(e) => getLocation(e)}
                variant="outlined"
                startIcon={<MyLocationIcon />}
              >
                현재위치로 찾기
              </Button>
            </FormControl>
            <FormControl fullWidth margin="dense">
              동네
              <List
                sx={{
                  overflow: "auto",
                  maxHeight: 300,
                }}
              >
                {searchHere && searchHere.length > 0 ? (
                  <div>
                    {searchHere.map((loc, i) => {
                      return (
                        <div key={i}>
                          <ListItem
                            button
                            onClick={(e) =>
                              changeLoc(
                                prevAddrKey,
                                loc.region1,
                                loc.region2,
                                loc.region3,
                                0,
                                loc
                              )
                            }
                          >
                            <ListItemText
                              primary={
                                loc.region1
                                  ? loc.region1 +
                                    " " +
                                    loc.region2 +
                                    " " +
                                    loc.region3
                                  : loc.join(" ")
                              }
                            />
                          </ListItem>
                          <ListDivider inset="gutter" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "150px", // 원하는 높이로 조절
                      width: "100%",
                      padding: "20px", // 내부 여백 추가
                      boxSizing: "border-box", // 패딩 포함 크기 조절
                    }}
                  >
                    <span>검색 결과 없음</span>
                  </div>
                )}
              </List>
            </FormControl>
          </DialogContent>
          <DialogActions>
            {/* <Button type="submit">선택 완료</Button> */}
            <Button onClick={locationClose}>취소</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}
