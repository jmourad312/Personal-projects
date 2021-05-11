import http from './httpService';
// import {apiEndpoint} from "../config.json";

const apiEndpoint = "/auth";


export function getGenres() {
    return http.get(apiEndpoint)
}
