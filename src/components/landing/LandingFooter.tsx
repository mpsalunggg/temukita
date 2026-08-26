import { NAV_LINKS, linkClass, navHref } from './ui'

export function LandingFooter({ offSite = false }: { offSite?: boolean }) {
  return (
    <footer className="bg-background py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <p className="text-sm text-subtle">
          © {new Date().getFullYear()} Temukita. Undangan digital dengan tenang.
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-subtle">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={navHref(item.href, offSite)}
              className={`${linkClass} hover:text-foreground`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
