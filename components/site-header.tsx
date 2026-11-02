"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useRef, useState } from "react";

const navigationLinks = [
  { href: "/users", label: "Usuários" },
  { href: "/plans", label: "Planos" },
];

export function SiteHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Navigation to another page always starts with the mobile menu closed.
  return (
    <ResponsiveHeader key={pathname} pathname={pathname}>
      {children}
    </ResponsiveHeader>
  );
}

function ResponsiveHeader({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <header
      lang="pt-BR"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
      className="border-b border-stone-200 bg-white font-sans text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:text-stone-100"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 sm:px-8 md:gap-6">
        <Link
          href="/"
          aria-label="PACT — página inicial"
          className="mr-auto inline-flex min-h-12 items-center rounded-lg text-lg font-bold tracking-widest focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-600 md:mr-2"
        >
          PACT
        </Link>
        <button
          ref={toggle}
          type="button"
          aria-label={
            open ? "Fechar menu de navegação" : "Abrir menu de navegação"
          }
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-stone-300 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 md:hidden dark:border-stone-700 dark:hover:bg-stone-800"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="size-5"
          >
            {open ? (
              <path d="m6 6 12 12M6 18 18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
        <nav
          id={menuId}
          aria-label="Navegação principal"
          className={`${open ? "flex" : "hidden"} order-last w-full flex-col gap-2 border-t border-stone-200 pt-3 md:order-none md:flex md:w-auto md:flex-1 md:flex-row md:border-0 md:pt-0 dark:border-stone-800`}
        >
          {navigationLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={pathname === href ? "page" : undefined}
              className={`inline-flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ${pathname === href ? "bg-violet-50 text-violet-800 dark:bg-violet-950 dark:text-violet-200" : "text-stone-700 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800"}`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex min-h-12 items-center gap-2 md:ml-auto md:gap-3">
          {children}
        </div>
      </div>
    </header>
  );
}
