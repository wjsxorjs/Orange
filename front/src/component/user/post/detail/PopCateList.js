import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ImageNotSupportedRoundedIcon from "@mui/icons-material/ImageNotSupportedRounded";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Cookies from "js-cookie";
import Link from "next/link";

export default function PopCateList(props) {
  const cookie_latitude = Cookies.get("latitude");
  const cookie_longitude = Cookies.get("longitude");

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

    // 차이에 따라 적절한 문자열을 반환
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
  const post = props.pvo;
  return (
    <Link
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
              display: "block",
              minWidth: "0", // 텍스트가 줄어들지 않도록 설정
              marginTop: "5px",
            }}
          >
            {post.title}
          </Typography>
          <Typography level="body-sm">
            {post.hope_place != null &&
              post.hope_place != "" &&
              post.hope_lati != null &&
              post.hope_long != null &&
              (() => {
                const distance = calDistance(
                  post.hope_lati,
                  post.hope_long
                ); // 거리 계산
                return `${distance} ·`; // 계산된 거리를 렌더링
              })()}
            {post.townVO && ` ${post.townVO.region3} · `}
            {timeDifference(post.create_dtm)}
          </Typography>
        </div>
        <AspectRatio
          ratio={1/1}
          sx={{
            margin: "0",
            padding: "0",
          }}
        >
          {post.pimg_list && post.pimg_list.length > 0 ? (
            <span
              className=" lazy-load-image-background opacity lazy-load-image-loaded"
              style={{
                color: "transparent",
                display: "inlineBlock",
                aspectRatio: 1 / 1 ,
              }}
            >
              <img
                className="_1b153uwe _1h4pbgya3k"
                src={post.pimg_list[0].imgurl}
              />
            </span>
          ) : (
            <ImageNotSupportedRoundedIcon
              style={{
                width: "100%", // 아이콘의 너비를 100%로 설정
                height: "100%", // 아이콘의 높이를 100%로 설정
                zIndex: 1, // 필요하면 z-index로 가시성을 확보
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
            sx={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
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
                : new Intl.NumberFormat("ko-KR").format(post.price) + "원"}
            </Typography>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{ display: "flex", alignItems: "center", marginLeft: "0" }}
              >
                <RemoveRedEyeOutlinedIcon
                  style={{ fontSize: "14px", marginRight: "15px" }}
                />
                <span style={{ fontSize: "12px", marginLeft: "auto" }}>
                  {post.viewqty}
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", marginLeft: "0" }}
              >
                <ChatBubbleOutlineOutlinedIcon
                  style={{ fontSize: "14px", marginRight: "15px" }}
                />
                <span style={{ fontSize: "12px", marginLeft: "auto" }}>
                  {post.chatroomqty}
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", marginLeft: "0" }}
              >
                <FavoriteBorderOutlinedIcon
                  style={{ fontSize: "14px", marginRight: "15px" }}
                />
                <span style={{ fontSize: "12px", marginLeft: "auto" }}>
                  {post.likedqty}
                </span>
              </div>
            </div>
          </CardContent>
      </Card>
    </Link>
  );
}
