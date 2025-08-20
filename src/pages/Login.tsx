import React, { useState } from "react";
import { Link } from "react-router";
import Input from "../components/input";
import Button from "../components/button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Simple validation: required fields
    let errorMsg = "";
    if (!value)
      errorMsg = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = {
      username: form.username ? "" : "Username is required.",
      password: form.password ? "" : "Password is required.",
    };
    setErrors(validationErrors);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#cfe8e7] p-2 sm:p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl p-2 sm:p-6 md:p-12">
        <div className="bg-[#008378] py-6 md:py-10 text-center rounded-t-lg mb-8">
          <h2 className="text-white text-2xl md:text-3xl font-mono tracking-widest mb-2">
            Login
          </h2>
          <p className="text-white text-base md:text-lg">Sign in to continue</p>
        </div>
        <form className="p-0 sm:p-2 md:p-4" onSubmit={handleSubmit}>
          <div className="mb-8">
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
          <div className="mb-12">
            <Input
              label="NEW PASSWORD"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              error={errors.password}
              showToggle
              showValue={showPassword}
              onToggle={() => setShowPassword((v) => !v)}
            />
          </div>
          <div className="flex flex-col items-center">
            <Button
              type="submit"
              className="w-full md:w-auto mb-6 text-base md:text-lg"
            >
              LOGIN
            </Button>
            <span className="text-base text-gray-700">
              Don't have Account?{" "}
              <Link
                to="/signup"
                className="text-[#008378] underline font-semibold"
              >
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
