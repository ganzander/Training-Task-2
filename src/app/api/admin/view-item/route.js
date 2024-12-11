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
    const result = await client.search({
      index: "optical_items",
      body: {
        query: {
          term: { _id: itemid },
        },
      },
    });
    const items = result.hits.hits;
    if (items.length > 0) {
      const foundItem = items[0]._source;
      return new Response(
        JSON.stringify({
          Success: true,
          msg: "Found the item",
          foundItem,
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
    console.error(err);
    return new Response(
      JSON.stringify({
        Success: false,
        msg: "Error occurred while searching for the item.",
        error: err.message,
      })
    );
  }
}
