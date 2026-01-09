import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EmployeeProfile = () => {
  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { user, updateUserProfile, isLoading } = useAuth();
  const [updateUser, setUpdateUser] = useState();
  const { register, handleSubmit } = useForm();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-xl font-semibold">Loading profile...</p>
      </div>
    );
  }
  const { data: EmployeeCompanyes = [] } = useQuery({
    queryKey: ["EmployeeCompanyes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/employees?employeeEmail=${user.email}`
      );
      return res.data;
    },
  });
  const handleOpenModal = () => {
    modalRef.current.showModal();
    setUpdateUser(user);
  };

  const handleEditProfile = async (data) => {
    const imageFile = data.file[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    const imageBB = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );
    await updateUserProfile({
      displayName: data.name,
      photoURL: imageBB.data.data.url,
    });
    // ---- Update Backend MongoDB Profile ----
    await axiosSecure.patch(`/users/${user.email}`, {
      name: data.name,
      photoURL: imageBB.data.data.url,
      phoneNumber: data.phoneNumber,
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Profile Update successfull",
      showConfirmButton: false,
      timer: 1500,
    });

    modalRef.current.close();
    console.log({ name: data.name, image: imageBB.data.data.url });
  };

  return (
    <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto my-10">
      <div className="card bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body items-center text-center">
          <div className="avatar">
            <div className="w-32 rounded-full border">
              <img
                src={
                  user?.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfV3VLY8mFP3iUzsEtjM1XCAaxjwmXno9PWA&s"
                }
              />
            </div>
          </div>

          <h2 className="text-3xl font-bold mt-4">
            {user?.displayName || "No Name Found"}
          </h2>
          <div className="text-gray-500 mt-1">
            <span className="font-bold text-black">Affilieted With :</span>
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                EmployeeCompanyes.map((company, i) => (
                  <span className="badge badge-outline badge-primary" key={i}>
                    {company.companyName}
                  </span>
                ))
              )}
            </div>
          </div>
          <p className="text-gray-500 mt-1">{user?.email}</p>

          <p className="text-gray-500">
            Joined: {user?.metadata?.creationTime?.slice(0, 16)}
          </p>
          <div className="card-actions mt-5 flex gap-3">
            <button
              onClick={() => handleOpenModal(user)}
              className="btn btn-neutral"
            >
              Edit Profile
            </button>
            <button className="btn btn-outline">Change Password</button>
          </div>
        </div>
      </div>
      {/* Update User Profile  */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Update Your Profile
          </h2>
          <form
            onSubmit={handleSubmit(handleEditProfile)}
            className="space-y-4"
          >
            {/* Asset Name */}
            <div>
              <label className="label">Name</label>
              <input
                {...register("name", { required: true })}
                type="text"
                defaultValue={updateUser?.displayName}
                placeholder="Your name..."
                className="input w-full"
              />
            </div>

            {/* Profile Image  */}

            <div>
              <label className="label">Profile Image</label>
              {updateUser?.photoURL && (
                <img src={updateUser?.photoURL} className="w-20 h-20 mb-2" />
              )}
              <input
                {...register("file")}
                type="file"
                required
                className="file-input w-full"
              />
              {/* Phone Number  */}
            </div>
            <div>
              <label className="label">Phone Number</label>

              <input
                {...register("phoneNumber")}
                type="tel"
                placeholder="Your Phone..."
                className="input w-full"
              />
            </div>
            {/* Submit Button */}
            <button className="btn btn-secondary w-full mt-2">
              Update Now
            </button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">
                <IoMdClose />
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default EmployeeProfile;
