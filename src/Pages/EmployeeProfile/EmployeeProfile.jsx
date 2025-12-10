import React from "react";
import useAuth from "../../hooks/useAuth";

const EmployeeProfile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto my-10">
      <div className="card bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-32 rounded-full border">
              <img
                src={
                  user?.photoURL ||
                  "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                }
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-4">
            {user?.displayName || "No Name Found"}
          </h2>
          <p className="text-gray-500 mt-1">{user?.email}</p>
          <p className="text-gray-500">
            Joined: {user?.metadata?.creationTime?.slice(0, 16)}
          </p>
          <div className="card-actions mt-5 flex gap-3">
            <button className="btn btn-neutral">Edit Profile</button>
            <button className="btn btn-outline">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
