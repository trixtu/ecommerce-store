"use client";

import Button from "@/components/ui/Button";
import useCart from "@/hooks/use-cart";
import { ShoppingCart, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/hooks/use-cart-store";


const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const totalItems = useCartStore(state => state.totalItems)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  
  if (!isMounted) {
    return null;
  }
  return (
    <div className="ml-auto flex items-center gap-x-1 font-roboto lg:min-w-[218px]">
      <div className="hidden md:flex">
        <Button
          className="bg-transparent text-stone-900 flex flex-col items-center text-sm hover:opacity-100 hover:text-red-500"
          onClick={() => router.push("/profil")}
        >
          <div className="border-2 rounded-full p-1 items-center justify-center border-red-500">
            <User color="red" size={20} />
          </div>
          Main Konto
        </Button>
      </div>
      <Button
        onClick={() => router.push("/cart")}
        className="flex items-center rounded-full text-stone-900 bg-transparent px-4 py-2 relative hover:opacity-100 hover:text-red-500"
      >
        <div className="flex flex-col items-center text-sm">
          <div className="mb-[-10px] sm:mb-0">
            <ShoppingCart color="red" size={30}/>
          </div>
          <span className="hidden md:block">Warenkorb</span>
        </div>
        <span className=" md:top-1 md:left-[55px]  ml-2 text-sm font-medium absolute top-0 left-[30px]  bg-stone-900 rounded-md  flex items-center justify-center p-1 h-5 text-white">
          {totalItems}
        </span>
      </Button>
    </div>
  );
};

export default NavbarActions;


