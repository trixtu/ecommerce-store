import React from "react";
import Container from "@/components/ui/container";
import Link from "next/link";
import MainNav from "./main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import TopNavbar from "./top-navbar";
import MobileMenu from "./mobile-menu";
import getSubcategories from "@/actions/get-subcategories";
import Search from "./search/search";



const Navbar = async () => {

  const categories = await getCategories()
  
  const {ids}:any = categories.map((item) => item.id)

  const subcategories = await getSubcategories({categoryId:ids})

  return (
    <>
      <TopNavbar />
      <header className=" w-full bg-white border-b sticky top-0 z-10">
        <div className="">
          <Container>
            <div className="relative px-4 sm:px-6 lg:px-8 flex h-20 items-center ">
              {/* Mobile Icon */}
              <MobileMenu data={categories} subcategories={subcategories}/>
              <Link href={"/"} className="flex min-w-[210px] h-[45px]">
                <img className="w-[190px] h-[40px]" alt="logo" src="https://www.hoerner-gmbh.com/wp-content/uploads/2019/09/hoerer_logo_big.png" />
              </Link>
              <Search/>
              <NavbarActions />
            </div>
          </Container>
        </div>
      </header>
      <MainNav data={categories} subcategories={subcategories} />
    </>
  );
};

export default Navbar;
