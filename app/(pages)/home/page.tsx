"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { PageLayout } from "@/components/grandesgn/page-layout";
import { homeItems, homeLinks } from "./home-data";

export default function HomePage() {
  return (
    <PageLayout backgroundImage={true} links={homeLinks}>
      <div className="w-full h-full flex flex-row flex-wrap items-start gap-4 p-6 text-foreground">
        {homeItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex flex-col items-center justify-center gap-2 text-foreground"
          >
            <Card className="aspect-square w-36 cursor-pointer flex flex-col items-center justify-center gap-0 bg-white hover:bg-accent hover:text-accent-foreground transition-colors shadow-none">
              <item.icon size={64} className="text-primary" />
            </Card>
            <p className="text-center m-0 text-base font-medium text-[#70717A]">{item.title}</p>
          </Link>
        ))}
      </div>
    </PageLayout>
  );
}
