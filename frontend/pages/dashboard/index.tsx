import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function DashboardPage() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className="d-flex" style={{ minHeight: "100vh" }}>
        {/* SIDEBAR */}
        <div
          className="d-flex flex-column p-3 shadow"
          style={{ width: "260px", background: "#ffffff" }}
        >
          <h4 className="mb-4 text-center fw-bold">Dashboard</h4>

          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item mb-2">
              <a href="/dashboard" className="nav-link active text-white" style={{ background: "#212529", borderRadius: "8px" }}>
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/employees" className="nav-link text-dark">
                Employees
              </a>
            </li>
            <li className="nav-item mb-2">
              <a href="/dashboard/admin" className="nav-link text-dark">
                Admin Page
              </a>
            </li>
          </ul>

          <button
            onClick={logout}
            className="btn btn-outline-danger mt-auto"
            style={{ borderRadius: "8px" }}
          >
            Logout
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-grow-1 p-4" style={{ background: "#f0f4ff" }}>
          <h2 className="fw-bold mb-3">Welcome Back!</h2>
          <p className="text-muted mb-4">This is your user dashboard overview.</p>

          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm" style={{ borderRadius: "12px" }}>
                <h5 className="fw-semibold">Employees</h5>
                <p className="text-muted small mb-1">Manage employee data</p>
                <a
                  href="/employees"
                  className="btn btn-dark btn-sm mt-2"
                  style={{ borderRadius: "6px" }}
                >
                  View Employees
                </a>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="card p-3 shadow-sm" style={{ borderRadius: "12px" }}>
                <h5 className="fw-semibold">Admin Page</h5>
                <p className="text-muted small mb-1">User management</p>
                <a
                  href="/dashboard/admin"
                  className="btn btn-dark btn-sm mt-2"
                  style={{ borderRadius: "6px" }}
                >
                  Manage Users
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
