import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import useaxiosPublic from "../hooks/useAxiosPublic";

const EmployeeForm = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useaxiosPublic();
  const { registerUser, updateUserProfile } = useAuth();
  const { register, handleSubmit } = useForm();

  const handleRegistation = (data) => {
    const name = data.name;
    console.log(data);
    const newUser = {
      name,
      email: data.email,
      password: data.password,
      dateOfBirth: data.date,
      role: "employee",
      createdAt: new Date().toLocaleString(),
    };
    registerUser(data.email, data.password).then(() => {
      axiosPublic.post("/users", newUser).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          updateUserProfile({
            displayName: name,
          })
            .then(() => {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Registation successfull",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => console.log(err));
        }
        navigate(location.state || "/");
      });
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistation)} className="space-y-3">
        <div>
          <label className="label">Full Name</label>
          <input
            {...register("name")}
            type="text"
            className="input w-full"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="label">Email</label>
          <input
            {...register("email")}
            type="email"
            required
            className="input w-full"
            placeholder="Your email"
          />
        </div>

        <div className="relative">
          <label className="label">Password</label>
          <input
            {...register("password")}
            type={show ? "text" : "password"}
            className="input w-full"
            required
            placeholder="Password"
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute top-2/5 translate-y-1/2 right-6 cursor-pointer z-10"
          >
            {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </span>
        </div>

        <div>
          <label className="label">Date Of Birth</label>
          <input
            {...register("date")}
            type="date"
            required
            className="input w-full"
          />
        </div>

        <button className="custom-button inline-flex" style={{ width: "100%" }}>
          Register as Employee
        </button>
      </form>
      <div className="divider">Or</div>
      {/* Google */}
      <button className="btn w-full bg-white text-black border-[#e5e5e5]">
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default EmployeeForm;
