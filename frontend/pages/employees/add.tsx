import React from "react";
import Head from "next/head";
import { useForm } from "react-hook-form";
import API from "../../lib/api";
import { useRouter } from "next/router";

type Form = { name: string; position: string; photo: FileList };

export default function AddEmployee() {
  const { register, handleSubmit } = useForm<Form>();
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const onSubmit = async (data: Form) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("position", data.position);
      if (data.photo && data.photo[0]) fd.append("photo", data.photo[0]);
      await API.post("/employees", fd, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Added");
      router.push("/employees");
    } catch (e: any) {
      alert(e?.response?.data?.message || "Failed");
    }
  };

  return (
    <>
      <Head>
        <title>Add Employee</title>
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
                className="nav-link text-dark"
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
          <h2 className="fw-bold mb-3">Add Employee</h2>
          <p className="text-muted mb-4">
            Fill in the employee details below.
          </p>

          <div
            className="card p-4 shadow-sm"
            style={{ borderRadius: "12px", maxWidth: "500px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  className="form-control"
                  {...register("name", { required: true })}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Position</label>
                <input
                  className="form-control"
                  {...register("position")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Photo (jpg/jpeg, max 300KB)
                </label>
                <input
                  type="file"
                  accept=".jpg,.jpeg"
                  className="form-control"
                  {...register("photo")}
                />
              </div>
              <button
                type="submit"
                className="btn btn-dark"
                style={{ borderRadius: "8px" }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
