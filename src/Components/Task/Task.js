import React from "react";
import "./TaskStyle.sass";

const Task = ({ name, email, status, description }) => {
    return (
        <div className="tasks__item taskItem">
            <span className="taskItem__text">
                <strong>Имя:</strong> {name}
            </span>
            <span className="taskItem__text">
                <strong>email:</strong> {email}
            </span>
            <span className="taskItem__text">
                <strong>Статус:</strong> {status}
            </span>
            <span className="taskItem__text">{description}</span>
        </div>
    );
};

export default Task;
