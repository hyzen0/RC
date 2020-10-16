import React from "react";

const Card = (props) => {
  const { title, subTitle, buttonText = "Want To Buy", image } = props;
  return (
    <div className="col-md-4 pb-3">
      <div className="card shadow">
        <img
          src={image}
          className="card-img-top"
          width="100"
          height="100"
          alt="..."
        />
        <div className="card-body">
          <h4 className="m-0 pl-0">{title}</h4>
          <p className="text-muted  pt-0">{subTitle}</p>
          <a href="#" className="btn shadow py-2 px-3 mt-3 buttons">
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
