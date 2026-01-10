import React, { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import {
  FiEdit2,
  FiMail,
  FiPhone,
  FiCalendar,
  FiBriefcase,
  FiLock,
  FiCamera,
} from "react-icons/fi";
import useaxiosPublic from "../../hooks/useAxiosPublic";

const EmployeeProfile = () => {
  const modalRef = useRef();
  const axiosURL = useaxiosPublic();
  const { user, profileUpdate, isLoading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const { data: employeeCompanies = [], isLoading: queryLoading } = useQuery({
    queryKey: ["EmployeeCompanyes", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosURL.get(`/employees?employeeEmail=${user.email}`);
      return res.data;
    },
  });

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  const handleEditProfile = async (data) => {
    setLoading(true);
    try {
      let photoURL = user?.photoURL;

      if (data.file && data.file[0]) {
        const formData = new FormData();
        formData.append("image", data.file[0]);
        const imageBB = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_KEY
          }`,
          formData
        );
        photoURL = imageBB.data.data.url;
      }

      await profileUpdate({
        displayName: data.name,
        photoURL: photoURL,
      });

      await axiosURL.patch(`/users/${user.email}`, {
        name: data.name,
        photoURL: photoURL,
        phoneNumber: data.phoneNumber,
      });

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your changes have been saved successfully.",
        showConfirmButton: false,
        timer: 1500,
      });

      modalRef.current.close();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card */}
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
          {/* Accent Header */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-primary"></div>

          <div className="px-8 pb-10">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row items-end md:items-center -mt-12 mb-8 gap-6">
              <div className="relative group">
                <img
                  className="w-32 h-32 rounded-2xl border-4 border-base-100 object-cover shadow-2xl bg-base-100"
                  src={
                    user?.photoURL ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfV3VLY8mFP3iUzsEtjM1XCAaxjwmXno9PWA&s"
                  }
                  alt="Employee"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FiCamera className="text-white text-xl" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left pt-2 md:pt-12">
                <h1 className="text-3xl font-bold text-neutral arimo">
                  {user?.displayName || "Employee"}
                </h1>
                <p className="text-secondary font-medium">
                  AssetVerse Team Member
                </p>
              </div>

              <div className="flex gap-2 pt-4 md:pt-12">
                <button
                  onClick={() => modalRef.current.showModal()}
                  className="btn btn-primary shadow-lg flex items-center gap-2"
                >
                  <FiEdit2 /> Edit
                </button>
                <button className="btn btn-outline border-base-300 text-neutral">
                  <FiLock /> Password
                </button>
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Details */}
              <div className="space-y-4 p-6 bg-base-200 rounded-2xl border border-base-300">
                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">
                  Personal Information
                </h3>

                <div className="flex items-center gap-4">
                  <div className="text-primary bg-primary/10 p-2 rounded-lg">
                    <FiMail />
                  </div>
                  <div>
                    <p className="text-xs text-secondary">Email Address</p>
                    <p className="text-neutral font-medium">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-primary bg-primary/10 p-2 rounded-lg">
                    <FiCalendar />
                  </div>
                  <div>
                    <p className="text-xs text-secondary">Joined AssetVerse</p>
                    <p className="text-neutral font-medium">
                      {user?.metadata?.creationTime?.slice(0, 16)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Affiliation Details */}
              <div className="space-y-4 p-6 bg-base-200 rounded-2xl border border-base-300">
                <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-4">
                  Work Affiliation
                </h3>

                <div className="flex items-start gap-4">
                  <div className="text-accent bg-accent/10 p-2 rounded-lg mt-1">
                    <FiBriefcase />
                  </div>
                  <div>
                    <p className="text-xs text-secondary mb-2">
                      Current Companies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {queryLoading ? (
                        <span className="loading loading-dots loading-sm"></span>
                      ) : employeeCompanies.length > 0 ? (
                        employeeCompanies.map((company, i) => (
                          <span
                            key={i}
                            className="badge badge-primary badge-outline font-semibold"
                          >
                            {company.companyName}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm italic text-gray-400">
                          Not assigned yet
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Update Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 border border-base-300 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral">Edit Profile</h2>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost">
                  <IoMdClose size={24} />
                </button>
              </form>
            </div>

            <form
              onSubmit={handleSubmit(handleEditProfile)}
              className="space-y-5"
            >
              <div className="form-control">
                <label className="label text-neutral font-semibold">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  defaultValue={user?.displayName}
                  className="input input-bordered bg-base-200 focus:border-primary"
                />
              </div>

              <div className="form-control">
                <label className="label text-neutral font-semibold">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="e.g. +1 234 567 890"
                  className="input input-bordered bg-base-200 focus:border-primary"
                />
              </div>

              <div className="form-control">
                <label className="label text-neutral font-semibold">
                  Update Avatar
                </label>
                <input
                  {...register("file")}
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full bg-base-200"
                />
              </div>

              <button
                disabled={loading}
                className="btn btn-primary w-full mt-4 h-14 text-white font-bold text-lg"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Update Profile"
                )}
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default EmployeeProfile;
