import { Field } from "formik";
import React from "react";
import "./InputStyle.sass";

const Input = ({ name, type, component, inputName, error }) => {
    return (
        <div className="form__inputInner inputItem">
            <span className="inputItem__name">{name}</span>
            <Field
                type={type}
                name={inputName}
                component={component || "input"}
                className={`inputItem__input ${component === "textarea" && "inputItem__inputArea"} ${error && "inputItem__input--error"}`}
            />
            {error && <span className="inputItem__inputError">{error}</span>}
        </div>
    );
};

export default Input;
