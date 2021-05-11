import http from "./httpService";
// import { apiEndpoint } from "../config.json";
const apiEndpoint = "/auth";

export function register(user) {
    return http.post(apiEndpoint,{
        email:user.username,
        password:user.password,
        name:user.name,
    })
}