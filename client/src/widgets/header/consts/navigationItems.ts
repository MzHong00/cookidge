import { RiHome5Line } from "@react-icons/all-files/ri/RiHome5Line";
import { RiLayout2Line } from "@react-icons/all-files/ri/RiLayout2Line";
import { RiSearchLine } from "@react-icons/all-files/ri/RiSearchLine";
import { RiTrophyLine } from "@react-icons/all-files/ri/RiTrophyLine";

export const navItems = [
  {
    to: "",
    Icon: RiHome5Line,
    content: "홈",
  },
  {
    to: "dashboard/fridge",
    Icon: RiLayout2Line,
    content: "대시보드",
  },
  {
    to: "rank",
    Icon: RiTrophyLine,
    content: "랭킹",
  },
  {
    to: "search",
    Icon: RiSearchLine,
    content: "검색",
  },
];
