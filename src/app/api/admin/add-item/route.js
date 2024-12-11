"use server";
import client from "@/utils/dbconnect/esConnection";

export async function POST(req) {
  const { category, price, ageCategory, name, brand, images, gender, color } =
    await req.json();

  // Logging the incoming data for debugging purposes
  console.log("Received data:", {
    category,
    price,
    ageCategory,
    name,
    brand,
    images,
    gender,
    color,
  });

  // Check for missing fields
  if (!category) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter the category" })
    );
  } else if (!price) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter the price" })
    );
  } else if (!ageCategory) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter the age category" })
    );
  } else if (!name) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter the name" })
    );
  } else if (!brand) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter the brand" })
    );
  } else if (!images) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter the images" })
    );
  } else if (!gender) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter the gender" })
    );
  } else if (!color) {
    return new Response(
      JSON.stringify({ Success: false, msg: "Enter the color" })
    );
  }

  try {
    const result = await client.index({
      index: "optical_items",
      document: {
        category,
        price,
        ageCategory,
        name,
        brand,
        images,
        gender,
        color,
      },
    });

    return new Response(
      JSON.stringify({
        Success: true,
        msg: "Added a new item",
        itemId: result._id,
      })
    );
  } catch (err) {
    console.error("Error adding item to Elasticsearch:", err);
    return new Response(
      JSON.stringify({
        Success: false,
        msg: "Unable to add a new item",
      })
    );
  }
}
