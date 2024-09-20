import httpService from "./../services/axios";
export const networkLogin = (data) => httpService.post("/signin", data);
