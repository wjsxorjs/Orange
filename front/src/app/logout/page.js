"use client"
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function page() {
    const router = useRouter();

    const API_URL = "/api/user/api/member/logout";

    const logout = () =>{
        axios({
            url: API_URL,
            method: "POST",


        }).then((res)=>{
            console.log(res);
            if(res.data.msg== "로그아웃"){
                Cookies.remove("accessToken");
                //Cookies.remove("refreshToken");
                console.log(Cookies.get("accessToken")+"입니당");
            }
        })
    }

    useEffect(()=>{
        logout();
    })

  return (
    <div>

    </div>
  )
}
