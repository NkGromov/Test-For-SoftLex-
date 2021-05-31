import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://uxcandy.com/~shapoval/test-task-backend/v2/",
});

export const API = {
    getAllTasks(field, direction, page) {
        return instance
            .get("", {
                params: {
                    developer: "NikitaGromov",
                    sort_field: field,
                    sort_direction: direction,
                    page: page,
                },
            })
            .then((res) => res.data);
    },
    createTask(username, email, text) {
        console.log(username, email, text);
        let form = new FormData();
        form.append("username", username);
        form.append("email", email);
        form.append("text", text);
        return instance
            .post("create?developer=NikitaGromov", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => res.data);
    },
};
