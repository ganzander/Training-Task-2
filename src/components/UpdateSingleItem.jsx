"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectInput } from "@/components/ui/selectInput";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UpdateSingleItem({ decodedToken, itemId }) {
  const [data, setData] = useState(null);
  const [uploadCred, setUploadCred] = useState({
    category: null,
    price: "",
    ageCategory: null,
    name: "",
    brand: "",
    color: "",
    gender: null,
  });

  function handleChange(event) {
    setUploadCred({
      ...uploadCred,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { category, price, ageCategory, name, brand, gender, color } =
      uploadCred;
    if (
      !category ||
      !price ||
      !ageCategory ||
      !name ||
      !brand ||
      !gender ||
      !color
    ) {
      toast.error("Please fill in the form completely");
      return;
    }

    try {
      const result = await axios.post("/api/admin/update-item", {
        ...uploadCred,
        itemid: itemId,
      });

      if (result.data.Success) {
        toast.success(
          "Updated " + result.data.msg + " with id: " + result.data.itemId
        );
      } else {
        toast.error(result.data.msg);
      }
    } catch (error) {
      toast.error("Failed to upload files. Please try again.");
    }

    setUploadCred({
      category: null,
      price: "",
      ageCategory: null,
      name: "",
      brand: "",
      color: "",
      gender: null,
    });
    setData({
      category: null,
      price: null,
      ageCategory: null,
      name: null,
      brand: null,
      color: null,
      gender: null,
    });
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
            {data !== null && "Update Item"}
          </h2>

          {data !== null && (
            <div className="w-full flex justify-center items-center">
              <form
                className="my-8 w-[90%] p-8 dark:bg-black border rounded-lg border-gray-50/[0.4]"
                onSubmit={handleSubmit}
              >
                <div className="w-full grid gap-6 md:grid-cols-2">
                  {/* CATEGORY */}
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="category">Category</Label>
                    <SelectInput
                      id="category"
                      name="category"
                      value={uploadCred.category}
                      onChange={handleChange}
                      type="text"
                      required
                      placeholder={data.category}
                      options={[
                        { value: "Sunglasses", label: "Sunglasses" },
                        { value: "Powerglass", label: "Power Glass" },
                        { value: "ContactLens", label: "Contact Lens" },
                        { value: "Accessories", label: "Accessories" },
                      ]}
                    />
                  </LabelInputContainer>

                  {/* BRAND */}
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      name="brand"
                      value={uploadCred.brand}
                      onChange={handleChange}
                      placeholder={data.brand}
                      type="text"
                      autoComplete="off"
                      required
                    />
                  </LabelInputContainer>

                  {/* NAME */}
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={uploadCred.name}
                      onChange={handleChange}
                      placeholder={data.name}
                      type="text"
                      autoComplete="off"
                      required
                    />
                  </LabelInputContainer>

                  {/* AGE CATEGORY */}
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="age">Age Category</Label>
                    <SelectInput
                      id="ageCategory"
                      name="ageCategory"
                      value={uploadCred.ageCategory}
                      onChange={handleChange}
                      required
                      placeholder={data.ageCategory}
                      options={[
                        { label: "Kids (0-12 years)", value: "Kids" },
                        { label: "Teens (13-19 years)", value: "Teens" },
                        {
                          label: "Young Adults (20-35 years)",
                          value: "YoungAdults",
                        },
                        { label: "Adults (36-55 years)", value: "Adults" },
                        { label: "Seniors (56+ years)", value: "Seniors" },
                        { label: "All Ages", value: "All Ages" },
                      ]}
                    />
                  </LabelInputContainer>

                  {/* GENDER */}
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="gender">Gender</Label>
                    <SelectInput
                      id="gender"
                      name="gender"
                      value={uploadCred.gender}
                      onChange={handleChange}
                      required
                      placeholder={data.gender}
                      options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                        { label: "Unisex", value: "Unisex" },
                      ]}
                    />
                  </LabelInputContainer>

                  {/* COLOUR */}
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="color">Colour</Label>
                    <Input
                      id="color"
                      name="color"
                      value={uploadCred.color}
                      onChange={handleChange}
                      required
                      placeholder={data.color}
                    />
                  </LabelInputContainer>

                  {/* PRICE */}
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="price">Price (&#8377;)</Label>
                    <Input
                      id="price"
                      name="price"
                      value={uploadCred.price}
                      onChange={handleChange}
                      placeholder={data.price}
                      type="text"
                      autoComplete="off"
                      required
                    />
                  </LabelInputContainer>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex flex-col w-full justify-center gap-2 items-center">
                  <button
                    className="relative group/btn mt-4 bg-black text-white dark:from-zinc-900 dark:to-zinc-900  block dark:bg-zinc-800 w-full dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                  >
                    Update the item &rarr;
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};