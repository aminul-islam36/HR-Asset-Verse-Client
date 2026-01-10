import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FiEdit,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiCalendar,
  FiCamera,
} from "react-icons/fi";
import useaxiosPublic from "../../hooks/useAxiosPublic";

const HrProfile = () => {
  const { user, profileUpdate } = useAuth();
  const modalRef = useRef();
  const axiosURL = useaxiosPublic();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const { data: hrData = {}, refetch } = useQuery({
    queryKey: ["hrData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosURL.get(`/users/${user?.email}`);
      return res.data;
    },
  });

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
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
      modalRef.current.close();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-300">
          {/* Cover Section */}
          <div className="h-32 md:h-48 bg-linear-to-r from-gray-800 to-indigo-500"></div>

          {/* User Info Section */}
          <div className="relative px-6 pb-8">
            <div className="flex flex-col md:flex-row items-center  md:items-center -mt-16 md:-mt-20 mb-6 gap-6">
              <div className="relative group">
                <img
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-base-100 object-cover shadow-lg bg-base-100"
                  src={
                    user?.photoURL ||
                    "https://cdn-icons-png.flaticon.com/512/219/219970.png"
                  }
                  alt="Profile"
                />
                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <FiCamera className="text-white text-2xl" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left pt-2 md:pt-10">
                <h1 className="text-3xl mt-5 font-bold text-neutral">
                  {user?.displayName || "HR Manager"}
                </h1>
                <p className="text-secondary font-medium flex items-center justify-center md:justify-start gap-2">
                  <FiBriefcase /> {hrData?.companyName || "AssetVerse HR"}
                </p>
              </div>

              <div className="pt-2 md:pt-10">
                <button
                  onClick={() => modalRef.current.showModal()}
                  className="btn btn-primary btn-md rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <FiEdit /> Edit Profile
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-6 bg-base-200 rounded-2xl border border-base-300">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <FiMail size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary uppercase tracking-wider font-bold">
                    Email Address
                  </p>
                  <p className="text-neutral font-semibold">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <FiPhone size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary uppercase tracking-wider font-bold">
                    Phone Number
                  </p>
                  <p className="text-neutral font-semibold">
                    {hrData?.phoneNumber || "Not Provided"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <FiCalendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-secondary uppercase tracking-wider font-bold">
                    Member Since
                  </p>
                  <p className="text-neutral font-semibold">
                    {hrData?.createdAt
                      ? new Date(hrData.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Modal */}
        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box bg-base-100 border border-base-300 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-neutral">
                Update Profile
              </h2>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost text-neutral">
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
                  className="input input-bordered w-full bg-base-200"
                />
              </div>

              <div className="form-control">
                <label className="label text-neutral font-semibold">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  defaultValue={hrData?.phoneNumber}
                  className="input input-bordered w-full bg-base-200"
                />
              </div>

              <div className="form-control">
                <label className="label text-neutral font-semibold">
                  Profile Photo
                </label>
                <input
                  {...register("file")}
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full bg-base-200"
                />
              </div>

              <button
                disabled={loading}
                className="btn btn-primary w-full mt-4 text-white font-bold h-14"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default HrProfile;
