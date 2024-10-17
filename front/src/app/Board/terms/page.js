"use client"
import Terms from "@/component/user/userPage/Terms";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "/public/css/myPage.css";

export default function () {
  const [selectedTerms, setSelectedTerms] = useState(
    "서비스 이용약관");
  
  const searchParams = useSearchParams();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const term = searchParams.get('term');
      if (term) {
        setSelectedTerms(term);
      }
    }
  }, []);

  return (
    <div>
      <article className="_1h4pbgy7wg _1h4pbgy7wz">
        <div className="_6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <section style={{ borderBottom: "1px solid #ebebeb" }}>
            <div className="_588sy41z _588sy421 _588sy42q _588sy415q _588sy417e">
              <nav className="iq86zf0">
                <ol className="iq86zf1 _588sy42q _588sy415q">
                  <li>
                    <Link href="/">
                      <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf3 iq86zf2 _588sy41n">
                        홈
                      </span>
                    </Link>
                    <span className="_588sy4192 _588sy41w _588sy41b2 _588sy43 iq86zf4 _588sy4ze _588sy4w8">
                      &gt;
                    </span>
                  </li>
                </ol>
              </nav>
              <Link href="/Board/terms">
                <span className="_588sy4192 _588sy41x _588sy41b2 _588sy43">
                  약관 및 정책
                </span>
              </Link>
            </div>
            <Link href="/Board/terms">
              <div className="_1h4pbgy7dk _1h4pbgy7j7 _1h4pbgy7j0 _1h4pbgy7il _1h4pbgy7w0">
                <h1 className="_1h4pbgy78o _1h4pbgy796 _1h4pbgy79g _1h4pbgy7ag _1h4pbgy7c8">
                  약관 및 정책
                </h1>
              </div>
            </Link>
          </section>
        </div>
        <div className="my_home container my md _6vo5t01 _6vo5t00 _588sy4n8 _588sy4nl _588sy4o4 _588sy4on _588sy4ou _588sy4p7 _588sy4k2 _588sy4kf _588sy4ky _588sy4lh _588sy4lo _588sy4m1 _588sy4n _588sy462">
          <article className="_1h4pbgy7wg _1h4pbgy7wz">
            <section className="_1h4pbgy9ug _1h4pbgy8zc _1h4pbgy92j _1h4pbgy7y8 _1h4pbgy83s _1h4pbgy843 _1h4pbgy84k">
              <div data-v-0adb81cc="" className="snb_area _1d991sp0 _1h4pbgy9u0 _1h4pbgy9uj _1h4pbgy9vs" data-v-1ed3965f="">
                <nav data-v-7bcac446="" data-v-0adb81cc="" className="snb">
                  <div data-v-7bcac446="" className="snb_list">
                    <ul data-v-7a824f04="" data-v-7bcac446="" className="snb_menu">
                      <li data-v-7a824f04="" className="menu_item">
                        <Link href='#' onClick={() => setSelectedTerms("서비스 이용약관")} style={{ fontWeight: selectedTerms === "서비스 이용약관" ? 'bold' : 'normal' }}>
                          서비스 이용약관
                        </Link>
                      </li>
                      <li data-v-7a824f04="" className="menu_item">
                        <Link href='#' onClick={() => setSelectedTerms("개인정보 처리방침")} style={{ fontWeight: selectedTerms === "개인정보 처리방침" ? 'bold' : 'normal', }}>
                          개인정보 처리방침
                        </Link>
                      </li>
                      <li data-v-7a824f04="" className="menu_item">
                        <Link href='#' onClick={() => setSelectedTerms("위치기반 서비스 이용약관")} style={{ fontWeight: selectedTerms === "위치기반 서비스 이용약관" ? 'bold' : 'normal', }}>
                          위치기반 서비스 이용약관
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
              <div data-v-81750584="" data-v-0adb81cc="" className="content_area my-page-content" style={{ display: 'flex', flexDirection: 'column' }} >
                <div data-v-6b53f901="" data-v-81750584="" className="content_title border">
                  <div data-v-6b53f901="" className="title">
                    <h3 data-v-6b53f901="">{selectedTerms}</h3>
                  </div>
                </div>
                <div style={{ flex: '1' }} className="tableDiv">
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Terms selectedTerms={selectedTerms} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>
          </article>
        </div>
      </article>
    </div>
  )
}
