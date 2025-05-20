"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCreateBlogsMutation } from "@/redux/apis/blogApi";
import axios from "axios";
import Image from "next/image";
// import { image } from "motion/react-client";
import { useState } from "react";
import { toast, Toaster } from "sonner";
// import { Tblog } from "../BlogCard";

const CreateBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [createBlog, { data }] = useCreateBlogsMutation();
  const [isDisable, setIsDisable] = useState(true);
  type TBlog = {
    title: string;
    content: string;
    image: null | File;
    category: string;
  };
  const [formData, setFormData] = useState<TBlog>({
    title: "",
    content: "",
    image: null,
    category: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    //.log("inimagehandle", formData);
    setFormData({ ...formData, image: e.target.files[0] });
    //.log("inimagehandleafter", formData);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // //.log(e.currentTarget.title.name);
    const titleValue = e.currentTarget.title.value;
    const categoryValue = e.currentTarget.category.value;
    const contentValue = e.currentTarget.content.value;

    //.log("form onsubimt", formData);
    setLoading(true);
    if (!formData.image) {
      alert("Please Upload an image");
    }
    const imageData = new FormData();
    imageData.append("file", formData?.image as File);
    imageData.append("upload_preset", "cloudy");
    imageData.append("cloud_name", "drbmetoqj");

    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/drbmetoqj/image/upload`,
        imageData
      );

      //le.log(cloudinaryRes?.data);
      if (cloudinaryRes.data.asset_id) {
        const imageUrl = cloudinaryRes.data.secure_url;
        setIsDisable(false);
        //le.log(imageUrl);
        const BlogData = {
          title: formData.title,
          category: formData.category,
          content: formData.content,
          image: imageUrl,
        };
        //le.log("bdata", BlogData);

        const result = await createBlog(BlogData);

        if (result.data.success === true) {
          setLoading(false);
          //(res);
          toast.success("Product Added Succesfully");
        } else {
          toast.error("Couldnt Create Product");
        }
      }
    } catch (err) {
      toast.error("Upload Image Failed ");
    }
  };
  return (
    <div>
      <div
        className="p-6 text-black
       space-y-6 bg-gray-50 rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold text-gray-900">Create Blog</h2>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter blog title"
            name="title"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="category"
            onChange={handleChange}
            className="w-full p-3 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
          >
            <option>Select Category</option>
            <option>Technology</option>
            <option>Health</option>
            <option>Finance</option>
          </select>
          <input
            type="file"
            name="image"
            className="w-full p-2 border rounded-md cursor-pointer"
            onChange={handleImageChange}
          />

          <textarea
            onChange={handleChange}
            name="content"
            placeholder="Write your blog content here..."
            className="w-full p-3 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          {/* {isDisable ? (
            <>
              <button disabled={true}>Publish Blog</button>
            </>
          ) : ( */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 w-full"
          >
            Publish Blog
          </button>
          {/* )} */}
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateBlogs;
