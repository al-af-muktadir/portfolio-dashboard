/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetSingleBlogsQuery,
  useUpdateBlogsMutation,
} from "@/redux/apis/blogApi";
import axios from "axios";

import React, { useState } from "react";
import { toast, Toaster } from "sonner";

const UpdateBlogs = ({ id }: { id: string | number }) => {
  //.log(id);

  const [loading, setLoading] = useState(false);
  // const [createBlog, { data }] = useCreateBlogsMutation();
  const { data, isLoading } = useGetSingleBlogsQuery(id);
  const [updateblog] = useUpdateBlogsMutation();
  //.log(data);

  type FDataB = {
    title: string;
    content: string;
    image: string | null | File;
    category: string;
  };
  const [formData, setFormData] = useState<FDataB>({
    title: "",
    content: "",
    image: null,
    category: "",
  });
  const title = formData.title ? formData.title : data?.data[0]?.title;
  const category = formData.category
    ? formData.category
    : data?.data[0]?.category;
  const content = formData.content ? formData.content : data?.data[0]?.content;
  // //("sdad", category, content);
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //.log("form onsubimt", formData);
    setLoading(true);
    if (!formData.image) {
      alert("Please Upload an image");
    }
    const imageData = new FormData();
    //.log(formData.image);
    imageData.append("file", formData?.image as File);
    imageData.append("upload_preset", "cloudy");
    imageData.append("cloud_name", "drbmetoqj");

    try {
      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/drbmetoqj/image/upload`,
        imageData
      );

      //(cloudinaryRes?.data);
      if (cloudinaryRes.data.asset_id) {
        const imageUrl = cloudinaryRes.data.secure_url;
        const BlogData = {
          title: title,
          category: category,
          content: content,
          image: imageUrl,
        };
        //("bdata", BlogData);

        const result = await updateblog({ id, blogs: BlogData });
        //("after update", result);
        // //.log(result);
        //.log(result.data);
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
    <div className="text-black">
      {" "}
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <form className="text-black" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              type="text"
              defaultValue={data?.data[0]?.title}
              placeholder="Enter blog title"
              name="title"
              className="w-full text-black p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="category"
              onChange={handleChange}
              defaultValue={data?.data[0]?.category}
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
            {/* {imageUrl && (
    <img src={imageUrl} alt="Uploaded" className="w-40 h-40 mt-4 rounded-md shadow-md" />
    )} */}
            <textarea
              onChange={handleChange}
              name="content"
              defaultValue={data?.data[0]?.content}
              placeholder="Write your blog content here..."
              className="w-full p-3 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 w-full"
            >
              Update Blog
            </button>
          </form>
        </>
      )}
      <Toaster />
    </div>
  );
};

export default UpdateBlogs;
