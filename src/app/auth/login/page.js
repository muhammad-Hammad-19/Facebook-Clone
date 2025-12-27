"use client";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase/firebse";
import { useRouter } from "next/navigation";
import { useState } from "react";
const LoginPage = () => {
  const [login, setLogin] = useState("Log in");
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onSubmit = async (data) => {
    try {
      setLogin("Loading....");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      reset();
      localStorage.setItem("user", "true");
      router.push("/pages/home");
    } catch (error) {
      console.log(error.code, error.message);
      setLogin("Log in");
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-screen flex flex-col items-center bg-gray-100 justify-center"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-600">facebook</h1>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          {/* Email Field */}
          <input
            type="text"
            {...register("email")}
            placeholder="Email or phone number"
            className="w-full mb-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
          )}

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full mb-2 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-3">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition duration-200"
          >
            {login}
          </button>

          <div className="text-center my-4 text-sm text-blue-600 cursor-pointer hover:underline">
            Forgotten password?
          </div>

          <button
            onClick={() => router.push("/auth/signup")}
            className="w-full bg-green-500 text-white py-2 rounded font-semibold hover:bg-green-600 transition duration-200"
          >
            Create New Account
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>English (UK) · Español · Français (France)</p>
          <p className="mt-2">&copy; 2025 Facebook clone</p>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
