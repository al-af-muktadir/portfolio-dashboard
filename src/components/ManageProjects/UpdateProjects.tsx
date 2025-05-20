/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetSingleBlogsQuery,
  useUpdateBlogsMutation,
} from "@/redux/apis/blogApi";
import {
  useGetSingleProjectsQuery,
  useUpdateProjectsMutation,
} from "@/redux/apis/ProjectApi";
import axios from "axios";

import React, { useState } from "react";
import { toast, Toaster } from "sonner";

const UpdateProjects = ({ id }: { id: string | number }) => {
  //.log(id);

  const [loading, setLoading] = useState(false);
  // const [createBlog, { data }] = useCreateBlogsMutation();
  const { data, isLoading } = useGetSingleProjectsQuery(id);
  const [updateProject] = useUpdateProjectsMutation();
  //.log(data);

  type FDataP = {
    name: string;
    description: string;
    image: string | null | File;
  };
  const [formData, setFormData] = useState<FDataP>({
    name: "",
    description: "",
    image: null,
  });
  const title = formData.name ? formData.name : data?.data?.name;
  const category = formData.description
    ? formData.description
    : data?.data?.category;

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

      console.log(cloudinaryRes?.data);
      if (cloudinaryRes.data.asset_id) {
        const imageUrl = cloudinaryRes.data.secure_url;
        const PData = {
          name: title,
          description: category,

          image: imageUrl,
        };
        console.log("bdata", PData);

        const result = await updateProject({ id, project: PData });
        console.log("after update", result);
        // //.log(result);
        //.log(result.data);
        if (result.data.success === true) {
          setLoading(false);
          //(res);
          toast.success("Project Updated Succesfully");
        } else {
          toast.error("Couldnt Update Product");
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
              defaultValue={data?.data.name}
              placeholder="Enter name"
              name="name"
              className="w-full text-black p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

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
              name="description"
              defaultValue={data?.data.description}
              placeholder="Write description here..."
              className="w-full p-3 border rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 w-full"
            >
              Update Project
            </button>
          </form>
        </>
      )}
      <Toaster />
    </div>
  );
};

export default UpdateProjects;
