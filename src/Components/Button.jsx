import React from "react";
import { Link } from "react-router";
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "./Loading";

const Button = () => {
  const { user, logOutUser, isLoading } = useAuth();
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Log Out successfull",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <StyledWrapper>
      {isLoading ? (
        <Loading />
      ) : user ? (
        <div className="dropdown dropdown-center">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-30 p-2 shadow"
          >
            <li>
              <Link to="/hrProfile">Profile</Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Logout</a>
            </li>
          </ul>
        </div>
      ) : (
        <button data-label="Register" className="rainbow-hover">
          <Link to="/auth" className="sp">
            Register
          </Link>
        </button>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .rainbow-hover {
    font-size: 16px;
    font-weight: 700;
    color: #ff7576;
    background-color: #2b3044;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 12px 24px;
    position: relative;
    line-height: 24px;
    border-radius: 9px;
    box-shadow: 0px 1px 2px #2b3044, 0px 4px 16px #2b3044;
    transform-style: preserve-3d;
    transform: scale(var(--s, 1)) perspective(600px) rotateX(var(--rx, 0deg))
      rotateY(var(--ry, 0deg));
    perspective: 600px;
    transition: transform 0.1s;
  }

  .sp {
    background: linear-gradient(
      90deg,
      #866ee7,
      #ea60da,
      #ed8f57,
      #fbd41d,
      #2cca91
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    display: block;
  }

  .rainbow-hover:active {
    transition: 0.3s;
    transform: scale(0.93);
  }
`;

export default Button;
