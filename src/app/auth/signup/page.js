"use client";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { months } from "../../../../utils";
import { auth, db } from "@/app/firebase/firebse";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SignupPage = () => {
  const [signup, setSignup] = useState("Sign Up");
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("First name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    Day: Yup.string()
      .notOneOf(["Day"], "Please select a valid day")
      .required("Day is required"),
    Month: Yup.string()
      .notOneOf(["Month"], "Please select a valid month")
      .required("Month is required"),
    Year: Yup.string()
      .notOneOf(["Year"], "Please select a valid year")
      .required("Year is required"),
    gender: Yup.string().required("Please select a gender"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const AddUsersData = async (Id, datas) => {
    const userDocRef = doc(db, "SignupUsers", Id);
    await setDoc(userDocRef, datas);
  };
  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        let datas = {
          userDetails: [data],
          usersFriend: [],
          Post: [],
          createdAt: serverTimestamp(),
          likes: [],
          comments: [],
          Friends: [],
          UserId: userCredential.user.uid,
        };
        const user = userCredential.user;

        return (
          setSignup("Signing up..."),
          AddUsersData(user.uid, datas),
          reset(),
          router.push("/pages/home")
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        setSignup("Sign Up");
      });
    console.log("User Data:", data);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen p-6 bg-gray-100">
      {/* Left Section */}
      <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
        <h1 className="text-5xl text-blue-600 font-bold mb-4">facebook</h1>
        <p className="text-2xl text-gray-700">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>

      {/* Signup Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create a new account</h2>
        <p className="text-gray-600 mb-4">It’s quick and easy.</p>
        <hr className="mb-4" />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Name Fields */}
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="First name"
              {...register("name")}
              className={`w-1/2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-blue-500`}
            />
            <input
              type="text"
              placeholder="Surname"
              {...register("surname")}
              className={`w-1/2 border ${
                errors.surname ? "border-red-500" : "border-gray-300"
              } rounded-md p-2 focus:outline-blue-500`}
            />
          </div>
          {(errors.name || errors.surname) && (
            <p className="text-red-500 text-sm">
              {errors.name?.message || errors.surname?.message}
            </p>
          )}

          {/* Email */}
          <input
            type="text"
            {...register("email")}
            placeholder="Mobile number or email address"
            className={`w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 focus:outline-blue-500`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="New password"
            {...register("password")}
            className={`w-full border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md p-2 focus:outline-blue-500`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Date of Birth */}
          <div>
            <label className="text-sm text-gray-600">Date of birth</label>
            <div className="flex space-x-2 mt-1">
              <select
                {...register("Day")}
                className={`flex-1 border ${
                  errors.Day ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-gray-600`}
              >
                <option>Day</option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
              <select
                {...register("Month")}
                className={`flex-1 border ${
                  errors.Month ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-gray-600`}
              >
                <option>Month</option>
                {months.map((month, index) => (
                  <option key={index}>{month}</option>
                ))}
              </select>
              <select
                {...register("Year")}
                className={`flex-1 border ${
                  errors.Year ? "border-red-500" : "border-gray-300"
                } rounded-md p-2 text-gray-600`}
              >
                <option>Year</option>
                {Array.from({ length: 50 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return <option key={i}>{year}</option>;
                })}
              </select>
            </div>
            {(errors.Day || errors.Month || errors.Year) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Day?.message ||
                  errors.Month?.message ||
                  errors.Year?.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <div className="flex space-x-3 mt-1">
              {["Female", "Male", "Custom"].map((gender) => (
                <label
                  key={gender}
                  className={`flex items-center border ${
                    errors.gender ? "border-red-500" : "border-gray-300"
                  } rounded-md p-2 flex-1`}
                >
                  <span className="flex-1">{gender}</span>
                  <input
                    {...register("gender")}
                    type="radio"
                    value={gender}
                    className="ml-2"
                  />
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Info Texts */}
          <p className="text-xs text-gray-600 leading-tight">
            People who use our service may have uploaded your contact
            information to Facebook.{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Learn more.
            </a>
          </p>

          <p className="text-xs text-gray-600 leading-tight">
            By clicking Sign Up, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms
            </a>
            ,{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Cookies Policy
            </a>
            .
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition"
          >
            {signup}
          </button>

          <p
            onClick={() => router.push("/auth/login")}
            className="text-center text-blue-600 font-semibold mt-4 hover:underline cursor-pointer"
          >
            Already have an account?
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
