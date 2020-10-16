import React from "react";
import Card from "./cards/Card";

const CardSection = () => {
  return (
    <section style={{ backgroundColor: "#F8F8FF" }}>
      <div className="container">
        <div className="row pb-3 pt-4">
          <div className="col-md-4">
            <img
              src={require("../assets/cards.svg")}
              alt="booksection"
              className="img-fluid py-5 px-3"
            />
          </div>
          <div className="col-md-8 px-3">
            <h2 className="text-center pt-1 pb-4">Discover New Books</h2>
            <div className="row ">
              <Card
                title="English"
                subTitle="Language"
                image={require("../assets/books.svg")}
              />
              <Card
                title="Chemistry"
                subTitle="Science"
                image={require("../assets/chemistry.svg")}
              />
              <Card
                title="Env. Study"
                subTitle="Nature"
                image={require("../assets/env.svg")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardSection;
