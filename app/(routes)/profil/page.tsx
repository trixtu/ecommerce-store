import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { LogoutButton } from "../auth";
import Breadcrumbs from "@/components/ui/breadcrumbs/breadcrumbs";
import Container from "@/components/ui/container";
import Contact from "@/components/sidebar/contact";
import MainSidebar from "@/components/sidebar/main-sidebar";
import getUsers from "@/actions/get-users";


const ProfilePage = async () => {

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const users = await getUsers()

  const user = users.find((user) => user.email === session.user?.email)

  console.log(user)
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
            <div className="lg:ml-4 border border-t-4 border-t-red-600 shadow-sm p-4">
              <h1 className="font-bold text-2xl my-6">Meine Übersicht</h1>
              <div className="flex items-baseline justify-between">
                <h3 className="font-bold my-2">Hallo,{user?.vorname + ' ' + user?.nachname}</h3>
                <LogoutButton/>
              </div>
              <p className="text-sm">Von Ihrer Benutzerkonto-Übersicht aus haben Sie die Möglichkeit, Ihre letzten Vorgänge einzusehen und Ihre Benutzerkonto-Daten zu bearbeiten. Wählen Sie dazu einen der untenstehenden Links, um Informationen anzusehen oder zu bearbeiten.</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfilePage;
