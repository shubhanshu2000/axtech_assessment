import React, { useState } from "react";
import { useNavigate } from "react-router";
import Input from "../components/input";
import Button from "../components/button";

const initialForm = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const initialErrors = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const validate = (
  form: typeof initialForm,
  fieldName?: keyof typeof initialForm
) => {
  const errors: typeof initialErrors = { ...initialErrors };

  // Name
  if (!fieldName || fieldName === "name") {
    if (!form.name.trim()) {
      errors.name = "Name is required.";
    } else if (!/^[A-Za-z]+$/.test(form.name.trim())) {
      errors.name = "Name must contain only alphabets.";
    }
  }

  // Username
  if (!fieldName || fieldName === "username") {
    if (!form.username) {
      errors.username = "Username is required.";
    } else if (
      !/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(form.username)
    ) {
      errors.username =
        "Username must contain alphanumeric and special characters only.";
    }
  }

  // Password
  if (!fieldName || fieldName === "password") {
    if (!form.password) {
      errors.password = "Password is required.";
    } else if (
      !/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(form.password)
    ) {
      errors.password =
        "Password must contain alphanumeric and special characters only.";
    } else if (form.password === form.username) {
      errors.password = "Password and username cannot be the same.";
    }
  }

  // Confirm Password
  if (!fieldName || fieldName === "confirmPassword") {
    if (!form.confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  // Email
  if (!fieldName || fieldName === "email") {
    if (!form.email) {
      errors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email)) {
      errors.email = "Email must be a valid Gmail address.";
    }
  }

  // Phone
  if (!fieldName || fieldName === "phone") {
    if (!form.phone) {
      errors.phone = "Phone number is required.";
    } else if (!/^\+\d{1,4}\d{7,12}$/.test(form.phone)) {
      errors.phone =
        "Phone must include country code and number (e.g. +911234567890).";
    }
  }

  if (fieldName) return { ...initialErrors, [fieldName]: errors[fieldName] };
  return errors;
};

const validateField = (
  name: string,
  value: string,
  form: typeof initialForm
) => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Name is required.";
      if (!/^[A-Za-z]+$/.test(value.trim()))
        return "Name must contain only alphabets.";
      break;
    case "username":
      if (!value) return "Username is required.";
      if (
        !/^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(
          value
        )
      )
        return "Username must contain at least one alphanumeric and one special character.";
      break;
    case "password":
      if (!value) return "Password is required.";
      if (
        !/^(?=.*[A-Za-z0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(
          value
        )
      )
        return "Password must contain at least one alphanumeric and one special character.";
      if (value === form.username)
        return "Password and username cannot be the same.";
      break;
    case "confirmPassword":
      if (!value) return "Confirm password is required.";
      if (value !== form.password) return "Passwords do not match.";
      break;
    case "email":
      if (!value) return "Email is required.";
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value))
        return "Email must be a valid Gmail address.";
      break;
    case "phone":
      if (!value) return "Phone number is required.";
      if (!/^\+\d{1,4}\d{7,12}$/.test(value))
        return "Phone must include country code and number (e.g. +911234567890).";
      break;
    default:
      return "";
  }
  return "";
};

const Signup = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);

    // Validate only the changed field
    const errorMsg = validateField(name, value, updatedForm);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    const hasError = Object.values(validationErrors).some(Boolean);
    if (!hasError) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cfe8e7] p-2 sm:p-4">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-2xl p-2 sm:p-6 md:p-12">
        <div className="bg-[#008378] py-6 md:py-10 text-center rounded-t-lg mb-8">
          <h2 className="text-white text-2xl sm:text-3xl font-mono tracking-widest">
            Create new Account
          </h2>
        </div>
        <form className="p-0 sm:p-2 md:p-4" onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8">
            <Input
              label="NAME"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              error={errors.name}
            />
            <Input
              label="USERNAME"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              error={errors.username}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8">
            <Input
              label="EMAIL"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              error={errors.email}
            />
            <Input
              label="PHONE NO."
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              error={errors.phone}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12">
            <Input
              label="NEW PASSWORD"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="New Password"
              error={errors.password}
              showToggle
              showValue={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
            />
            <Input
              label="CONFIRM NEW PASSWORD"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              error={errors.confirmPassword}
              showToggle
              showValue={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-full md:w-auto text-base md:text-lg"
            >
              SIGN UP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
