"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loginCred, setLoginCred] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password } = loginCred;
    if (!name || !email || !password) {
      toast.error("Please fill in the form completely");
    } else {
      axios.post("/api/login", { name, email, password }).then((result) => {
        if (result.data.Success === true) {
          console.log(result.data.AuthToken);
          localStorage.setItem(
            "AuthToken",
            JSON.stringify(result.data.AuthToken)
          );
          toast.success(result.data.msg);
          router.push("/");
        } else {
          toast.error(result.data.msg);
        }
      });

      setLoginCred({ name: "", email: "", password: "" });
    }
  }

  function handleChange(event) {
    setLoginCred({
      ...loginCred,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="flex h-screen bg-[#eee]">
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#eee] dark:bg-black/[0.96] bg-grid-white/[0.03] p-6">
          <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-7 md:p-8 shadow-2xl bg-white dark:bg-black">
            <h2 className="uppercase font-bold text-xl text-center text-neutral-800 dark:text-neutral-200">
              Log In
            </h2>

            <form className="my-8" onSubmit={handleSubmit}>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={loginCred.name}
                  onChange={handleChange}
                  placeholder="Name"
                  type="text"
                  autoComplete="off"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  value={loginCred.email}
                  onChange={handleChange}
                  placeholder="Email"
                  type="email"
                  autoComplete="off"
                  required
                />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={loginCred.password}
                  onChange={handleChange}
                  placeholder="Password"
                  type="password"
                  autoComplete="off"
                  required
                />
              </LabelInputContainer>

              <button
                className="relative group/btn mt-8 bg-black text-white dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                Log In &rarr;
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
