'use client'

import MyPageSide from "@/component/user/layout/MyPageSide";
import React, { useEffect, useState } from "react";
import "/public/css/myPage.css";
import "/public/css/profile.css";
import Link from "next/link";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Page() {
  //1. xml~controller에서는 그냥 db가서 중복확인하고 오는 거
  //2. getData로 가져온 값이랑 같으면 버튼 비활성화

  const API_URL = "/user/api/getUser";
  const EDIT_IMG = "/user/editImage";
  const DEL_IMG = "/user/delImage";
  const EDIT_URL = "/user/editUser";
  const DEL_USER = "/user/delUser";
  const CHK_PW = "/user/chkPw";
  const userkey = Cookies.get("userkey");

  const router = useRouter();
  const [uvo, setUvo] = useState({});
  const [nickname, setNickname] = useState('');
  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwMatch, setPwMatch] = useState('');
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const [chkPw, setChkPw] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function getData() {
    axios.get(
      API_URL, {
        params: { userkey: userkey }
      }
    ).then((res) => {
      setUvo(res.data.uvo);
      
      const emailReady = res.data.uvo.email.split('@');
      setEmail1(emailReady[0]);
      setEmail2(emailReady[1]);

      setNickname(res.data.uvo.nickname);
      setEmail(`${emailReady[0]}@${emailReady[1]}`);
      setPhone(res.data.uvo.phone);
    });
  }

  useEffect(() => {
      getData();
  }, []);

  function changeImage(e) {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userkey', userkey);
  
      axios.post(EDIT_IMG, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          getData();
        });
    }
  }

  function delImage() {
    axios.get(
      DEL_IMG, {
        params: { userkey: userkey }
      }
    ).then(() => {
      getData();
    });
  }
  
  const emailChange = (e) => {
    const selectEmail = e.target.value;
    if (selectEmail !== '직접입력') {
      setEmail2(selectEmail);
    } else {
      setEmail2('');
    }
      updateEmail(email1, selectEmail);
  };

  const updateEmail = (email1Part, email2Part) => {
    const completeEmail = `${email1Part}@${email2Part}`;
    setEmail(completeEmail);
  };

  const email1Change = (e) => {
    const newEmail1 = e.target.value;
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (isKorean.test(newEmail1)) {
      alert('이메일에는 한글을 입력할 수 없습니다.');
      return;
    }
    setEmail1(newEmail1);
    updateEmail(newEmail1, email2);
  };
  
  const email2Change = (e) => {
    const newEmail2 = e.target.value;
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (isKorean.test(newEmail2)) {
      alert('이메일에는 한글을 입력할 수 없습니다.');
      return;
    }
    setEmail2(newEmail2);
    updateEmail(email1, newEmail2);
  };

  function emailCheck() {
    if (!email2.endsWith('.com') && !email2.endsWith('.net')) {
      alert('도메인은 .com 또는 .net으로 끝나야 합니다.');
      return false;
    } else
    return true;
  }

  const pwChange = (e) => {
    const newPw = e.target.value;
    setPw(newPw);
  };

  const confirmPwChange = (e) => {
      const newConfirmPw = e.target.value;
      setConfirmPw(newConfirmPw);
      setPwMatch(pw == newConfirmPw ? '[일치]' : newConfirmPw ? '[불일치]' : '');
  };

  const phoneChange = (e) => {
    // let input = e.target.value.replace(/[^0-9]/g, ''); //숫자만 남기기
    
    const check = /[0-9]/g;
    if(check.test(e.nativeEvent.data)||e.nativeEvent.inputType!="inputText"){
      let input = e.target.value;

      //'010-' 부분이 지워지지 않도록 강제
      if (input.startsWith('010')) {
          //010 이후의 번호만 처리
          if (input.length <= 7) {
              input = input.replace(/(\d{3})(\d{1,4})/, '010-$2'); //010-XXXX
          } else {
              input = input.replace(/(\d{3})(\d{4})(\d{1,4})/, '010-$2-$3'); //010-XXXX-XXXX
          }
      } else {
          input = '010'; //'010'까지만 유지하고 '-'는 추가하지 않음
      }
      setPhone(input.slice(0, 13)); //최대 13자까지만 설정
    }
  };

  // useEffect(() => {
  //   if (phone && phone.length === 10) {
  //     setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
  //   }
  //   if (phone && phone.length === 13) {
  //     setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
  //   }
  // }, [phone]);
  

  useEffect(() => {
    if (phone && phone.length === 10) {
      setPhone(phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phone && phone.length === 13) {
      setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phone]);
  

  function changeUser(key, value) {
    axios({
      url: EDIT_URL,
      method: "post",
      params: {
        userkey: uvo.userkey,
        key: key,
        value: value,
      },
    }).then((res) => {
      alert(res.data.msg);
      if (res.data.msg == "변경이 완료되었습니다.") {
        getData();
      }
    });
  }

  const modalOpen = () => {
    const confirmDelete = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmDelete) {
      setOpen(true);
    }
  };

  const modalClose = () => {
    setChkPw("");
    setErrorMsg("");
    setOpen(false);
  };

  function userDel() {
    axios.post( CHK_PW , { userkey: userkey, chkPw: chkPw })
      .then((res) => {
        if (res.data.msg) {
          axios.get(DEL_USER, { params: { userkey: userkey } })
            .then(() => {
              // 탈퇴 성공 시 쿠키 삭제
              // Cookies.remove('accessToken');
              // Cookies.remove('refreshToken');
              alert("회원 탈퇴가 완료되었습니다.");
              window.location.replace("/");
              // router.replace("/"); //뒤로가기 불가
            })
            .catch(() => {
              alert("회원 탈퇴에 실패했습니다.");
            });
        } else {
          setErrorMsg("비밀번호가 다릅니다.");
        }
      })
      .catch(() => {
        setErrorMsg("비밀번호 확인에 실패했습니다.");
      });
  };

  return (
    <>
      <article className="_1h4pbgy7wg _1h4pbgy7wz">
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
            {/* <jsp:include page="/WEB-INF/views/user/myPageSub/myPageSide.jsp"/> */}
            <MyPageSide />
            <div data-v-1ac01578="" data-v-0adb81cc="" className="content_area my-page-content" >
              <div data-v-1ac01578="" className="my_profile">
                {/* 타이틀 */}
                <div data-v-6b53f901="" data-v-1ac01578="" className="content_title1 border" >
                  <div data-v-6b53f901="" className="title">
                    <h3 className='title1' data-v-6b53f901="">계정 관리</h3>
                  </div>
                </div>
                {/* 프로필 이미지 */}
                <div data-v-5691f94f="" data-v-708ef468="" className="user_profile">
                  <div data-v-5691f94f="" className="profile_thumb">
                    <img data-v-5691f94f="" src={uvo.imgurl} alt="사용자 이미지" className="thumb_img"/>
                    
                  </div>
                  <div data-v-5691f94f="" className="profile_detail">
                    <strong data-v-5691f94f="" className="name">
                      {uvo.nickname}
                    </strong>
                    <div data-v-5691f94f="" className="profile_btn_box">
                      <Button variant="outlined" style={{ flex: '0 0 3%', marginRight: '10px' }} onClick={() => document.getElementById('imageUpload').click()}>               
                        이미지 변경
                      </Button>
                      <input type="file" style={{ display: 'none' }} id="imageUpload" onChange={changeImage}/>
                      <Button variant="outlined" style={{ flex: '0 0 3%' }} onClick={delImage}>삭제</Button>
                    </div>
                  </div>
                </div>
                {/* 프로필 정보 */}
                <div data-v-8b96a82e="" data-v-1ac01578="" className="profile_group">
                  <h4 data-v-8b96a82e="" className="group_title">
                    프로필 정보
                  </h4>
                  <div data-v-0c9f3f9e="" data-v-6d416020="" data-v-708ef468="" className="unit1" data-v-8b96a82e="">
                    <h5 data-v-0c9f3f9e="" className="title">
                      프로필 이름
                    </h5>
                    <div data-v-0c9f3f9e="" className="unit_content" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <TextField id="standard-basic1" value={nickname} variant="standard" placeholder={uvo.nickname ? `${uvo.nickname}` : ''} style={{ flex: '0 0 90%' }}
                              onChange={(e) => setNickname(e.target.value)} />
                      <div style={{ flex: '0 0 2%' }}></div>
                      <Button variant="outlined" style={{ flex: '0 0 3%' }} onClick={() => changeUser('nickname', nickname)} 
                              disabled={nickname == uvo.nickname || nickname == ''}>
                        변경
                      </Button>
                    </div>
                  </div>
                  <div data-v-0c9f3f9e="" data-v-6d416020="" data-v-708ef468="" className="unit1" data-v-8b96a82e="">
                    <h5 data-v-0c9f3f9e="" className="title">
                      이름
                    </h5>
                    <div data-v-0c9f3f9e="" className="unit_content" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <TextField
                        value={uvo.name === null || uvo.name === '' ? 'SNS 로그인 회원' : uvo.name}
                        variant="standard" placeholder={uvo.name ? `${uvo.name}` : ''} style={{ flex: '0 0 90%' }} disabled />
                      <div style={{ flex: '0 0 10%' }}></div>
                    </div>
                  </div>
                </div>
                {/* 계정 정보 */}
                <div data-v-8b96a82e="" data-v-1ac01578="" className="profile_group" >
                  <h4 data-v-8b96a82e="" className="group_title">
                    내 계정
                  </h4>
                  <div data-v-0c9f3f9e="" data-v-1ac01578="" className="unit1" data-v-8b96a82e="">
                    <h5 data-v-0c9f3f9e="" className="title">
                      이메일 주소
                    </h5>
                    <div data-v-0c9f3f9e="" className="unit_content" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <TextField id="email1" value={email1} variant="standard" placeholder={email1 == '' && uvo.email ? uvo.email.split('@')[0] : ''}
                              style={{ flex: '0 0 35%', marginRight: '8px', color: email1 == '' ? '#aaa' : 'inherit' }} onChange={email1Change}
                              InputProps={{ style: { color: email1 == '' ? '#aaa' : 'inherit' } }}/>
                      <label htmlFor="email2">@</label>
                      <TextField id="email2" variant="standard" value={email2} style={{ flex: '0 0 30%', marginLeft: '8px', marginRight: '8px' }} onChange={email2Change} />
                      <select id="sel_email" style={{ flex: '0 0 20%' }} onChange={emailChange} value={email2}>
                        <option>직접입력</option>
                        <option value="gmail.com">구글</option>
                        <option value="naver.com">네이버</option>
                        <option value="daum.net">다음</option>
                      </select>
                      <div style={{ flex: '0 0 2%' }}></div>
                      <Button variant="outlined" style={{ flex: '0 0 3%' }} onClick={() => { if (emailCheck()) { changeUser('email', email); } }}
                              disabled={email1 === '' || email2 === '' || email === uvo.email}>
                        변경
                      </Button>
                    </div>
                  </div>
                  <div data-v-0c9f3f9e="" data-v-1ac01578="" className="unit1" data-v-8b96a82e="">
                    <h5 data-v-0c9f3f9e="" className="title">
                      아이디
                    </h5>
                    <div data-v-0c9f3f9e="" className="unit_content" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <TextField id="standard-basic3" defaultValue={uvo.id} variant="standard" placeholder={uvo.id ? `${uvo.id}` : ''} style={{ flex: '0 0 90%' }} disabled/>
                      <div style={{ flex: '0 0 10%' }}></div>
                    </div>
                  </div>
                  <div data-v-0c9f3f9e="" data-v-1ac01578="" className="unit1" data-v-8b96a82e="">
                    <h5 data-v-0c9f3f9e="" className="title">
                      새 비밀번호
                    </h5>
                    <div data-v-0c9f3f9e="" className="unit_content" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <TextField value={pw} variant="standard" placeholder={uvo.pw === null ? 'SNS 로그인 회원' : ''}
                            style={{ flex: '0 0 90%' }} disabled={uvo.pw === null} type="password" onChange={pwChange}/>
                       <div style={{ flex: '0 0 10%' }}></div>
                    </div>
                    <h5 data-v-0c9f3f9e="" className="title" style={{marginTop: '10px'}}>
                      비밀번호 확인
                      <span style={{ color: pwMatch == '[일치]' ? 'blue' : pwMatch == '[불일치]' ? 'red' : 'inherit' }}>
                        &nbsp;&nbsp;&nbsp;{pwMatch}
                      </span>
                    </h5>
                    <div data-v-0c9f3f9e="" className="unit_content" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <TextField id="confirmPw" value={confirmPw} variant="standard" placeholder={uvo.pw === null ? 'SNS 로그인 회원' : ''}
                            style={{ flex: '0 0 90%' }} disabled={uvo.pw === null} type="password" onChange={confirmPwChange}/>
                      <div style={{ flex: '0 0 2%' }}></div>
                      <Button variant="outlined" style={{ flex: '0 0 3%' }} onClick={() => changeUser('pw', pw)} disabled={pwMatch !== '[일치]'}>변경</Button>
                    </div>
                  </div>
                </div>
                {/* 개인 정보 */}
                <div data-v-8b96a82e="" data-v-1ac01578="" className="profile_group">
                  <h4 data-v-8b96a82e="" className="group_title">
                    개인 정보
                  </h4>
                  <div data-v-0c9f3f9e="" data-v-1ac01578="" className="unit1" data-v-8b96a82e="">
                    <h5 data-v-0c9f3f9e="" className="title">
                      휴대폰 번호
                    </h5>
                    <div data-v-0c9f3f9e="" className="unit_content" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <TextField value={phone} onChange={phoneChange} variant="standard" placeholder={phone === null || phone === '' ? '휴대폰 번호를 입력해주세요' : ''}
                                style={{ flex: '0 0 90%' }} />
                      <div style={{ flex: '0 0 2%' }}></div>
                      <Button variant="outlined" style={{ flex: '0 0 3%' }} onClick={() => changeUser('phone', phone)} disabled={phone === uvo.phone || phone.length !== 13}>
                        변경
                      </Button>
                    </div>
                  </div>
                </div>
                <Button variant="outlined" onClick={modalOpen}
                  style={{ borderColor: '#BDBDBD', backgroundColor: '#BDBDBD', color: 'white', fontSize: '10px', padding: '5px 8px', 
                          marginTop: '30px', float: 'right'}}>
                  회원 탈퇴
                </Button>
                <Dialog open={open} onClose={modalClose}>
                  <DialogTitle>비밀번호 확인</DialogTitle>
                  <DialogContent>
                    <TextField autoFocus margin="dense" label="비밀번호" type="password" fullWidth variant="standard" value={chkPw}
                              onChange={(e) => setChkPw(e.target.value)} error={Boolean(errorMsg)} helperText={errorMsg}/>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={modalClose}>취소</Button>
                    <Button onClick={userDel}>확인</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
