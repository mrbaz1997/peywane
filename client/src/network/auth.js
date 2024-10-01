import httpService from "./../services/axios";
export const networkLogin = (data) => httpService.post("/auth/signin", data, {
    headers: {
        "Content-Type": "application/json",
    },
});
export  const  getWords = (data) => httpService.get("words/get-words", data);
