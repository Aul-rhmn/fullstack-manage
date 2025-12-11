import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useQuery } from "react-query";
import API from "../../lib/api";

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMounted(true);
  }, []);

  const { data: users, isLoading, isError } = useQuery(
    ["users", token],
    async () => {
      if (!token) return [];
      const res = await API.get("/users", {
        headers: { Authorization: "Bearer " + token },
      });
      return res.data;
    },
    {
      enabled: !!token,
    }
  );

  if (!mounted) return null; 
  if (!token) return <p>Please login first.</p>;

  const del = async (id: number) => {
    if (!confirm("Delete user?")) return;
    await API.delete("/users/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
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
              <a href="/employees" className="nav-link text-dark">
                Employees
              </a>
            </li>
            <li className="nav-item mb-2">
              <a
                href="/dashboard/admin"
                className="nav-link active text-white"
                style={{ background: "#212529", borderRadius: "8px" }}
              >
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
          <h2 className="fw-bold mb-3">User Management</h2>
          <p className="text-muted mb-4">
            Manage users of the system below.
          </p>

          <div className="card p-3 shadow-sm" style={{ borderRadius: "12px" }}>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading users.</p>}
            {users && (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u: any, i: number) => (
                      <tr key={u.id}>
                        <td>{i + 1}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.role}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => del(u.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
