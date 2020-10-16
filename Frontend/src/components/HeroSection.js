import React from "react";

const HeroSection = () => {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 mt-3 justify-content-center mb-3 order-2 order-sm-1">
          <h2>Welcome to Right Companion</h2>
          <div className="text-center mb-3">
            <a
              href="#"
              alt="google"
              className="btn shadow py-2 px-4 mt-3 buttons"
            >
              Login
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
