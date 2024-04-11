import * as yup from "yup";

export const loginSchema = yup.object({
 
  email: yup.string()
    .required("Email is required")
    .email("Invalid email address"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^[a-zA-Z0-9]{8,}$/,
      "Password must be at least 8 characters long and contain only letters and numbers"
    ),
});
