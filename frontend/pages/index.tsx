import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      router.push("/dashboard");
    } catch (err: any) {
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
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
          <h3 className="text-center mb-2">Login</h3>
          <p className="text-center text-muted small">
            Enter your credentials to access the system
          </p>

          {error && (
            <div className="alert alert-danger py-2 text-center">{error}</div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-dark w-100 mt-2"
              type="submit"
              style={{ borderRadius: "8px" }}
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-3 small">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary" style={{ cursor: "pointer" }}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
