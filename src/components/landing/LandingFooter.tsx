export function LandingFooter() {
  return (
    <footer className="bg-background py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        <p className="text-sm text-subtle">
          © {new Date().getFullYear()} Temukita. Undangan digital dengan tenang.
        </p>
        <div className="flex gap-6 text-sm text-subtle">
          <a href="#fitur" className="transition-colors hover:text-foreground">
            Fitur
          </a>
          <a
            href="#cara-kerja"
            className="transition-colors hover:text-foreground"
          >
            Cara kerja
          </a>
          <a href="#harga" className="transition-colors hover:text-foreground">
            Harga
          </a>
        </div>
      </div>
    </footer>
  );
}
