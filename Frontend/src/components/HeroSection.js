import React from "react";
import { FcGoogle } from "react-icons/fc";

const HeroSection = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 mt-3 mb-3 order-2 order-sm-1">
          <h3 className="text-center">
            Welcome to the Books Section of
            <br /> Right Companion
          </h3>
          <div className="text-center mb-3">
            <a
              href="#"
              alt="google"
              className="btn shadow py-2 px-4 mt-3 buttons"
            >
              <FcGoogle style={{ fontSize: "1.5em" }} /> Login With Google
            </a>
          </div>
        </div>
        <div className="col-md-6 mt-3 order-1 order-sm-2">
          <img
            src={require("../assets/main.svg")}
            alt="booksection"
            className="img-fluid py-5 px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
