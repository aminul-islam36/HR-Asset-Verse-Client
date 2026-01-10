import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useaxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import axios from "axios";

const EmployeeForm = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useaxiosPublic();

  const { registerUser, profileUpdate, setIsLoading } = useAuth();
  const { register, handleSubmit, watch } = useForm();

  const password = watch("password");

  const handleRegistation = async (data) => {
    setIsLoading(true);

    try {
      // 🔹 Password match validation
      if (data.password !== data.confirmPassword) {
        toast.error("Password doesn't match");
        return;
      }

      const name = `${data.fname} ${data.lname}`;

      const imageFile = data.file[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      const photo = imageRes.data.data.url;

      // 🔹 Create auth user
      await registerUser(data.email, data.password);

      // 🔹 Prepare DB user (NO password)
      const newUser = {
        name,
        photoURL: photo,
        email: data.email,
        dateOfBirth: data.date,
        role: "employee",
        createdAt: new Date(),
      };

      // 🔹 Save to database
      const res = await axiosPublic.post("/users", newUser);

      if (res.data.insertedId) {
        await profileUpdate({
          displayName: name,
          photoURL: photo,
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Registration successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location.state || "/");
      }
    } catch (err) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password must be at least 6 characters");
      } else {
        toast.error("Registration failed. Try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistation)} className="space-y-3">
        {/* 🔹 First & Last Name */}
        <div className="md:flex gap-2">
          <div className="w-full">
            <label className="label">First Name</label>
            <input
              {...register("fname", { required: true })}
              type="text"
              className="input w-full"
              placeholder="First Name"
            />
          </div>

          <div className="w-full">
            <label className="label">Last Name</label>
            <input
              {...register("lname", { required: true })}
              type="text"
              className="input w-full"
              placeholder="Last Name"
            />
          </div>
        </div>

        {/* 🔹 Email */}
        <div>
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input w-full"
            placeholder="Your Email"
          />
        </div>

        {/* 🔹 Password & Confirm Password */}
        <div className="md:flex gap-2">
          <div className="relative w-full">
            <label className="label">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type={show ? "text" : "password"}
              className="input w-full"
              placeholder="Password"
            />
            <span
              onClick={() => setShow(!show)}
              className="absolute right-6 top-2/5 translate-y-1/2 cursor-pointer"
            >
              {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>

          <div className="relative w-full">
            <label className="label">Confirm Password</label>
            <input
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={show2 ? "text" : "password"}
              className="input w-full"
              placeholder="Confirm Password"
            />
            <span
              onClick={() => setShow2(!show2)}
              className="absolute right-6 top-2/5 translate-y-1/2 cursor-pointer"
            >
              {show2 ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>
        </div>

        {/* 🔹 Date of Birth */}
        <div className="md:flex gap-2">
          <div className="flex-1">
            {" "}
            <label className="label">Date Of Birth</label>
            <input
              {...register("date", { required: true })}
              type="date"
              className="input w-full"
            />
          </div>
          <div className="flex-1">
            <label className="label">Profile Photo</label>
            <input
              {...register("file")}
              type="file"
              required
              className="file-input w-full"
            />
          </div>
        </div>

        {/* 🔹 Terms & Conditions */}
        <label for="id" className="label">
          <input
            {...register("terms", { required: true })}
            type="checkbox"
            id="id"
            className="checkbox checkbox-sm"
          />
          <p className="text-sm">
            I agree to the{" "}
            <span className="text-primary underline cursor-pointer">
              Terms & Conditions
            </span>
          </p>
        </label>

        {/* 🔹 Submit */}
        <button className="custom-button w-full">Register as Employee</button>
      </form>

      <div className="divider">Or</div>

      {/* Google */}
      <button className="btn w-full bg-white text-black border-[#e5e5e5]">
        Login with Google
      </button>
    </div>
  );
};

export default EmployeeForm;
