import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { networkLogin } from "../../network/auth";
import { useNavigate, useNavigation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Login = () => {
  const navigate = useNavigate();
  const { state: pageState } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await networkLogin( formData);
      const token = response.data.token || response.headers["Authorization"];

      if (token) {
        localStorage.setItem("jwtToken", token); // Save token in localStorage
        await
        navigate("/word/سەرما"); // Redirect to home page
      } else {
        console.error("Token not found in response");
       // setError("apiError", { message: "ناتوانرێت بچێتە ژوورەوە." });
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed with status:", error.response.status);
        console.error("Response data:", error.response.data);
        /*setError("apiError", {
          message: "ئیمەیڵ یان وشەی نهێنی هەڵەیە.",
        });*/
      } else if (error.request) {
        console.error("No response received:", error.request);
      }else {
        console.error("An error occurred:", error.message);
        // setError("apiError", { message: "هەڵە ڕوویدا، تکایە دوبارە هەوڵ بدە." });
      }
    } finally {
      setIsLoading(false); // Always reset the loading state after the try/catch
    }
  };

  const isShowLoading = pageState !== "idle" || isLoading;

  return (
    <motion.div
      initial={{ transform: "translateX(100%)" }}
      animate={{ transform: "translateX(0)" }}
      className="hero bg-base-200 min-h-screen"
    >
      <div className="hero-content flex-col lg:flex-row-reverse max-w-3xl">
        <div className="text-center lg:text-right">
          <h1 className="text-5xl font-bold text-balance leading-[60px]">
            چوونەژوور
          </h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label font-harmattan">
                <span className="label-text">ئیمەیل</span>
              </label>
              <input
                type="email"
                placeholder="ئیمەیلەکەت بنووسە"
                className="input input-bordered font-harmattan"
                {...register("email", {
                  required: { value: true, message: "نووسینی ئیمەیل پێویستە !" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "ئیمەیلەکەت هەڵەیە !",
                  },
                })}
              />
              <AnimatePresence>
                {!!errors?.email?.message && (
                  <motion.label
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    className="label-text text-error mr-1 px-2 font-harmattan"
                  >
                    {errors?.email?.message}
                  </motion.label>
                )}
              </AnimatePresence>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-harmattan">وشەی نهێنی</span>
              </label>
              <input
                type="password"
                placeholder="تێپەڕوشەکەت بنووسە"
                className="input input-bordered font-harmattan"
                {...register("password_hash", {
                  required: {
                    value: true,
                    message: "تێپەڕوشە پێویستە!",
                  },
                })}
              />
              <AnimatePresence>
                {!!errors?.password_hash?.message && (
                  <motion.label
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    className="label-text text-error mt-1 px-2 font-harmattan"
                  >
                    {errors?.password_hash?.message}
                  </motion.label>
                )}
              </AnimatePresence>
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
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
    </motion.div>
  );
};

export default Login;
