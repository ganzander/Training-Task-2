"use server";
import client from "@/utils/dbconnect/esConnection";

export async function POST(req) {
  const { itemid } = await req.json();

  if (!itemid) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter your item id" })
    );
  }

  try {
    const result = await client.delete({
      index: "optical_items",
      id: itemid,
    });

    if (result.result === "deleted") {
      return new Response(
        JSON.stringify({
          Success: true,
          msg: "Deleted the item",
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          Success: false,
          msg: "Invalid Item Id. Re-enter the Item Id.",
        })
      );
    }
  } catch (err) {
    console.log(err);
    return new Response(
      JSON.stringify({
        Success: false,
        msg: "Error deleting the item",
      })
    );
  }
}
