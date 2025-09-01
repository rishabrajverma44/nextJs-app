"use client";
import type React from "react";
import { useEffect, useRef } from "react";
import { TextIgniter } from "@mindfiredigital/react-text-igniter";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { addFormSchema } from "@/app/Schemas/schema";
import { addForm } from "@/actions/employer/actions";

const Form = () => {
  //text igniter
  const editorRef = useRef<{
    getHtml: () => string;
    getJson: () => string;
  } | null>(null);
  const features = [
    "heading",
    "bold",
    "italic",
    "underline",
    "orderedList",
    "unorderedList",
    "justifyLeft",
    "justifyCenter",
    "justifyRight",
    "createLink",
    "superscript",
    "subscript",
    "table",
    "layout",
  ];

  // get JSON content
  const handleGetJsonContent = () => {
    if (editorRef.current) return editorRef.current.getHtml();
  };

  //form setup
  //formInterface
  const formik = useFormik({
    initialValues: {
      company: "",
      role: "",
      jobType: "",
      location: "",
      status: "",
      date: "",
      notes: "",
    },
    validationSchema: addFormSchema,
    onSubmit: async (values) => {
      try {
        values.notes = handleGetJsonContent() || "";
        console.log(values);
        const satatus = await addForm(values);
        if (satatus === 201) toast.success("Form added successfully !");
        formik.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  useEffect(() => {
    const element = document.getElementsByClassName(
      "editor-container"
    )[0] as HTMLDivElement;
    if (element?.style) {
      element.style.width = "100%";
    }
  }, []);
  useEffect(() => {
    console.log(editorRef.current);
    console.log(typeof editorRef.current);
  }, []);

  return (
    <div>
      <div className="mainform">
        <form aria-label="Job application form" onSubmit={handleSubmit}>
          <div id="applicationForm">
            <div className="left_form">
              <label htmlFor="company" className="block font-medium mt-2">
                Company Name:
              </label>
              <input
                id="company"
                type="text"
                placeholder="Company name"
                name="company"
                onChange={handleChange}
                value={values.company}
                className="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-500 rounded-md px-2 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {touched.company && errors.company && (
                <div className="text-red-500">{errors.company}</div>
              )}
              <label htmlFor="role" className="block font-medium mt-2">
                Role:
              </label>
              <input
                id="role"
                type="text"
                name="role"
                placeholder="Enter role"
                value={values.role}
                onChange={handleChange}
                className="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-500 rounded-md px-2 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {touched.role && errors.role && (
                <div className="text-red-500">{errors.role}</div>
              )}
              <label htmlFor="jobtype" className="block font-medium mt-2">
                Job Type:
              </label>
              <select
                id="jobtype"
                name="jobType"
                onChange={handleChange}
                value={values.jobType}
                className="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-500 rounded-md px-2 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                <option value="" disabled>
                  Select job type
                </option>
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {touched.jobType && errors.jobType && (
                <div className="text-red-500">{errors.jobType}</div>
              )}
              <label htmlFor="location" className="block font-medium mt-2">
                Location:
              </label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="Enter location"
                value={values.location}
                onChange={handleChange}
                disabled={values.jobType === "Remote" ? true : false}
                className="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-500 rounded-md px-2 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {touched.location && errors.location && (
                <div className="text-red-500">{errors.location}</div>
              )}
              <label htmlFor="date" className="block font-medium mt-2">
                Last Date Of Application :
              </label>
              <input
                id="date"
                type="date"
                name="date"
                onChange={handleChange}
                value={values.date}
                className="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-500 rounded-md px-2 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              />
              {touched.date && errors.date && (
                <div className="text-red-500">{errors.date}</div>
              )}

              <label htmlFor="status" className="block font-medium mt-2">
                Application Status:
              </label>
              <select
                id="status"
                name="status"
                onChange={handleChange}
                value={values.status}
                className="w-full bg-transparent placeholder:text-slate-400 text-sm border border-slate-500 rounded-md px-2 py-1.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow">
                <option value="" disabled>
                  Select status
                </option>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Hired">Hired</option>
              </select>
              {touched.status && errors.status && (
                <div className="text-red-500">{errors.status}</div>
              )}
            </div>

            <div className="right_form">
              <label htmlFor="notes" className="block font-medium mb-1">
                Notes:
              </label>
              <div className="textEditor_container">
                <TextIgniter
                  ref={editorRef}
                  features={features}
                  height={"240px"}
                />
              </div>
            </div>
          </div>
          <div className="footer">
            <button
              type="submit"
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
