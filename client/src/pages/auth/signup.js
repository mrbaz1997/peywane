import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useNavigation } from "react-router";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Input from "../../components/common/Input";
import Toast from "../../components/common/Toast";
import useToast from "../../hooks/useToast";
import { networkSignUp } from "../../network";

const SignUp = () => {
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
    console.log(formData);
    try {
      const res = await networkSignUp(formData);
      console.log("res.status:", res.status);

      if (res.status === 200) {
        const { password_hash, ...data } = res.data;
        localStorage.setItem("user", JSON.stringify(data));
      }

      showToast({
        content: <p>به خێر بێی بۆ پەیوانە</p>,
        duration: 3000,
        type: "success",
        onClose: () => navigate("/word"),
      });
    } catch (error) {
      console.error(error);
      showToast({
        content: <p>بە داخەوە سەرکەوتوو نەبوو</p>,
        duration: 3000,
        type: "error",
      });
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
          <div className="mx-auto">
            <span>پێشتر نێونوسینتان کردوە؟ </span>
            <Link to={"/signin"} className="link link-primary no-underline">
              چوونەژوور
            </Link>
          </div>
          {/* <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                a id nisi.
              </p> */}
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <Input
              label={"ناوی بەکارهێنەر"}
              placeholder={"ناوی بەکارهێنەری خۆت بنووسە"}
              type="text"
              register={register("username", {
                required: {
                  value: true,
                  message: "نووسینی ناوی بەکارهێنەر پێویستە !",
                },
                min: {
                  value: 3,
                  message: "ناوی بەکارهێنەر نابێ کەمتر لە 3 پیت بێ",
                },
              })}
              helperText={errors?.username?.message}
            />
            <Input
              label={"ئیمەیل "}
              placeholder={"ئیمەیلەکەت بنووسە"}
              type="email"
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
              helperText={errors?.email?.message}
            />
            <Input
              label={"تێپەڕوشە "}
              placeholder={"تێپەڕوشەکەت بنووسە"}
              type="password"
              register={register("password_hash", {
                required: {
                  value: true,
                  message: "تێپەڕوشە پێویستە!",
                },
              })}
              helperText={errors?.password_hash?.message}
            />
            <button
              type="submit"
              className={twMerge(
                "btn btn-primary mt-7",
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
          </form>
        </div>
      </div>
      <Toast content={content} isShow={isShow} type={type} />
    </motion.div>
  );
};

export default SignUp;
