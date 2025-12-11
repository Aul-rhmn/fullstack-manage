import React, { useEffect, useState } from "react";
import Head from "next/head";
import NavBar from "../../components/NavBar";
import API from "../../lib/api";

interface Employee {
  id: number;
  name: string;
  position: string;
  photo: string | null;
}

export default function EmployeesPage() {
  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
    setMounted(true);

    if (t) {
      API.get("/employees", { headers: { Authorization: "Bearer " + t } })
        .then((res) => setEmployees(res.data))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (!mounted) return null;
  if (!token) return <p className="text-center mt-5">Please login first.</p>;

  return (
    <>
      <Head>
        <title>Employees</title>
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
              <a href="/dashboard" className="nav-link text-dark">
                Home
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/employees"
                className="nav-link active text-white"
                style={{ background: "#212529", borderRadius: "8px" }}
              >
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
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="btn btn-outline-danger mt-auto"
            style={{ borderRadius: "8px" }}
          >
            Logout
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-grow-1 p-4" style={{ background: "#f0f4ff" }}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Employees</h2>
            <a
              href="/employees/add"
              className="btn btn-dark"
              style={{ borderRadius: "8px" }}
            >
              Add Employee
            </a>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p>Error loading employees.</p>}
          {!loading && !error && employees.length === 0 && (
            <p>No employees found.</p>
          )}

          <div className="row">
            {employees.map((e) => (
              <div
                key={e.id}
                className="col-12 col-sm-6 col-md-4 mb-4 d-flex justify-content-center"
              >
                <div
                  className="card shadow-sm"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: "280px",
                  }}
                >
                  <img
                    src={e.photo ? `/uploads/${e.photo}` : "/placeholder.png"}
                    className="card-img-top"
                    style={{ height: 180, objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title fw-semibold">{e.name}</h5>
                    <p className="card-text text-muted">{e.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
