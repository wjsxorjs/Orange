import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, IconButton, ImageList, ImageListItem, InputAdornment, MenuItem, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from "react";

export default function EditPostModal(props) {
    

  const cookie_latitude = Cookies.get("latitude");
  const cookie_longitude = Cookies.get("longitude");
  const [cookie_region1, setCookie_region1] = useState("");
  const [cookie_region2, setCookie_region2] = useState("");
  const [cookie_region3, setCookie_region3] = useState("");

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
          let mapContainer = document.getElementById("mapEdit"); // 지도를 표시할 div
          let mapOption = {
            center: locPosition, // 지도의 중심좌표
            level: 3, // 지도의 확대 레벨
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

    const isTemp = props.isTemp;

    const open = props.open;
    const handleClose = props.handleClose;
    const fileInputRef = useRef(null);
    const [previewImages, setPreviewImages] = useState([]);
    
    const [category_list, setCategory_list] = useState([]);
    
    const [pvo, setPvo] = useState({});
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [method, setMethod] = useState();
    const [isFree, setIsFree] = useState();
    const [price, setPrice] = useState();
    const [canBargain, setCanBargain] = useState();
    const [content, setContent] = useState();
    const [hope_place, setHope_place] = useState("");
    const [hope_lati, setHope_lati] = useState("");
    const [hope_long, setHope_long] = useState("");
    const [region1, setRegion1] = useState("");
    const [region2, setRegion2] = useState("");
    const [region3, setRegion3] = useState("");
    const [savePostKey, setSavePostKey] = useState();


    async function getBlob(imgurl){
      var imgBlob = null;
      let blob = await fetch(imgurl)
                      .then(r => r.blob()
                      .then((thisBlob)=>{
                        imgBlob = thisBlob;
                      }));
      return imgBlob;
    }

    function getPrevImages(index, length, previousImages, previewImages){
      if(index>=length){
        return;
      }
      const formData = new FormData();
      setPreviewImages([]);
      // 이미지 파일 FormData에 추가
      const imgurl = previewImages[index].imgurl;
      const imgurlList = imgurl.split("/");
      const fileName = imgurlList[imgurlList.length-1];
      var blob = getBlob(imgurl);
      blob.then((imageBlob)=>{
        const file = new File([imageBlob],fileName, {
          type: imageBlob.type,
        });
        const imageFile = {
          name: fileName,
          imgurl: imgurl,
          file: file
        };
        previousImages = [...previousImages,imageFile];
        getPrevImages(index+1, length, previousImages, previewImages);
      }).finally(()=>{
        setPreviewImages(previousImages);
      });
      
    }


    function hidePost(){
      axios.get("/api/adpost/hidePost", {
        params: {
          postkey: pvo.postkey,
        }
      }).then((res) => {
        if(res.data.result>0){
          alert("해당 게시글의 숨김 처리가 완료되었습니다.");
          window.location.href="/myPage/celllist";
        }
      });
    }

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
    
    // 파일 업로드 버튼 클릭 시 파일 입력 요소 클릭 이벤트 발생
    const uploadImg = (e) => {
        fileInputRef.current.click();
    };
    
    // 파일 입력 요소의 값이 변경되면 호출되는 함수
    const handleChange = (e) => {
        // 선택한 파일들을 배열로 가져옴
        let files = Array.from(e.target.files);
        
        if (previewImages.length + files.length > 10) {
            alert("10개를 초과할 수 없습니다.");
            return; // 10개를 초과할 경우 추가하지 않고 함수 종료
        }
        
        const newPreviewImages = [];
     previewImages   
        // 파일들을 미리보기 이미지로 변환하여 저장
        files.forEach((file, index) => {
            let fileReader = new FileReader();
            fileReader.onload = function () {
                newPreviewImages.push({ id: index, imgurl: fileReader.result, file });
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
    
    // 내 물건 팔기(작성)
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        
        // 유저 토큰 확인
        let tmpUserKey = Cookies.get('userkey');
        if (tmpUserKey == null || tmpUserKey == ''){
            alert("로그인 후 이용해주세요.");
            return;
        }
        formData.append("userkey", tmpUserKey);
        
        // 이미지 파일 FormData에 추가
        previewImages.forEach((image, index) => {
            if(image.file != undefined){
                const fileName = image.file.name;
                formData.append("post_img", image.file, `${tmpUserKey}-${fileName}`);
            } else {
                const imgurlList = image.imgurl.split("/");
                const fileName = imgurlList[imgurlList.length-1];
                formData.append("post_img", `${tmpUserKey}-${fileName}`);
            }
        });
        
        // 1: 수정
        const mode = event.currentTarget.dataset.mode;
        // formData.append("poststatus", pvo.poststatus);
        formData.append("poststatus", mode === "save" ? 0: mode === "write" ? 1 : pvo.poststatus);
        
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
        formData.append("postkey", pvo.postkey);
        
        formData.set("canBargain", canBargain);
        formData.append("isPostPage", 1);

        
        axios
        .post(
            "/api/adpost/edit",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        .then((response) => {
            setSavePostKey(response.data.savePostKey);
            switch(mode){
              case "write":
                alert("게시글이 작성되었습니다.");
                window.location.reload();
                break;
              case "save":
                alert("게시글이 임시저장되었습니다.");
                break;
              case "edit":
                alert("게시글이 수정되었습니다.");
                window.location.href=`/post/detail?postkey=${pvo.postkey}`;
                break;
            }
        })
        .catch((error) => {
            console.error("게시글 작성 오류", error);
        });
    };


    useEffect(() => {
        getCategory();
        var pvo = props.pvo;
        setPvo(props.pvo);
        setTitle(pvo.title);
        setCategory(pvo.cvo?pvo.cvo.categorykey:1);
        setMethod(pvo.method);
        setIsFree(pvo.method=="1");
        setPrice(pvo.price);
        setCanBargain(pvo.canbargain);
        setContent(pvo.content);
        getPrevImages(0,
                      pvo.pimg_list?pvo.pimg_list.length:0,
                      [],
                      pvo.pimg_list?pvo.pimg_list:[]);
        setCookie_region1(decodeURIComponent(Cookies.get("region1")));
        setCookie_region2(decodeURIComponent(Cookies.get("region2")));
        setCookie_region3(decodeURIComponent(Cookies.get("region3")));
        setHope_place(pvo.hope_place);
        setHope_lati(pvo.hope_lati);
        setHope_long(pvo.hope_long);
        
    },[open]);


    
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


    return (
    <Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            내 물건 팔기
            {
              isTemp
              ?
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
            :
              <Button
              variant="outlined"
              type="button"
              onClick={hidePost}
              style={{
                marginLeft: "auto",
                border: 'none',
              }}
            >
              게시글 숨김
            </Button>
            }
          </DialogTitle>
          <DialogContent>
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
                      src={img.imgurl}
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
                autoFocus
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
                autoFocus
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
                {category_list.map((item) => (
                  <MenuItem key={item.categorykey} value={item.categorykey}>
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
                type='number'
                placeholder="가격을 입력해주세요."
                disabled={isFree}
                value={isFree ? 0 : price}
                onChange={(e) => {
                  const check = /[0-9]/g;
                  if(check.test(e.nativeEvent.data)||e.nativeEvent.inputType!="insertText"){
                    setPrice(e.target.value);
                  }

                }}
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
            {/* 거래 희망 장소 모달 */}
            <Fragment>
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
                  <FormLabel required id="demo-simple-row-radio-buttons-group-label">
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
                    id="mapEdit"
                    style={{
                      border: "0.5px solid black",
                      marginTop: "10px",
                      width: "100%",
                      height: "350px",
                    }}
                  ></div>
                </DialogContent>
                <DialogActions>
                  <Button type="button" onClick={locationHandleSubmit}>선택 완료</Button>
                  <Button onClick={locationClose}>취소</Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          </DialogContent>
          <DialogActions>
              {isTemp
                ?
                <Button
                  type="submit"
                  onClick={(e) =>
                    (e.currentTarget.closest("form").dataset.mode = "write")
                  }
                  style={{ marginRight: "8px" }} // 오른쪽에 간격 추가
                >
                  작성완료
                </Button>
                :
                <Button
                  type="submit"
                  onClick={(e) =>
                    (e.currentTarget.closest("form").dataset.mode = "edit")
                  }
                >
                  수정
                </Button>
              }
            <Button onClick={handleClose}>취소</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
}
