import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Last name is required")
    .min(4, "Minimum of four characters")
    .max(50, "Maximum of 50 characters"),

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
