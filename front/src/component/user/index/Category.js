import Link from "next/link";
import React from "react";

export default function Category({ category_list }) {
  return (
    <>
      {category_list.map((item, i) => (
        <Link
          key={i}
          data-gtm="main_popular_category"
          href={`post?sort=recent&category=${item.categorykey}`}
        >
          <article className="_1xxhs21o _1xxhs21l _1h4pbgy9ug _1h4pbgya0o _1h4pbgy9vs _1h4pbgy90o _1h4pbgy9wo _1xxhs21q _1xxhs21j">
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
                <font>{item.categoryname}</font>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </>
  );
}
