"use client"

import React from "react";
import { Form } from "./form";
import Container from "@/components/ui/container";
import Button from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter()
  return (
    <Container>
      <div className="flex relative px-4 sm:px-6 lg:px-8 items-center">
        <div className="mt-2.5 w-full">
          <h1 className=" text-neutral-800 font-bold text-5xl mt-0 mb-7">
            Kundenlogin
          </h1>
        </div>
      </div>
      <div className="border mx-4 sm:mx-6 lg:mx-8 items-center border-t-4 border-t-red-500 shadow-md mb-6">
        <div className="grid lg:grid-cols-2 relative p-5">
          <div>
            <h1 className="text-base mb-3.5 mt-1 font-bold">
              Registrierte Kunden
            </h1>
            <div>
              <Form />
            </div>
          </div>
          <div>
            <div className="border-t my-6 border-neutral-300 lg:hidden"/>
            <h1 className="text-base mb-3.5 mt-1 font-bold">Neue Kunden</h1>
            <p className="text-sm">
              Ein Konto zu erstellen hat viele Vorteile: schneller zur Kasse
              gehen, mehr als eine Adresse speichern, Bestellungen verfolgen und
              mehr.
            </p>
            <div className="w-full">
              <Button className=" rounded-sm flex items-center justify-center bg-red-600 mt-4 py-2" onClick={()=>router.push('/auth/register')}>
                Ein Konto erstellen
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
