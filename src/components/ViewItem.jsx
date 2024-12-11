"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";

export default function ViewItem({ decodedToken }) {
  const [itemid, setItemid] = useState("");
  const [data, setData] = useState(null);

  function handleItemIDChange(event) {
    setItemid(event.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!itemid) {
      toast.error("Please fill in Item Id");
    } else {
      axios.post("/api/admin/view-item", { itemid }).then((result) => {
        if (result.data.Success === true) {
          toast.success(result.data.msg);
          setData(result.data.foundItem);
        } else {
          toast.error(result.data.msg);
        }
      });
    }
  }

  async function deleteItem(e) {
    e.preventDefault();
    console.log(itemid);
    if (!itemid) {
      toast.error("Please fill in Item Id");
    } else {
      axios.post("/api/admin/remove-item", { itemid }).then((result) => {
        if (result.data.Success === true) {
          toast.success(result.data.msg);
          setItemid("");
          setData(null);
        } else {
          toast.error(result.data.msg);
        }
      });
    }
  }

  return (
    <>
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#eee] dark:bg-black/[0.96] bg-grid-white/[0.03] p-6">
        {decodedToken && (
          <div className="flex flex-col py-5">
            <h2 className="w-full text-center pb-5 text-xl md:text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              View Products
            </h2>
            {data === null ? (
              <div className="w-full flex justify-center items-center ">
                <form
                  className="my-8 w-[90%] p-8 dark:bg-black border rounded-lg border-gray-50/[0.4]"
                  onSubmit={handleSubmit}
                >
                  {/* ID */}
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="itemid">Item Id</Label>
                    <Input
                      id="itemid"
                      name="itemid"
                      value={itemid}
                      onChange={handleItemIDChange}
                      type="text"
                      required
                      autoComplete="off"
                      placeholder="Enter the Item Id"
                    />
                  </LabelInputContainer>

                  <button
                    className="relative group/btn mt-4 bg-black text-white dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                  >
                    Fetch the Item &rarr;
                    <BottomGradient />
                  </button>
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </form>
              </div>
            ) : (
              <div className="max-w-md w-full mx-auto rounded-lg md:rounded-2xl p-7 md:p-8 shadow-2xl bg-white dark:bg-black">
                <Card>
                  <CardHeader
                    className="mb-3"
                    images={data.images}
                    title={data.title}
                  />
                  <CardContent>
                    <CardTitle>{"Brand: " + data.brand}</CardTitle>
                    <CardTitle>{"Name: " + data.name}</CardTitle>
                    <CardTitle>{"Category: " + data.category}</CardTitle>
                    <CardTitle>{"Age Category: " + data.ageCategory}</CardTitle>
                    <CardTitle>{"Price: " + data.price}</CardTitle>
                    <CardTitle>{"Gender: " + data.gender}</CardTitle>
                    <CardTitle>{"Color: " + data.color}</CardTitle>
                  </CardContent>

                  <CardFooter className="w-full">
                    <Button onClick={deleteItem}>Delete</Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        )}
      </main>
    </>
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
