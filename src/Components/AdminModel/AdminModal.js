import { Form, Formik } from "formik";
import React from "react";
import Input from "../Input/Input";
import * as Yup from "yup";
import "./AdminModalStyle.sass";
import { useDispatch, useSelector } from "react-redux";
import { AppLogin } from "../../Redux/AppReducer";

const AdminModal = ({ open }) => {
    const dispatch = useDispatch();
    const errorlogin = useSelector((state) => state.AppReducer.errorsLogin);
    const isFetching = useSelector((state) => state.AppReducer.isFetching);
    const SchemaLogin = Yup.object().shape({
        login: Yup.string().required("Обязательное поле"),
        password: Yup.string().required("Обязательное поле"),
    });

    const login = ({ login, password }) => dispatch(AppLogin(login, password));

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
                        initialValues={{ login: "", password: "" }}
                        validationSchema={SchemaLogin}
                        onSubmit={(values, { resetForm }) => {
                            login(values);
                            resetForm();
                        }}
                    >
                        {({ values, errors }) => (
                            <Form className="form">
                                <Input name="Логин" type="text" inputName="login" error={errors.login || errorlogin.username} />
                                <Input name="Пароль" type="password" inputName="password" error={errors.password || errorlogin.password} />
                                <button type="submit" className="form__button" disabled={errors.login || errors.password || isFetching}>
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
