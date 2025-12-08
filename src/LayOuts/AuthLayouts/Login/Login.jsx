import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Login = () => {
  const [show, setShow] = useState(false);
  const { loginUser, setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogIn = (data) => {
    loginUser(data.email, data.password)
      .then((data) => {
        setUser(data.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registation successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content w-full flex-col">
        <div className="card bg-base-100 w-full max-w-lg shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl">Sign in to your account</h2>
            <form onSubmit={handleSubmit(handleLogIn)}>
              {" "}
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className="input w-full"
                  placeholder="Email"
                />
                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    {...register("password")}
                    type={show ? "text" : "password"}
                    className="input w-full"
                    placeholder="Password"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute top-2/5 translate-y-1/2 right-6 cursor-pointer z-10"
                  >
                    {show ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </span>
                </div>
                <span>Forgot your password?</span>
                <button className="btn btn-secondary mt-4">Sign In</button>
              </fieldset>
            </form>

            <div className="divider">Or</div>
            {/* Google */}
            <button className="btn bg-white text-black border-[#e5e5e5]">
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

            <p>
              Dont have an account?{" "}
              <Link className="text-blue-600" to="/auth">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
