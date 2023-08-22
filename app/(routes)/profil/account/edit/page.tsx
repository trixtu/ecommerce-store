import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { LogoutButton } from "../../../auth";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import Container from "@/components/ui/container";
import Contact from "@/components/sidebar/contact";
import MainSidebar from "@/components/sidebar/main-sidebar";

import EditEmail from "./components/edit-email";
import EditPassword from "./components/edit-password";
import prismadb from "@/lib/prismadb";
import getUsers from "@/actions/get-users";
import EditAccount from "./components/edit-account";
import { compare } from "bcrypt";

const EditPage = async () => {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  
  const users = await getUsers()
  const user = users.find((user) => user.email === session.user?.email)

  

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
              <EditAccount id={user?.id} initialData={users}/>
            </div>
          </div>
        </div>
        <LogoutButton />
        <LogoutButton />
      </div>
    </Container>
  );
};

export default EditPage;
