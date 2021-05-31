import { Form, Formik } from "formik";
import React from "react";
import Input from "../Input/Input";
import * as Yup from "yup";
import "./AdminModalStyle.sass";

const AdminModal = ({ open }) => {
    const SchemaLogin = Yup.object().shape({
        admin: Yup.string().required("Обязательное поле"),
        password: Yup.string().required("Обязательное поле"),
    });
    const closeModal = () => {
        document.body.classList.remove("hidden");
        open(false);
    };
    return (
        <div className="adminModal">
            <div className="adminModal__wrapper">
                <div className="adminModal__modal">
                    <h2 className="adminModal__title">Войти</h2>
                    <Formik
                        initialValues={{ admin: "", password: "" }}
                        validationSchema={SchemaLogin}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ values, errors }) => (
                            <Form className="form">
                                <Input name="Логин" type="text" inputName="admin" error={errors.admin} />
                                <Input name="Пароль" type="password" inputName="password" error={errors.password} />
                                <button type="submit" className="form__button" disabled={errors.name || errors.email || errors.description}>
                                    Войти
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <button className="adminModal__close" onClick={closeModal}>
                        <div className="adminModal__closeRect"></div>
                        <div className="adminModal__closeRect"></div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminModal;
