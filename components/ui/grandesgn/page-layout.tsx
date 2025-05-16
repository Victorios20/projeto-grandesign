"use client";

import { HomeIcon, ChevronRight } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type NavLink = {
  href: string;
  label: string;
};

export function PageLayout({ children, links }: PropsWithChildren<{ links?: NavLink[] }>) {
  return (
    <div className="flex h-full w-full bg-secondary text-gray-700">
      {/* Sidebar branca com borda lateral direita */}
      <aside className="sticky top-0 h-screen w-16 bg-white border-r border-primary flex flex-col items-center py-4">
        <Link
          href="/home"
          className="flex items-center justify-center w-12 h-12 rounded-md hover:bg-primary/20"
          title="Home"
        >
          <HomeIcon className="h-6 w-6 text-primary" />
        </Link>
      </aside>


      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header com breadcrumb do shadcn */}
        <header className="sticky top-0 z-30 flex h-16 items-center px-6 bg-white border-b border-primary justify-between">
          <Breadcrumb className="flex-1">
            {links &&
              links.map((link, idx) => {
                const isLast = idx === links.length - 1;
                return (
                  <BreadcrumbItem key={link.href}>
                    <BreadcrumbLink
                      href={link.href}
                      aria-current={isLast ? "page" : undefined}
                      className={isLast ? "font-semibold text-primary" : undefined}
                    >
                      {link.label}
                    </BreadcrumbLink>
                    {!isLast && (
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                      </BreadcrumbSeparator>
                    )}
                  </BreadcrumbItem>
                );
              })}
          </Breadcrumb>

          {/* Imagem logo no canto direito */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/logo.jpg"
              alt="Logo"
              fill
              sizes="40px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
