import React, { useState } from "react";
import Task from "../../Components/Task/Task";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./AppStyle.sass";
import Input from "../../Components/Input/Input";
import AdminModal from "../../Components/AdminModel/AdminModal";

const App = () => {
    const [isOpen, setIsOpen] = useState(false);
    const SchemaForm = Yup.object().shape({
        description: Yup.string().max(300, "Максимум символов 300").required("Обязательное поле"),
        name: Yup.string().required("Обязательное поле"),
        email: Yup.string().email("Введите корректную почту").required("Обязательное поле"),
    });

    const openModal = () => {
        document.body.classList.add("hidden");
        setIsOpen(true);
    };

    return (
        <>
            <section className="tasks">
                <div className="container">
                    <h1 className="tasks__title">Наши задачи</h1>
                    <div className="tasks__itemWrapper">
                        <Task
                            name="какой-то"
                            email="какой-то"
                            status="какой-то"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
                        />
                        <Task
                            name="какой-то"
                            email="какой-то"
                            status="какой-то"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
                        />
                        <Task
                            name="какой-то"
                            email="какой-то"
                            status="какой-то"
                            description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged"
                        />
                    </div>
                    <Formik
                        initialValues={{ email: "", name: "", description: "" }}
                        validationSchema={SchemaForm}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({ values, errors }) => (
                            <Form className="tasks__form form">
                                <div className="form__wrapper">
                                    <Input name="Имя" type="text" inputName="name" error={errors.name} />
                                    <Input name="email" type="text" inputName="email" error={errors.email} />
                                </div>
                                <Input name="Задача" component="textarea" inputName="description" error={errors.description} />
                                <button type="submit" className="form__button" disabled={errors.name || errors.email || errors.description}>
                                    Отправить
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <button className="tasks__adminBtn" onClick={openModal}>
                        Вы админ?
                    </button>
                </div>
                {isOpen && <AdminModal open={setIsOpen} />}
            </section>
        </>
    );
};

export default App;
