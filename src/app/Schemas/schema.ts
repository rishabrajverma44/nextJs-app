import * as yup from "yup";

export const loginSchema = yup.object().shape({
  password: yup.string().required("password is required !"),
  userEmail: yup
    .string()
    .required("email is required !")
    .email("Invalid email"),
});

export const registerSchema = yup.object().shape({
  userName: yup.string().required("name is required !"),
  role: yup.string().required("select role !"),
  password: yup
    .string()
    .required("password is required !")
    .min(4, "Atleast 4 characters"),
  userEmail: yup
    .string()
    .required("email is required !")
    .email("Invalid email"),
});

export const addFormSchema = yup.object().shape({
  company: yup.string().required("company name is required !"),
  role: yup.string().required("role is required !"),
  jobType: yup.string().required("job type is required !"),
  location: yup.string().when("jobType", {
    is: (jobType: string) => jobType !== "Remote",
    then: (schema) => schema.required("location is required !"),
    otherwise: (schema) => schema.notRequired(),
  }),
  status: yup.string().required("status is required !"),
  date: yup.string().required("date is required !"),
});
