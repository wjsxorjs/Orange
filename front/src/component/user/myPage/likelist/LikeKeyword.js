import Link from 'next/link';
import React from 'react'

export default function LikeKeyword(props) {
    const likelist = props.likelist;
    const getDelLike = props.getDelLike;
    return (
        likelist.map((lvo,index)=>{
        return(
        <li key={index} data-v-6aa963fd="">
            <div data-v-6aa963fd="" className="wish_item">
            <div data-v-6aa963fd="" className="wish_product">
                <div data-v-6aa963fd="" className="product_detail">
                <div data-v-9ff60cb2="">
                    <div
                    data-v-0b6ddb6a=""
                    data-v-9ff60cb2=""
                    style={{
                        width: 'auto',
                    }}
                    className="division_btn_box lg"
                    >
                        <p style={{fontSize:30, marginTop:20}}>{lvo.content}</p>
                    </div>
                </div>
                </div>
                <div
                data-v-9ff60cb2=""
                data-v-6aa963fd=""
                className="wish_buy"
                >
                <div data-v-9ff60cb2="">
                    <Link
                    data-v-9ff60cb2=""
                    href="#"
                    className="status_link"
                    style={{marginTop:20}}
                    onClick={()=>{getDelLike('keyword',lvo.keywordkey)}} 
                    >
                    {" "}
                    삭제{" "}
                    </Link>
                </div>
                </div>
            </div>
            </div>
        </li>
        )})
    )
}
