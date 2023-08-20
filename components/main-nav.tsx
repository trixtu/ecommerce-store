"use client";
import { cn } from "@/lib/utils";
import { Category, Subcategory } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Container from "./ui/container";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";

interface MainNavProps {
  data: Category[];
  subcategories: Subcategory[]
}
const MainNav: React.FC<MainNavProps> = ({ data, subcategories }) => {
  const pathname = usePathname();
  const [showSubMenu, setShowSubMenu] = useState(false)

  const routes = data.map((route: { id: any; name: any }) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
    id: route.id,
    submenu: true,
    sublinks: subcategories.map((subcat) => ({
      id: subcat.id,
      name: subcat.name,
      categoryId: subcat.categoryId
    }))
  }));

  return (
    <>

      <div className=" bg-[#ececec] h-[60px] p-[15px] hidden lg:block">
        <Container>
          <div className="px-4 sm:px-6 lg:px-8">
            <ul className="flex gap-6">
              {routes.map((route) => (
                <li
                  key={route.href}
                  onMouseEnter={() => setShowSubMenu(true)}
                  onMouseLeave={() => setShowSubMenu(false)}
                >
                  <Link
                    href={route.href}
                    className={cn(
                      " text-xl font-bold transition-colors hover:text-red-600 ",
                      route.active ? "text-red-600 border border-red-600 p-2.5 ease-in-out duration-300" : "text-neutral-800"
                    )}
                  >
                    {route.label}
                  </Link>

                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>

      
    </>
  );
};

export default MainNav;
