/* eslint-disable @typescript-eslint/no-explicit-any */
// import MaintainProjects from "@/Components/ManageProjects/MaintainProjects";
import UpdateProjects from "@/components/ManageProjects/UpdateProjects";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const pid = await params.updatepid;
  console.log(pid);

  return (
    <div>
      <UpdateProjects id={pid} />
    </div>
  );
};

export default page;
