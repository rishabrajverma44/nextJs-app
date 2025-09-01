"use client";
import { registerSchema } from "@/app/Schemas/schema";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

export default function Register() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      userName: "",
      role: "",
      password: "",
      userEmail: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      console.log(values);

      try {
        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, values)
          .then((res) => {
            console.log(res.status);
            if (res.status === 201) {
              toast.success("Registered successfully");
              router.push("/login");
            }
          })
          .catch((err) => {
            if (err.status === 409) {
              toast(err.response.data);
            } else {
              toast.error("somthing went wrong !");
            }
          });
      } catch (err) {
        console.error("Login error", err);
        alert("Something went wrong!");
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="min-h-screen pt-0 flex items-center justify-center bg-gray-100 ">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="place-items-center">
          <Image
            src="/images/logo.png"
            alt="Logo image"
            width={40}
            height={50}
          />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create an Account
        </h2>

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="userName"
              value={values.userName}
              onChange={handleChange}
            />
            {touched.userName && errors.userName && (
              <div className="text-red-500">{errors.userName}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Role</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="role"
              value={values.role}
              onChange={handleChange}>
              <option value="" disabled>
                Select role
              </option>
              <option value="job_seeker">Job Seeker</option>
              <option value="company">Employer</option>
            </select>
            {touched.role && errors.role && (
              <div className="text-red-500">{errors.role}</div>
            )}
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="userEmail"
              value={values.userEmail}
              onChange={handleChange}
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
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              name="password"
              value={values.password}
            />
            {touched.password && errors.password && (
              <div className="text-red-500">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Register
          </button>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="w-1/2 rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
