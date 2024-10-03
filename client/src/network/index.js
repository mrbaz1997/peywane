import httpService, { httpServiceInterceptor } from "./axios";

export const networkSignIn = (data) =>
  httpService.post("/auth/signin", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const networkSignUp = (data) =>
  httpService.post("/auth/signup", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const networkGetWords = (data) => {
  try {
    const res = httpServiceInterceptor.get("/words/get-words", data);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const networkAnswerWord = (data) =>
  httpServiceInterceptor.post("/words/submit-answer", data);
