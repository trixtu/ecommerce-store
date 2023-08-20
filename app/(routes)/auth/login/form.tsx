"use client";

import { Alert } from "@/components/uii/alert";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, Loader2 } from 'lucide-react'


export const Form = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const loginerror = searchParams.get("error") ? "Invalid credentials" : "";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>(loginerror || "");
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true)
      const res = await signIn("credentials", {

        redirect: false,
        email,
        password,
        callbackUrl,
      });
      if (!res?.error) {
        router.push(callbackUrl);
        setIsLoading(!isLoading)
      } else {
        setError("Invalid email or password");
        setIsLoading(isLoading)

      }
    } catch (err: any) { }

  };
  console.log(isLoading)
  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full">
      {error && <Alert>{error}</Alert>}
      <p className="text-sm">
        Wenn Sie ein Konto haben, melden Sie sich mit Ihrer E-Mail-Adresse an.
      </p>

      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">
          Email <span className="ml-1">*</span>
        </Label>
        <Input
          className="lg:w-2/3 rounded-sm border-neutral-500"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="password">
          Password <span className="ml-1">*</span>
        </Label>
        <Input
          className=" lg:w-2/3 rounded-sm border-neutral-500"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type={visible ? "text" : "password"}
        />
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

      <div className="w-full">
        <Button className=" rounded-sm flex items-center justify-center bg-red-600 py-2" disabled={isLoading}>
          {isLoading &&
            <Loader2 className=" animate-spin text-blue-400 mr-2 font-bold" />
          }
          Anmelden
          <ChevronRight size={20} />
        </Button>
      </div>
      <p className="text-sm">* Pflichtfelder</p>
    </form>
  );
};
