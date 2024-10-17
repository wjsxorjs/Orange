/** @type {import('next').NextConfig} */
// 52.78.168.131
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true, // ESLint errors will be ignored during the build process
  },
  async rewrites() {
    return [
      // {
      //   source: "/api/category/:path*",
      //   destination: "http://52.78.168.131/api/category/:path*",
      // },
      // {
      //   source: "/api/:path*",
      //   destination: "http://52.78.168.131/api/:path*"
      // },
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*"
      },
      {
        source: "/sub/:path*",
        destination: "http://localhost:8080/sub/:path*"
      },
      {
        source: "/pub/:path*",
        destination: "http://localhost:8080/pub/:path*"
      },
      // {
      //   source: "/adpost/:path*",
      //   destination: "http://52.78.168.131/adpost/:path*",
      // },
      {
        source: "/user/:path*",
        destination: "http://localhost:8080/user/:path*",
      },
      // {
      //   source: "/admin/category/:path*",
      //   destination: "http://52.78.168.131/admin/category/:path*",
      // },
      // {
      //   source: "/admin/board/:path*",
      //   destination: "http://52.78.168.131/admin/board/:path*",
      // },
      // {
      //   source: "/chat/:path*",
      //   destination: "http://52.78.168.131/chat/:path*",
      // },
      // {
      //   source: "/town/:path*",
      //   destination: "http://52.78.168.131/town/:path*",
      // },
      // {
      //   source: "/address/:path*",
      //   destination: "http://52.78.168.131/address/:path*",
      // },
      // {
      //   source: "/searchlog/:path*",
      //   destination: "http://52.78.168.131/searchlog/:path*",
      // },
      {
        source: "/sub/:path*",
        destination: "http://52.78.168.131/sub/:path*",
      },
      {
        source: "/ws-stomp/:path*",
        destination: "http://52.78.168.131/ws-stomp/:path*",
      },
      {
        source: "/pub/:path*",
        destination: "http://52.78.168.131/pub/:path*",
      },
      // {
      //   source: "/qna/:path*",
      //   destination: "http://52.78.168.131/qna/:path*",
      // },
      // {
      //   source: "/ad/:path*",
      //   destination: "http://52.78.168.131/ad/:path*",
      // },
      // {
      //   source: "/alarm/:path*",
      //   destination: "http://52.78.168.131/alarm/:path*"
      // },
      // {
      //   source: "/deleteNotification/:path*",
      //   destination: "http://52.78.168.131/deleteNotification/:path*"
      // },
      // {
      //   source: "/deleteAllAlarms/:path*",
      //   destination: "http://52.78.168.131/deleteAllAlarms/:path*"
      // },
      // {
      //   source: "/notify/:path*",
      //   destination: "http://52.78.168.131/notify/:path*"
      // },
      // {
      //   source: "/subscribe/:path*",
      //   destination: "http://52.78.168.131/subscribe/:path*"
      // },
    ];
  },
};

export default nextConfig;
