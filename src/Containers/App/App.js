import React, { useEffect, useState } from "react";
import Task from "../../Components/Task/Task";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "./AppStyle.sass";
import Input from "../../Components/Input/Input";
import AdminModal from "../../Components/AdminModel/AdminModal";
import { useDispatch, useSelector } from "react-redux";
import { AppAddTask, AppGetTasks, AppSetToken } from "../../Redux/AppReducer";
import arrow from "../../images/arrowDown.svg";

const App = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.AppReducer.tasks);
    const taskError = useSelector((state) => state.AppReducer.errorsAddForm);
    const isFetching = useSelector((state) => state.AppReducer.isFetching);
    const token = useSelector((state) => state.AppReducer.token);
    const allTaskCount = useSelector((state) => state.AppReducer.allTaskCount);
    const [isOpen, setIsOpen] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [sort, setSort] = useState({
        field: "id",
        direction: "asc",
    });
    let countPages = null;
    let pages = null;
    let arrayNum = [];

    const SchemaForm = Yup.object().shape({
        description: Yup.string().max(300, "Максимум символов 300").required("Обязательное поле"),
        name: Yup.string().required("Обязательное поле"),
        email: Yup.string().email("Введите корректную почту").required("Обязательное поле"),
    });

    const openModal = () => {
        document.body.classList.add("hidden");
        setIsOpen(true);
    };

    const changeSort = (field) => {
        if (sort.field !== field) setSort({ ...sort, field: field, direction: "asc" });
        else if (sort.field === field && sort.direction === "asc") setSort({ ...sort, direction: "desc" });
        else if (sort.field === field && sort.direction === "desc") setSort({ ...sort, direction: "asc", field: "id" });
    };

    const addTask = ({ email, name, description }) => {
        dispatch(AppAddTask(name, email, description));
        // dispatch(AppGetTasks(sort.field, sort.direction, pageNum));
    };

    if (allTaskCount) {
        countPages = Math.ceil(allTaskCount / 3);
        for (let i = 1; i <= countPages; i++) arrayNum.push(i);
        pages = arrayNum.map((el) => (
            <button key={el} className={`tasks__pageButton ${pageNum === el && "tasks__pageButton--active"}`} onClick={() => setPageNum(el)}>
                {el}
            </button>
        ));
    }

    useEffect(() => {
        dispatch(AppGetTasks(sort.field, sort.direction, pageNum));
    }, [sort, pageNum]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) dispatch(AppSetToken(token));
    }, []);

    return (
        <>
            <section className="tasks">
                <div className="container">
                    <h1 className="tasks__title">Наши задачи</h1>
                    <div className="tasks__itemWrapper">
                        {!isFetching && tasks && tasks.length > 0 && (
                            <div className="tasks__sortWrapper">
                                <span className="tasks__sortText">Сортировать по:</span>
                                <button className={`tasks__sortButton ${sort.field === "username" && "tasks__sortButton--active"}`} onClick={() => changeSort("username")}>
                                    Имени
                                    <img
                                        src={arrow}
                                        alt="Стрелка вниз"
                                        className={`tasks__sortArrow ${sort.field === "username" && sort.direction === "desc" && "tasks__sortArrow--up"}`}
                                    />
                                </button>
                                <button className={`tasks__sortButton ${sort.field === "email" && "tasks__sortButton--active"}`} onClick={() => changeSort("email")}>
                                    Почте
                                    <img
                                        src={arrow}
                                        alt="Стрелка вниз"
                                        className={`tasks__sortArrow ${sort.field === "email" && sort.direction === "desc" && "tasks__sortArrow--up"}`}
                                    />
                                </button>
                                <button className={`tasks__sortButton ${sort.field === "status" && "tasks__sortButton--active"}`} onClick={() => changeSort("status")}>
                                    Статусу
                                    <img
                                        src={arrow}
                                        alt="Стрелка вниз"
                                        className={`tasks__sortArrow ${sort.field === "status" && sort.direction === "desc" && "tasks__sortArrow--up"}`}
                                    />
                                </button>
                            </div>
                        )}

                        {!isFetching && tasks && tasks.length > 0 ? (
                            tasks.map((el) => <Task key={el.id} id={el.id} name={el.username} email={el.email} status={el.status} description={el.text} />)
                        ) : isFetching ? (
                            <span className="tasks__empty">Загрузка...</span>
                        ) : (
                            <span className="tasks__empty">Пусто</span>
                        )}
                        {!isFetching && tasks && tasks.length > 0 && <div className="tasks__pagesWrapper">{pages}</div>}
                    </div>
                    <Formik
                        initialValues={{ email: "", name: "", description: "" }}
                        validationSchema={SchemaForm}
                        onSubmit={(values, { resetForm }) => {
                            addTask(values);
                            resetForm();
                        }}
                    >
                        {({ values, errors }) => (
                            <Form className="tasks__form form">
                                <div className="form__wrapper">
                                    <Input name="Имя" type="text" inputName="name" error={errors.name || taskError.username} />
                                    <Input name="email" type="text" inputName="email" error={errors.email || taskError.email} />
                                </div>
                                <Input name="Задача" component="textarea" inputName="description" error={errors.description || taskError.text} />
                                <button type="submit" className="form__button" disabled={errors.name || errors.email || errors.description || isFetching}>
                                    Отправить
                                </button>
                            </Form>
                        )}
                    </Formik>
                    {!token && (
                        <button className="tasks__adminBtn" onClick={openModal}>
                            Вы админ?
                        </button>
                    )}
                </div>
                {!token && isOpen && <AdminModal open={setIsOpen} />}
            </section>
        </>
    );
};

export default App;
