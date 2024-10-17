import Link from 'next/link';
import React from 'react'

export default function LikePost(props) {
    const likelist = props.likelist;
    const getDelLike = props.getDelLike;
    return (
        likelist.map((lvo,index)=>{
        return(
        <li key={index} data-v-6aa963fd="">
            <div data-v-6aa963fd="" className="wish_item">
            <div data-v-6aa963fd="" className="wish_product">
                <div data-v-6aa963fd="" className="product_box">
                <div
                    data-v-16369cf2=""
                    data-v-6aa963fd=""
                    className="product"
                    style={{
                    backgroundColor: "rgb(235, 240, 245)",
                    }}
                >
                    <div
                    data-v-17ca498c=""
                    data-v-16369cf2=""
                    className="display_tag_item product_inner_tag tag--default"
                    >
                    <span
                        data-v-17ca498c=""
                        className="tag_text"
                    ></span>
                    </div>
                    <picture
                    data-v-82b93d2c=""
                    data-v-16369cf2=""
                    className="picture product_img"
                    >
                    <img
                        data-v-82b93d2c=""
                        alt="카테고리 이미지"
                        src={lvo.cvo.img_url}
                        loading="lazy"
                        className="image full_width"
                    />
                    </picture>
                </div>
                </div>
                <div data-v-6aa963fd="" className="product_detail">
                <div data-v-9ff60cb2="">
                    <div
                    data-v-0b6ddb6a=""
                    data-v-9ff60cb2=""
                    className="division_btn_box lg"
                    >
                        <p style={{fontSize:20, marginTop:20}}>{lvo.cvo.categoryname}</p>
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
                    onClick={()=>{getDelLike('category',lvo.autokey)}} 
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
