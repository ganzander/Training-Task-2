"use server";
import client from "@/utils/dbconnect/esConnection";

export async function POST(req) {
  const { itemid, category, price, ageCategory, name, brand, gender, color } =
    await req.json();

  const requiredFields = {
    itemid,
    category,
    price,
    name,
    brand,
    ageCategory,
    gender,
    color,
  };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return new Response(
        JSON.stringify({ Success: false, msg: `Enter your ${field}` })
      );
    }
  }

  try {
    const result = await client.update({
      index: "optical_items",
      id: itemid,
      body: {
        doc: {
          category,
          price,
          name,
          brand,
          ageCategory,
          gender,
          color,
        },
      },
    });

    if (result.result === "updated") {
      return new Response(
        JSON.stringify({
          Success: true,
          msg: "Updated the item",
          itemId: itemid,
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
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        Success: false,
        msg: "An error occurred while updating the item.",
        error: error.message,
      })
    );
  }
}
