import {
  CameraIcon,
  ChartBarIcon,
  CircleHelpIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  Settings2Icon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"

import { type SidebarData } from "../types"

/**
 * 아이콘은 컴포넌트 "참조"로 둔다 (nav-group.tsx가 <item.icon />로 렌더).
 * lucide 컴포넌트 참조를 담고 있으므로 서버 컴포넌트에서 import하면 안 된다.
 *
 * 아직 라우트가 없는 메뉴는 url: "#" + disabled: true.
 */
export const sidebarData: SidebarData = {
  user: {
    name: "제이볼트",
    email: "user@jvolt.ai",
    // public/ 에 아바타 에셋이 없으므로 비워두고 AvatarFallback을 쓴다.
    avatar: "",
  },
  navGroups: [
    {
      title: "일반",
      items: [
        { title: "대시보드", url: "/", icon: LayoutDashboardIcon },
        { title: "라이프사이클", url: "#", icon: ListIcon, disabled: true },
        { title: "분석", url: "#", icon: ChartBarIcon, disabled: true },
        { title: "프로젝트", url: "#", icon: FolderIcon, disabled: true },
        { title: "팀", url: "#", icon: UsersIcon, disabled: true },
      ],
    },
    {
      title: "제안서",
      items: [
        {
          title: "제안서",
          icon: FileTextIcon,
          items: [
            { title: "진행 중 제안서", url: "#", disabled: true },
            { title: "보관함", url: "#", disabled: true },
          ],
        },
        { title: "캡처", url: "#", icon: CameraIcon, disabled: true },
        { title: "프롬프트", url: "#", icon: SparklesIcon, disabled: true },
      ],
    },
    {
      title: "문서",
      items: [
        {
          title: "데이터 라이브러리",
          url: "#",
          icon: DatabaseIcon,
          disabled: true,
        },
        {
          title: "리포트",
          url: "#",
          icon: FileChartColumnIcon,
          disabled: true,
        },
        { title: "워드 어시스턴트", url: "#", icon: FileIcon, disabled: true },
      ],
    },
    {
      title: "기타",
      items: [
        { title: "설정", url: "#", icon: Settings2Icon, disabled: true },
        { title: "도움말", url: "#", icon: CircleHelpIcon, disabled: true },
      ],
    },
  ],
}
