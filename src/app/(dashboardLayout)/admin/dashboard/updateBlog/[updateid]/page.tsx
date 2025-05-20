/* eslint-disable @typescript-eslint/no-explicit-any */

import UpdateBlogs from "@/components/ManageBlogs/UpdateBlogs";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const updateId = await params.updateId;
  return (
    <div>
      <UpdateBlogs id={updateId} />
    </div>
  );
};

export default page;
