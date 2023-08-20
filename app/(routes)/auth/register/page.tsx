/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Container from "@/components/ui/container";
import Button from "@/components/ui/Button";
import { ChevronRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import {  useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { Alert } from "@/components/uii/alert";

const formSchema = z
  .object({
    vorname: z.string().nonempty("Vorname is required"),
    nachname: z.string().nonempty("Nachname is required"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Email format not valid"),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface FormValues {
  vorname: string;
  nachname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterPage() {
  const [anrede, setAnrede] = useState("herr");

  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      vorname: "",
      nachname: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { formState, register, handleSubmit, control } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          data: { 
            email: data.email, 
            password: data.password,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        signIn();
      } else {
        setError((await res.json()).error);
      }
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Container>
      <div className="flex relative px-4 sm:px-6 lg:px-8 items-center">
        <div className="mt-2.5 w-full">
          <h1 className=" text-neutral-800 font-bold text-5xl mt-0 mb-7">
            Neues Kundenkonto anlegen
          </h1>
        </div>
      </div>
      <div className="border mx-4 sm:mx-6 lg:mx-8 items-center border-t-4 border-t-red-500 shadow-md mb-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 relative p-5">
            <div>
              <h1 className="text-base mb-3.5 mt-1 font-bold">
                PERSÖNLICHE INFORMATIONEN
              </h1>
              {error && <Alert>{error}</Alert>}
              <div className="space-y-4 w-full">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="vorname">
                    Vorname <span className="ml-1">*</span>
                  </Label>
                  <Input
                    className="lg:w-2/3 rounded-sm border-neutral-500 h-8"
                    {...register("vorname")}
                    id="vorname"
                    type="text"
                  />
                  <span className="text-sm text-red-500">
                    {errors.vorname?.message}
                  </span>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="nachname">
                    Nachname <span className="ml-1">*</span>
                  </Label>
                  <Input
                    className="lg:w-2/3 rounded-sm border-neutral-500 h-8"
                    {...register("nachname")}
                    id="nachname"
                    type="text"
                  />
                  <span className="text-sm text-red-500">
                    {errors.nachname?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4 w-full">
              <h1 className="text-base mb-3.5 mt-1 font-bold">
                ANMELDEINFORMATIONEN
              </h1>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">
                  E-Mail <span className="ml-1">*</span>
                </Label>
                <Input
                  className="lg:w-2/3 rounded-sm border-neutral-500 h-8"
                  {...register("email")}
                  id="email"
                  type="email"
                />
                <span className="text-sm text-red-500">
                  {errors.email?.message}
                </span>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">
                  Passwort <span className="ml-1">*</span>
                </Label>
                <Input
                  className="lg:w-2/3 rounded-sm border-neutral-500 h-8"
                  {...register("password")}
                  id="password"
                  type={visible ? "text" : "password"}
                />
                <span className="text-sm text-red-500">
                  {errors.password?.message}
                </span>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="passwordConfirm">
                  Passwort bestätigen <span className="ml-1">*</span>
                </Label>
                <Input
                  className="lg:w-2/3 rounded-sm border-neutral-500 h-8"
                  {...register("passwordConfirm")}
                  id="passwordConfirm"
                  type={visible ? "text" : "password"}
                />
                <span className="text-sm text-red-500">
                  {errors.passwordConfirm?.message}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" onClick={() => setVisible(!visible)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Passwort anzeigen
                </label>
              </div>
              <p className="text-sm">* Pflichtfelder</p>
            </div>
            <div className="w-full">
              <Button className=" rounded-sm flex items-center justify-center bg-red-600 mt-4 py-2">
                Ein Konto erstellen
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
