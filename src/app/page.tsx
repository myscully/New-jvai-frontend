export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight">JV AI</span>
          <div className="hidden gap-8 text-sm text-zinc-600 sm:flex dark:text-zinc-400">
            <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              기능
            </a>
            <a href="#status" className="hover:text-zinc-900 dark:hover:text-zinc-100">
              배포 상태
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6">
        <section className="border-b border-zinc-200 py-24 dark:border-zinc-800">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            배포 성공
          </span>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            이 화면이 보이면
            <br />
            배포가 정상 작동합니다.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            New JV AI Frontend의 배포 확인용 샘플 페이지입니다. GitHub에 push하면
            Vercel이 자동으로 빌드해 이 주소에 반영합니다. 샘플 페이지입니다. 왜 적용이 안되는가
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/myscully/New-jvai-frontend"
              className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              GitHub 저장소
            </a>
            <a
              href="#status"
              className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            >
              배포 정보 보기
            </a>
          </div>
        </section>

        <section
          id="features"
          className="grid gap-px border-b border-zinc-200 bg-zinc-200 sm:grid-cols-3 dark:border-zinc-800 dark:bg-zinc-800"
        >
          {[
            {
              title: "Next.js 16",
              body: "App Router 기반 구조. src/app/page.tsx가 이 화면입니다.",
            },
            {
              title: "Tailwind CSS v4",
              body: "이 페이지의 모든 스타일이 Tailwind로 적용되어 있습니다.",
            },
            {
              title: "자동 배포",
              body: "main 브랜치에 push하면 1~2분 내 자동 반영됩니다.",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white p-8 dark:bg-zinc-950">
              <h2 className="text-base font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.body}
              </p>
            </div>
          ))}
        </section>

        <section id="status" className="py-16">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            배포 정보
          </h2>
          <dl className="mt-6 max-w-lg divide-y divide-zinc-200 border-y border-zinc-200 text-sm dark:divide-zinc-800 dark:border-zinc-800">
            {[
              ["저장소", "myscully/New-jvai-frontend"],
              ["프레임워크", "Next.js 16.3.1 / React 19"],
              ["스타일", "Tailwind CSS v4"],
              ["페이지 경로", "src/app/page.tsx"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-6 py-3">
                <dt className="text-zinc-500 dark:text-zinc-400">{k}</dt>
                <dd className="text-right font-medium">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
            다음 단계: 이 파일의 내용을 실제 서비스 화면으로 교체하세요.
          </p>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-6 text-sm text-zinc-500 dark:text-zinc-400">
          New JV AI Frontend — 배포 확인용 샘플
        </div>
      </footer>
    </div>
  );
}
