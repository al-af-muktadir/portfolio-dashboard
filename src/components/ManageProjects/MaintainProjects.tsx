/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteProjectsMutation,
  useGetProjectsQuery,
} from "@/redux/apis/ProjectApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { toast, Toaster } from "sonner";

const MaintainProjects = () => {
  const { data } = useGetProjectsQuery(undefined, {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  //(data, "itsproject");

  const [deleteProject] = useDeleteProjectsMutation();
  const handleDelete = async (id: string) => {
    const res = await deleteProject(id);
    //le.log(res);
    if (res.data.success === true) {
      toast.success("Data Deleted Succesfully");
    } else {
      toast.error("Something Went Wrong");
    }
  };
  return (
    <div className=" min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-10 tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Project Management
      </h2>

      <div className="grid ml-14 mt-8 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {data?.data?.map((project: any) => (
          <div
            key={project._id}
            className="relative bg-opacity-20 backdrop-blur-lg bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Image
              src={project.image}
              alt={project.name}
              width={400}
              height={400}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />

            <div className="mt-4">
              <h3 className="text-2xl font-bold text-gray-100">
                {project.title}
              </h3>
              <p className="text-blue-400 text-sm mt-1">{project.category}</p>
              <p className="text-gray-300 text-sm mt-2 line-clamp-2">
                {project.content}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 flex space-x-2">
              {/* Edit Button */}
              <Link href={`/dashboard/updateProject/${project._id}`}>
                {" "}
                <button className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-all duration-300 text-white shadow-md hover:shadow-lg">
                  <BiPencil size={20} />
                </button>
              </Link>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(project._id)}
                className="p-2 rounded-full bg-red-500 hover:bg-red-600 transition-all duration-300 text-white shadow-md hover:shadow-lg"
              >
                <BiTrash size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default MaintainProjects;
