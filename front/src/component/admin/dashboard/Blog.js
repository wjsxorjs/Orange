import Link from "next/link";
import {
  CardContent,
  Typography,
  Grid,
  Rating,
  Tooltip,
  Fab,
  Avatar,
  IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "../shared/BlankCard";
import { useEffect, useState } from "react";
import axios from "axios";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PostDetail from "../post/detail/PostDetail";

const ecoCard = [
  {
    title: "Boat Headphone",
    subheader: "September 14, 2023",
    photo: "/images/products/s4.jpg",
    salesPrice: 375,
    price: 285,
    rating: 4,
  },
  {
    title: "MacBook Air Pro",
    subheader: "September 14, 2023",
    photo: "/images/products/s5.jpg",
    salesPrice: 650,
    price: 900,
    rating: 5,
  },
  {
    title: "Red Valvet Dress",
    subheader: "September 14, 2023",
    photo: "/images/products/s7.jpg",
    salesPrice: 150,
    price: 200,
    rating: 3,
  },
  {
    title: "Cute Soft Teddybear",
    subheader: "September 14, 2023",
    photo: "/images/products/s11.jpg",
    salesPrice: 285,
    price: 345,
    rating: 2,
  },
];

const Blog = () => {
  const [top4, setTop4] = useState([]);

  useEffect(() => {
    axios({
      url: "/api/ad/getTop4",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setTop4(res.data.res_getTop4);
    });
  }, []);

  const [openPD, setOpenPD] = useState(false);
  const [pdkey, setPdkey] = useState("0");

  function openPostDetail(postkey) {
    setPdkey(postkey);
    setOpenPD(true);
  }
  function closePostDetail() {
    setOpenPD(false);
    setPdkey("0");
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">인기 게시글</Typography>
      </Grid>
      {top4 && top4.length > 0 && top4.map((post, index) => (
        <Grid item xs={12} md={3} lg={3} key={index}>
          <BlankCard>
            <Typography component={Link} href="#" onClick={() => openPostDetail(post.postkey)}>
              {post && post.pimg_list && post.pimg_list.length > 0 && (
              <Avatar
                src={post.pimg_list[0].imgurl}
                variant="square"
                sx={{
                  height: 250,
                  width: "100%",
                }}
              />
              )}
            </Typography>
            <Tooltip title="상세보기">
              <Fab
                size="small"
                color="primary"
                sx={{ bottom: "75px", right: "15px", position: "absolute" }}
              >
                <IconBasket size="16" />
              </Fab>
            </Tooltip>
            <CardContent sx={{ p: 3, pt: 2 }}>
              <Typography variant="h6">{post.title}</Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                mt={1}
              >
                <Stack direction="row" alignItems="center">
                  <Typography variant="h6">
                    {post.price == 0
                      ? "나눔♥"
                      : new Intl.NumberFormat("ko-KR").format(post.price) +
                        "원"}
                  </Typography>
                </Stack>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "0",
                  }}
                >
                  <IconButton variant="plain" size="sm" sx={{ padding: "4px" }}>
                    <RemoveRedEyeOutlinedIcon style={{ fontSize: "14px" }} />
                  </IconButton>

                  <span style={{ fontSize: "12px", marginLeft: "0" }}>
                    {post.viewqty}
                  </span>
                  <IconButton variant="plain" size="sm" sx={{ padding: "4px" }}>
                    <ChatBubbleOutlineOutlinedIcon
                      style={{ fontSize: "14px" }}
                    />
                  </IconButton>
                  <span style={{ fontSize: "12px", marginLeft: "0" }}>
                    {post.chatroomqty}
                  </span>
                  <IconButton variant="plain" size="sm" sx={{ padding: "4px" }}>
                    <FavoriteBorderOutlinedIcon style={{ fontSize: "14px" }} />
                  </IconButton>
                  <span style={{ fontSize: "12px", marginLeft: "0" }}>
                    {post.likedqty}
                  </span>
                </div>
              </Stack>
            </CardContent>
          </BlankCard>
        </Grid>
      ))}
      {openPD && (
        <PostDetail
          openPD={openPD}
          closePostDetail={closePostDetail}
          postkey={pdkey}
        />
      )}
    </Grid>
  );
};

export default Blog;
