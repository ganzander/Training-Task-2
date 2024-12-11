"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectInput } from "@/components/ui/selectInput";
import toast from "react-hot-toast";
import axios from "axios";

export default function AddItem({ decodedToken }) {
  const [uploadCred, setUploadCred] = useState({
    category: null,
    price: "",
    ageCategory: null,
    name: "",
    brand: "",
    color: "",
    gender: null,
  });
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  function handleFileUpload(e) {
    setImages(Array.from(e.target.files));
  }

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
      !images ||
      !gender ||
      !color
    ) {
      toast.error("Please fill in the form completely");
      return;
    }
    const urls = [];
    const url = `https://api.cloudinary.com/v1_1/dd36yv43a/image/upload`;

    try {
      for (let i = 0; i < images.length; i++) {
        const formData = new FormData();
        formData.append("file", images[i]);
        formData.append("upload_preset", "shriJiOpticals");
        try {
          await axios
            .post(url, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              urls.push(response.data.secure_url);
            });
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }

      await axios
        .post("/api/admin/add-item", {
          category,
          price,
          ageCategory,
          name,
          brand,
          images: urls,
          gender,
          color,
        })
        .then((result) => {
          if (result.data.Success === true) {
            toast.success(result.data.msg + " with id: " + result.data.itemId);
          } else {
            toast.error(result.data.msg);
          }
        });
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
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#eee] dark:bg-black/[0.96] bg-grid-white/[0.03] p-6">
      {decodedToken && (
        <div className="flex flex-col items-center py-5">
          <h2 className="w-full text-center pb-5 text-xl md:text-3xl lg:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Add Products
          </h2>

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
                  placeholder="Choose Category"
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
                  placeholder="Enter the Brand"
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
                  placeholder="Enter the Name"
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
                  placeholder="Choose Age Category"
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
                  placeholder="Choose Gender"
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
                  placeholder="Color"
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
                  placeholder="Enter the Price"
                  type="text"
                  autoComplete="off"
                  required
                />
              </LabelInputContainer>

              {/* IMAGES */}
              <LabelInputContainer className="mb-4">
                <Label htmlFor="images">Upload Images</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="flex h-10 w-full border-none bg-white dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm placeholder:text-neutral-700 dark:placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0px_0px_1px_1px_var(--neutral-700)] transition duration-400"
                />
              </LabelInputContainer>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex flex-col w-full justify-center gap-2 items-center">
              <button
                className="relative group/btn mt-4 bg-black text-white dark:from-zinc-900 dark:to-zinc-900 block dark:bg-zinc-800 w-1/2 dark:text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] col-span-full"
                type="submit"
              >
                Add the item &rarr;
                <BottomGradient />
              </button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full col-span-full" />
            </div>
          </form>
        </div>
      )}
    </main>
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
