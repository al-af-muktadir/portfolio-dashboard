/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useCreateProjectsMutation } from "@/redux/apis/ProjectApi";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
const CreateProjects = () => {
  //   const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [createProjects] = useCreateProjectsMutation();
  const handleTechs = (tech: any) => {
    setSelected(
      selected.includes(tech)
        ? selected.filter((t) => t !== tech)
        : [...selected, tech]
    );
  };
  type Fdata = {
    name: string;
    description: string;
    image: string | null | File;
    link: string;
    additionalImages: File[];
  };
  //(selected);
  const [formData, setFormData] = useState<Fdata>({
    name: "",
    description: "",
    image: null,
    link: "",
    additionalImages: [],
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdditionalImageChange = (e: any) => {
    //.log("inimagehandle", formData);
    setFormData({
      ...formData,
      additionalImages: [...formData.additionalImages, e.target.files[0]],
    });
    //("inhabnlfe", formData.additionalImages);
    //.log("inimagehandleafter", formData);
  };
  const handleImageChange = (e: any) => {
    //.log("inimagehandle", formData);
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const technologies = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Next.js",
    "MongoDB",
    "Express",
    "Node.js",
    "Redux",
    "postgres:prisma",
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // setLoading(true);
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
      const additionalURL = await Promise.all(
        formData.additionalImages.map(async (image: File) => {
          const additionalImageData = new FormData();
          additionalImageData.append("file", image);
          additionalImageData.append("upload_preset", "cloudy");
          additionalImageData.append("cloud_name", "drbmetoqj");

          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/drbmetoqj/image/upload`,
            additionalImageData
          );
          //("res", res.data.secure_url);
          return res.data.secure_url;
        })
      );
      //(cloudinaryRes?.data.asset_id && additionalURL.length > 0);
      if (cloudinaryRes.data.asset_id) {
        const imageUrl = cloudinaryRes.data.secure_url;

        //(imageUrl);
        const ProjectsData = {
          name: formData.name,
          description: formData.description,
          link: formData.link,
          image: imageUrl,
          additionalImages: additionalURL,
          techs: selected,
        };
        //("pdata", ProjectsData);

        const result = await createProjects(ProjectsData);
        //.log(result);
        if (result.data.success === true) {
          //(res);
          toast.success("Projects Added Succesfully");
        } else {
          toast.error("Couldnt Create Projects");
        }
      }
    } catch (err) {
      toast.error("Upload Image Failed ");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Create New Project
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Project Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter project name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="link"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Project Link:
              </label>
              <input
                type="text"
                id="link"
                name="link"
                value={formData.link}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter live link"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Main Image:
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div>
              <label className="text-black" htmlFor="">
                Additional Image 1 :
              </label>
              <input
                type="file"
                name="image1"
                onChange={handleAdditionalImageChange}
                className="w-full text-black p-2 border rounded-md cursor-pointer"
              />
              <label className="text-black" htmlFor="">
                Additional Image 2 :
              </label>
              <input
                type="file"
                name="image2"
                onChange={handleAdditionalImageChange}
                className="w-full p-2 text-black border rounded-md cursor-pointer"
              />

              <div id="additional-images-container">
                {formData.additionalImages.map((_, index) => (
                  <input
                    key={index}
                    type="file"
                    className="w-full p-2  rounded-md cursor-pointer mt-2 shadow appearance-none border text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleAdditionalImageChange}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Technologies Used:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {technologies.map((tech) => (
                  <div key={tech} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`tech-${tech}`}
                      value={tech}
                      checked={selected.includes(tech)}
                      onChange={() => handleTechs(tech)}
                      className="mr-2 form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`tech-${tech}`}
                      className="text-gray-700 text-sm"
                    >
                      {tech}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                placeholder="Enter project description"
                required
              ></textarea>
            </div>
            <div className="flex items-center justify-end">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default CreateProjects;
