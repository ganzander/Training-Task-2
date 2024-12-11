"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ViewSingleItem({ decodedToken, itemId }) {
  const router = useRouter();
  const [data, setData] = useState(null);

  async function deleteItem(e) {
    e.preventDefault();
    if (!itemId) {
      toast.error("Please fill in Item Id");
    } else {
      axios
        .post("/api/admin/remove-item", { itemid: itemId })
        .then((result) => {
          if (result.data.Success === true) {
            toast.success(result.data.msg);
            setData(null);
          } else {
            toast.error(result.data.msg);
          }
        });
    }
  }

  async function editItem(e) {
    e.preventDefault();
    if (!itemId) {
      toast.error("Please fill in Item Id");
    } else {
      router.push("/update-item/" + itemId);
    }
  }

  useEffect(() => {
    axios.post("/api/admin/view-item", { itemid: itemId }).then((result) => {
      if (result.data.Success === true) {
        setData(result.data.foundItem);
      }
    });
  }, []);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#eee] dark:bg-black/[0.96] bg-grid-white/[0.03] p-6">
      {decodedToken && (
        <div className="flex flex-col items-center py-5">
          <h2 className="w-full text-center pb-5 text-lg sm:text-2xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            {data !== null && data.name}
          </h2>

          {data !== null && (
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
                  <Button onClick={editItem}>Edit</Button>
                  <Button onClick={deleteItem}>Delete</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
