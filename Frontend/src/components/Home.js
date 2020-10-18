import React from "react";
import { Container, Row, Col } from "reactstrap";

const Home = () => {
  return (
    <Container>
      <Row className="" style={{ minHeight: "80vh" }}>
        <Col md={6} className="my-auto text-center order-2 order-md-1 pt-sm-5">
          <h2>Welcome To Right Companion</h2>
          <a
            href="/about"
            className="btn buttons mt-2 shadow font-weight-bold"
            style={{ width: "12em" }}
          >
            LOGIN
          </a>
        </Col>
        <Col md={6} className="order-1 order-md-2 my-auto">
          <img
            src={require("../assets/main.svg")}
            alt="booksection"
            className="img-fluid"
          />
        </Col>
      </Row>
    </Container>
    // <div className="container">
    //   <div className="row justify-content-center align-items-center">
    //     <div className="col-md-6 mt-3 mb-3 order-2 order-sm-1">
    //       <h2>Welcome To Right Companion</h2>
    //       <div className="text-center mb-3">
    //         <a
    //           href="#"
    //           alt="google"
    //           className="btn shadow py-2 px-4 mt-3 buttons"
    //         >
    //           LOGIN
    //         </a>
    //       </div>
    //     </div>
    //     <div className="col-md-6 mt-3 order-1 order-sm-2">
    //       <img
    //         src={require("../assets/main.svg")}
    //         alt="booksection"
    //         className="img-fluid py-5 px-3"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
