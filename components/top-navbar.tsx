import React from "react";
import Container from "./ui/container";
import { Phone, Mail, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const TopNavbar = () => {
  return (
    <div className="hidden bg-[#e7ebed] lg:block" >
      <Container>
        <div className="grid grid-cols-2 relative px-4 sm:px-6 lg:px-8 items-center">
          <div>
            <ul className="flex items-center gap-8 text-[#6b6b6b] py-2 text-sm">
              <li className="flex gap-2 hover:text-red-500">
                <Phone width={18} />
                <Link href={"/"}>+49 (0) 7274 / 70 44 0</Link>
              </li>
              <li className="flex gap-2 hover:text-red-500">
                <Mail width={18} />
                <Link href={"/"}>info@hoerner-gmbh.com</Link>
              </li>
            </ul>
          </div>
          <div className="flex justify-end">
            <ul className="flex items-center justify-center gap-4">
              <li className=" bg-[#cbcbcb] text-white rounded-full p-1 w-8 h-8 flex items-center justify-center cursor-pointer">
                <Link href={'https://www.facebook.com/hoernergmbh/'}>
                <Facebook width={20} className=" hover:text-red-500" />
                </Link>
              </li>
              <li className=" bg-[#cbcbcb] text-white rounded-full p-1 w-8 h-8 flex items-center justify-center cursor-pointer">
                <Link href={"https://www.instagram.com/hoernergmbh/"}>
                  <Instagram width={20} className=" hover:text-red-500" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopNavbar;
