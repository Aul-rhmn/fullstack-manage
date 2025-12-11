import React from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container">
        <a className="navbar-brand" href="#">
          Company
        </a>
        <div>
          {user && (
            <>
              <span className="me-3">
                {user.name} ({user.role})
              </span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
