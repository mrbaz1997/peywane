import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Toast from "../../components/common/Toast";
import useToast from "../../hooks/useToast";
import { networkSignIn } from "../../network";
import Input from "./../../components/common/Input";
import PasswordInput from "./../../components/common/PasswordInput";

const Login = () => {
  const navigate = useNavigate();
  const { state: pageState } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { content, isShow, type, showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const res = await networkSignIn(formData);
      const token = res.data.token || res.headers["Authorization"];
      console.log("token:", token);

      if (token) {
        localStorage.setItem("jwtToken", token);

        showToast({
          content: <p>بەخێر بێن </p>,
          type: "success",
          onClose: () => navigate("/word"),
        });
      } else {
        console.error("Token not found in response");
        showToast({
          content: <p>بەداخەوە ناتوانیت بێیتە ژوورەوە</p>,
          type: "error",
        });
        // setError("apiError", { message: "ناتوانرێت بچێتە ژوورەوە." });
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed with status:", error.response.status);
        console.error("Response data:", error.response.data);
        /*setError("apiError", {
          message: "ئیمەیڵ یان تێپەڕوشە هەڵەیە.",
        });*/
        showToast({
          content: <p>ئیمەیڵ یان تێپەڕوشە هەڵەیە</p>,
          type: "error",
        });
      } else {
        if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("An error occurred:", error.message);
          // setError("apiError", { message: "هەڵە ڕوویدا، تکایە دوبارە هەوڵ بدە." });
        }
        showToast({
          content: <p>بەداخەوە هەڵە ڕوویدا، تکایە دوبارە هەوڵ بدە</p>,
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isShowLoading = pageState !== "idle" || isLoading;

  return (
    <motion.div
      initial={{ transform: "translateX(100%)" }}
      animate={{ transform: "translateX(0)" }}
      className="hero bg-base-200 min-h-screen"
    >
      <div className="hero-content flex-col lg:flex-row-reverse max-w-[100vw]">
        <div className="text-center lg:text-right">
          <h1 className="text-5xl font-bold text-balance leading-[60px] mb-20">
            چوونەژوور
          </h1>
          {/*<div className="mx-auto">*/}
          {/*  <span>نێونووسینتان نەکردووە؟ </span>*/}
          {/*  <Link to={"/signup"} className="link link-primary no-underline">*/}
          {/*    نێونووسین*/}
          {/*  </Link>*/}
          {/*</div>*/}
          {/* <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p> */}
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <Input
              type="email"
              helperText={errors?.email?.message}
              label={"ئیمەیل"}
              register={register("email", {
                required: {
                  value: true,
                  message: "نووسینی ئیمەیل پێویستە !",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "ئیمەیلەکەت هەڵەیە !",
                },
              })}
              placeholder="ئیمەیلەکەت بنووسە"
            />
            <PasswordInput
              helperText={errors?.password_hash?.message}
              label={"وشەی نهێنی"}
              register={register("password_hash", {
                required: {
                  value: true,
                  message: "تێپەڕوشە پێویستە!",
                },
                min: {
                  value: 4,
                  message: "تێپەڕوشەکە نابێ کەمتر لە ٤ پیت بێ",
                },
              })}
              placeholder="تێپەڕوشەکەت بنووسە"
            />
            <div className="form-control mt-6">
              <button
                type="submit"
                className={twMerge(
                  "btn btn-primary",
                  isShowLoading ? "btn-disabled" : ""
                )}
                disabled={isShowLoading}
              >
                {isShowLoading ? (
                  <span className="loading loading-dots loading-md" />
                ) : (
                  <span className="contents">چوونەژوور</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast content={content} isShow={isShow} type={type} />
    </motion.div>
  );
};

export default Login;
