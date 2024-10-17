//app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";

//console.log("KAKAO_CLIENT_ID", process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID);
//console.log("KAKAO_SECRET", process.env.NEXT_PUBLIC_KAKAO_SECRET);

export default NextAuth({
  debug: true,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",

      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소 입력 요망",
        },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials, req) {
        if (req.url === '/api/some-public-endpoint') {
          // 특정 엔드포인트에서는 인증 건너뛰기
          return null;
        }

        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user) {
          return user;
        } else {
          return null;
        }
      }
      ,
    }),
    KakaoProvider({

      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET,

    }),
  ],
  callbacks: {

    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      session.user.image = token.picture;
      return session;
    },
  },

  // 이 부분은 잠시만 주석처리 하겠습니다.
  // 강의 마지막 부분에 다시 논의하겠습니다.
  // pages: {
  //   signIn: "/signin",
  // },
});

