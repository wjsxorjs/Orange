"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [category_list, setCategory_list] = useState([]);

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

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <article className="_1h4pbgy7wg _1h4pbgy7wz">
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section style={{ borderBottom: "1px solid #ebebeb" }} className="">
            <div className="_588sy41z _588sy421 _588sy42q _588sy415q _588sy417e">
              <nav className="iq86zf0">
                <ol className="iq86zf1 _588sy42q _588sy415q">
                  <li>
                    <a href="/">
                      <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf3 iq86zf2 _588sy41n">
                        <font style={{ verticalAlign: "inherit" }}>홈</font>
                      </span>
                    </a>
                    <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8">
                      <font style={{ verticalAlign: "inherit" }}> &gt;</font>
                    </span>
                  </li>
                </ol>
              </nav>
              <div className="_588sy41z _588sy421 _588sy42q _588sy415q">
                <span className="_588sy4192 _588sy41x _588sy41b2 _588sy43">
                  <font style={{ verticalAlign: "inherit" }}>카테고리</font>
                </span>
              </div>
            </div>
            <div className="_1h4pbgy7dk _1h4pbgy7i8 _1h4pbgy7w0">
              <h1 className="_1h4pbgy78o _1h4pbgy796 _1h4pbgy79g _1h4pbgy7ag _1h4pbgy7c8">
                <font style={{ verticalAlign: "inherit" }}>카테고리</font>
              </h1>
            </div>
          </section>
          <div className="jeff5f0 _1h4pbgy9vc _1h4pbgy9xs _1h4pbgy91c _1h4pbgy92h _1h4pbgy8ze _1h4pbgy7kw _1h4pbgy7l7 _1h4pbgy7lo _1h4pbgy7xc _1h4pbgy7xu _1h4pbgy7yb _1h4pbgy7yt">
            {category_list.map((item, i) => (
              <Link
                key={i}
                data-gtm="categories"
                className="_1h4pbgy9ug _1h4pbgy9wg"
                href={`post?sort=recent&category=${item.categorykey}`}
              >
                <article className="_1xxhs21o _1xxhs21l _1h4pbgy9ug _1h4pbgya0o _1h4pbgy9vs _1h4pbgy90o _1h4pbgy9wo _1xxhs21r _1xxhs21k _1xxhs21l _1xxhs21m">
                  <div className="_1xxhs21s _1h4pbgy1ts _1h4pbgya2w _1h4pbgy98g _1h4pbgya0o _1h4pbgy9w0 _1h4pbgy8jc">
                    <span
                      className="_1xxhs21t _1h4pbgya3s _1h4pbgya0w _1h4pbgy98o _1h4pbgy9jc _1h4pbgy8jc _1h4pbgy8tk lazy-load-image-background opacity lazy-load-image-loaded"
                      style={{ color: "transparent", display: "inline-block" }}
                    >
                      <img
                        className="_1h4pbgy8jc _1h4pbgy8tk"
                        src={item.img_url}
                        alt="썸네일"
                      />
                    </span>
                  </div>
                  <div>
                    <div className="_1xxhs21u _1xxhs21n _1h4pbgy8g _1h4pbgy7ag _1h4pbgy9yg _1h4pbgya4g">
                      <font style={{ verticalAlign: "inherit" }}>
                        {item.categoryname}
                      </font>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
