

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { LogoutButton } from "../../auth";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import Container from "@/components/ui/container";
import Contact from "@/components/sidebar/contact";
import MainSidebar from "@/components/sidebar/main-sidebar";
import getUsers from "@/actions/get-users";
import getAddress from "@/actions/get-address";
import UserAddress from "./components/user-address";


const Address = async () => {

  const session = await getServerSession(authOptions);
  const users = await getUsers()
  const address = await getAddress()
 


  

  

  if (!session) {
    redirect("/auth/login");
  }

  const crumb = [
    {
      label: (
        <img src={'https://cdn-icons-png.flaticon.com/512/25/25694.png'} alt="Img" width={18} height={18} />
      ),
      path: "/",
    },
    {
      label: `Mein Konto`,
      path: `/profil`,
    }
  ]

  const items = [
    {
      name: "test1"
    }
  ]

  return (
    <Container>
      <div className="px-4 py-4 sm:px-6 lg:px-8 font-roboto">
        <Breadcrumbs items={crumb} />
        <div className="grid grid-cols-12">
          <div className=" col-span-3">
            <MainSidebar title={"Mein Konto"} valueKey="subCat" />
            <Contact />
          </div>
          <div className=" col-span-9">
            <div className="lg:ml-4 border border-t-4 border-t-red-600 shadow-sm p-4">
              <h1 className="font-bold text-2xl">Benutzerkonto bearbeiten</h1>
              <UserAddress address={address} users={users} emailSession={session.user?.email}/>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Address;
