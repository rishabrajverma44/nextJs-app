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
