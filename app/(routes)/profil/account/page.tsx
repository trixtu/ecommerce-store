

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { LogoutButton } from "../../auth";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import Container from "@/components/ui/container";
import Contact from "@/components/sidebar/contact";
import MainSidebar from "@/components/sidebar/main-sidebar";


const Account = async () => {

  const session = await getServerSession(authOptions);

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

  //const userstest = await getUsers()




  const items = [
    {
      name: "test1"
    }
  ]

  return (
    <Container>
      <div className="px-4 py-4 sm:px-6 lg:px-8 font-roboto">
        <Breadcrumbs items={crumb} />
        <div className="lg:grid lg:grid-cols-12">
          <div className=" col-span-3">
            <MainSidebar title={"Mein Konto"} valueKey="subCat" />
            <Contact />
          </div>
          <div className=" col-span-9">
            {/* {userstest.map((user) => (
              <p key={user.id}>{user.email}</p>
              
            ))} */}
            account
          </div>
        </div>
        <div><pre>{JSON.stringify(session)}</pre></div>
        <LogoutButton />
        <LogoutButton />
      </div>
    </Container>
  );
};

export default Account;
