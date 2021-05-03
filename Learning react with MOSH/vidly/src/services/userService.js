import http from "./httpService";
import { apiEndpoint } from "../config.json";

export function register(user) {
    return http.post(apiEndpoint.users,{
        email:user.username,
        password:user.password,
        name:user.name,
    })
}