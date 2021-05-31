import React from "react";
import "./TaskStyle.sass";

const Task = ({ name, email, status, description }) => {
    const statusText =
        status === 0
            ? "задача не выполнена"
            : status === 1
            ? "задача не выполнена, отредактирована админом"
            : status === 10
            ? "задача выполнена"
            : "задача отредактирована админом и выполнена";
    return (
        <div className="tasks__item taskItem">
            <span className="taskItem__text">
                <strong>Имя:</strong> {name}
            </span>
            <span className="taskItem__text">
                <strong>email:</strong> {email}
            </span>
            <span className="taskItem__text">
                <strong>Статус:</strong> {statusText}
            </span>
            <span className="taskItem__text">{description}</span>
        </div>
    );
};

export default Task;
