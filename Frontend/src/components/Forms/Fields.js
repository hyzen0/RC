import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Fields = (props) => {
  const { htmlFor, labels, type, id, name, placeholder } = props;
  return (
    <>
      <label htmlFor={htmlFor} className="mb-0">
        {labels}
      </label>
      <div className="pb-3">
        <Field
          type={type}
          id={id}
          name={name}
          className="form-control"
          placeholder={placeholder}
        />
        <ErrorMessage name={name} component={TextError} />
      </div>
    </>
  );
};

export default Fields;
