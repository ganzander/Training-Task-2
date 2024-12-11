"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/fetch-all-items");
        setItems(response.data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="border dark:border-white/[0.5] border-black/[0.5] rounded-xl"
          >
            <Card
              onClick={() => {
                router.push("/view-item/" + item._id);
              }}
            >
              <CardHeader images={item.images} title={item.title} />
              <CardContent>
                <CardTitle className="mt-4">{item.name}</CardTitle>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}
