import { cn } from "@/lib/utils"

type MainProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  fluid?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Main({ fixed, className, fluid, ...props }: MainProps) {
  return (
    <main
      data-layout={fixed ? "fixed" : "auto"}
      className={cn(
        "px-4 py-6",

        // fixed 레이아웃이면 오버플로우 방지를 위해 flex로 채운다
        fixed && "flex grow flex-col overflow-hidden",

        // fluid가 아니면 컨테이너 쿼리 기준으로 최대 폭 제한
        !fluid &&
          "@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl",
        className
      )}
      {...props}
    />
  )
}
