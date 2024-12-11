"use server";
import client from "@/utils/dbconnect/esConnection";

export async function GET(req) {
  try {
    const result = await client.search({
      index: "optical_items",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    const transformedData = result.hits.hits.map((item) => ({
      _id: item._id,
      category: item._source.category,
      price: parseFloat(item._source.price),
      ageCategory: item._source.ageCategory,
      name: item._source.name,
      brand: item._source.brand,
      images: item._source.images,
      gender: item._source.gender,
      color: item._source.color,
    }));

    if (transformedData.length > 0) {
      return new Response(
        JSON.stringify({
          Success: true,
          msg: "Fetching Items",
          items: transformedData,
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          Success: false,
          msg: "No Items Found",
          items: [],
        })
      );
    }
  } catch (err) {
    console.error("Error fetching items:", err);
    return new Response(
      JSON.stringify({
        Success: false,
        msg: "Error fetching items",
        items: [],
      })
    );
  }
}
