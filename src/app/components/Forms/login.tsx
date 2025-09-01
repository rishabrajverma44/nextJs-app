"use client";

import Link from "next/link";
import { useFormik } from "formik";
import { loginSchema } from "@/app/Schemas/schema";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function SignInForm() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      userEmail: "jobseeker1@gmail.com",
      password: "1234",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, values)
          .then((res) => {
            if (res.status === 200) {
              const token = res.headers.authorization.split(" ")[1];
              const role = res.data.role;

              Cookies.set("job-app-token", token, { expires: 1 });
              Cookies.set("job-app-role", role, { expires: 1 });

              if (role === "company") {
                router.push("/employer");
              } else if (role === "job_seeker") {
                router.push("/employee");
                toast.success("Login successfully");
              } else {
                router.push("/");
              }
            } else {
              toast.error("Wrong credentials !");
              return;
            }
          })
          .catch((err) => {
            if (err.status === 404) {
              toast.warn(err.response.data);
            } else toast.error(err.message);
          });
      } catch (err) {
        console.error("Login error", err);
        alert("Something went wrong!");
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen flex items-start pt-12 justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="userEmail"
              value={values.userEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.userEmail && errors.userEmail && (
              <div className="text-red-500">{errors.userEmail}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {touched.password && errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer  transition">
            Login
          </button>
          <div className="flex justify-center">
            <Link
              href="/register"
              className="w-1/2 block text-center bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 hover:cursor-pointer  transition">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
