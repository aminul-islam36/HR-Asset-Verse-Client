import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import useaxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const HrAdminRegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { registerUser, profileUpdate, setIsLoading } = useAuth();
  const axiosPublic = useaxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit } = useForm();

  const handleRegistation = async (data) => {
    // 🔹 1. Frontend validation (NO loading here)
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // 🔹 2. Upload image to ImgBB
      const imageFile = data.file[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      const logo = imageRes.data.data.url;

      // 🔹 3. Create auth user (Firebase)
      const result = await registerUser(data.email, data.password);

      // 🔹 4. Prepare user object (NO password)
      const name = `${data.fname} ${data.lname}`;
      const newUser = {
        name,
        companyName: data.companyName,
        companyLogo: logo,
        email: data.email,
        dateOfBirth: data.date,
        role: "hr",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
        createdAt: new Date(),
      };

      // 🔹 5. Save user to backend
      const dbRes = await axiosPublic.post("/users", newUser);

      if (dbRes.data.insertedId) {
        // 🔹 6. Update Firebase profile
        await profileUpdate({
          displayName: name,
          photoURL: logo,
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

      // 🔹 7. Auth error handling
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      } else if (err.code === "auth/weak-password") {
        toast.error("Password should be at least 6 characters");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      // 🔹 8. Stop loading ALWAYS
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistation)} className="space-y-3">
        <div className="md:flex gap-2">
          <input
            {...register("fname")}
            className="input w-full"
            placeholder="First Name"
          />
          <input
            {...register("lname")}
            className="input w-full"
            placeholder="Last Name"
          />
        </div>

        <div className="md:flex gap-2">
          <input
            {...register("companyName")}
            required
            className="input w-full"
            placeholder="Company Name"
          />
          <input
            {...register("file")}
            type="file"
            required
            className="file-input w-full"
          />
        </div>

        <input
          {...register("date")}
          type="date"
          required
          className="input w-full"
        />

        <input
          {...register("email")}
          type="email"
          required
          className="input w-full"
          placeholder="Email"
        />

        <div className="md:flex gap-2">
          <div className="relative w-full">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              required
              className="input w-full"
              placeholder="Password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer"
            >
              {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
          </div>

          <div className="relative w-full">
            <input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              required
              className="input w-full"
              placeholder="Confirm Password"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-3 cursor-pointer"
            >
              {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </span>
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

        <button className="custom-button w-full">Register as HR</button>
      </form>
    </div>
  );
};

export default HrAdminRegisterForm;
