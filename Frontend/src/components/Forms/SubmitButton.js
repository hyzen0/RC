import React from "react";

const SubmitButton = props => {
  const { buttonName, disabled } = props;
  return (
    <div className="text-center">
      <button
        type="submit"
        className="btn buttons px-3"
        style={{ width: "10em" }}
        disabled={disabled}
      >
        {buttonName}
      </button>
    </div>
  );
};

export default SubmitButton;
