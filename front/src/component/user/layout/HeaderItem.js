import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HeaderItem() {
  const userkey = Cookies.get("userkey");
  const region1 = decodeURIComponent(Cookies.get("region1"));
  const region2 = decodeURIComponent(Cookies.get("region2"));
  let tmpLocParam = "";
  if (region1 != "undefined" && region1 != null && region1 != "") {
    tmpLocParam = "&loc1=" + region1 + "&loc2=" + region2;
  }
  const link_item = [
    {
      title: "중고거래",
      path: "/post?sort=recent" + tmpLocParam,
      data_href: "/post",
    },
    { title: "카테고리", path: "/category", data_href: "/category" },
    { title: "채팅하기", path: "/chat", data_href: "/chat" },
    { title: "마이페이지", path: "/myPage", data_href: "/myPage" },
    { title: "회사 소개", path: "/about_us", data_href: "/about_us" },
    {
      title: "개발자 소개",
      path: "/team_introduce",
      data_href: "/team_introduce",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const currentPath = router.pathname || "/";
    const pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1);
    const activeLink = document.querySelector(`Link[data-href="${pageName}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }, [router.isReady, router.pathname]);

  return (
    <>
      <ul className="_1a7kymoc _588sy42q _588sy415q _588sy412w _588sy4wq">
        {link_item.map((items) => {
          if (items.title == "마이페이지" && userkey == undefined) {
            return (
              <li key={items.title}>
                <Link
                  className="_1a7kymoe _1a7kymod _588sy4fw _588sy4j2 _588sy4mw _588sy4jq _588sy41"
                  data-href={items.data_href}
                  href={items.path}
                  onClick={(e) => {
                    alert("로그인이 필요한 서비스입니다.");
                    e.preventDefault();
                  }}
                >
                  {items.title}
                </Link>
              </li>
            );
          }
          return (
            <li key={items.title}>
              <Link
                data-href={items.data_href}
                className="_1a7kymoe _1a7kymod _588sy4fw _588sy4j2 _588sy4mw _588sy4jq _588sy41"
                href={items.path}
              >
                {items.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
