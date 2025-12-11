import React from "react";
import { useForm } from "react-hook-form";
import API from "../lib/api";
import { useRouter } from "next/router";
import Head from "next/head";

type Reg = { name: string; email: string; password: string };

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<Reg>();
  const router = useRouter();

  const onSubmit = async (data: Reg) => {
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully! Please login.");
      router.push("/");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Register failed");
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f4ff, #e5ebf8)",
        }}
      >
        <div
          className="card p-4 shadow-lg"
          style={{
            width: "360px",
            borderRadius: "18px",
            border: "none",
          }}
        >
          <h3 className="text-center mb-2">Create Account</h3>
          <p className="text-center text-muted small">
            Register to access the system
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* NAME */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Your full name"
                {...register("name", { required: true })}
              />
            </div>

            {/* EMAIL */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                {...register("email", { required: true })}
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Minimum 6 characters"
                {...register("password", { required: true })}
              />
            </div>

            <button
              className="btn btn-dark w-100 mt-2"
              type="submit"
              style={{ borderRadius: "8px" }}
            >
              Register
            </button>
          </form>

          <p className="text-center mt-3 small">
            Already have an account?{" "}
            <a
              href="/"
              className="text-primary"
              style={{ cursor: "pointer" }}
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
