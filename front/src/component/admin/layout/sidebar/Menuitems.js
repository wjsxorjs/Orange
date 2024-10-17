import {
  IconHome,
  IconInbox,
  IconCategory,
  IconUser,
  IconClipboardText,
  IconMessageChatbot,
  IconMedal2,
  IconAward,
  IconReportAnalytics,
  IconChartBar,
  IconMoodHappyFilled,
} from "@tabler/icons-react";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    title: "메인",
    icon: IconHome,
    href: "/ad",
  },
  {
    navlabel: true,
    subheader: "게시글",
  },
  {
    title: "게시글 관리",
    icon: IconInbox,
    href: "/ad/post",
  },
  {
    title: "카테고리 관리",
    icon: IconCategory,
    href: "/ad/post/category",
  },
  {
    navlabel: true,
    subheader: "사용자",
  },
  {
    title: "사용자 관리",
    icon: IconUser,
    href: "/ad/user",
  },
  {
    title: "배지 관리",
    icon: IconAward,
    href: "/ad/user/badge",
  },
  {
    title: "채팅 이모티콘 관리",
    icon: IconMoodHappyFilled,
    href: "/ad/user/emoticon",
  },
  {
    navlabel: true,
    subheader: "게시판",
  },
  {
    title: "게시판 관리",
    icon: IconClipboardText,
    href: "/ad/bbs",
  },
  {
    navlabel: true,
    subheader: "통계",
  },
  {
    title: "대시보드",
    icon: IconMedal2,
    href: "/ad/statistic",
  },
  {
    title: "통계 분석",
    icon: IconChartBar,
    href: "/ad/statistic/analyze",
  },
  {
    navlabel: true,
    subheader: "고객센터",
  },
  {
    title: "문의사항",
    icon: IconMessageChatbot,
    href: "/ad/qna",
  },
];

export default Menuitems;
