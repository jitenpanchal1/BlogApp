import React, { useState } from "react";
import { Container, LogoutBtn, Logo } from "../Index";
import { useSelector } from "react-redux";
import { useNavigate, Link, useParams } from "react-router";
import "../../App.css";
import "../../../src/Header.css"; // keep your path

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { slug } = useParams();

  const navItem = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All post", slug: "/all-post", active: authStatus },
    { name: "Add post", slug: "/add-post", active: authStatus },
    { name: "My Post", slug: "/my-post", active: authStatus },
  ];

  return (
    <header className="custom-header sticky-top">
      <nav className="navbar navbar-expand-md py-2">
        <Container>
          <div className="container-fluid d-flex justify-content-between align-items-center">

            {/* Logo */}
            <Link to="/" className="navbar-brand fw-bold fs-4 text-theme">
              <Logo />
            </Link>

            {/* Hamburger */}
            <button
              className="navbar-toggler border-0"
              type="button"
              aria-controls="primaryNav"
              aria-expanded={isOpen ? "true" : "false"}
              aria-label="Toggle navigation"
              onClick={() => setIsOpen((v) => !v)}
            >
              <i className="fas fa-bars text-theme fs-4"></i>
            </button>

            {/* Collapsible panel */}
            <div
              id="primaryNav"
              className={`collapse navbar-collapse mobile-panel ${isOpen ? "show" : ""}`}
            >
              <ul className="navbar-nav ms-auto gap-2 flex-md-row flex-column align-items-md-center">
                {navItem.map(
                  (item) =>
                    item.active && (
                      <li className="nav-item" key={item.name}>
                        <button
                          className={`nav-btn ${window.location.pathname === item.slug ? "active" : ""}`}
                          onClick={() => {
                            navigate(item.slug);
                            setIsOpen(false);
                          }}
                        >
                          {item.name}
                        </button>
                      </li>
                    )
                )}

                {authStatus && (
                  <li className="nav-item logout-item">
                    {/* style the inner button/link from LogoutBtn via CSS, no double-buttons */}
                    <div className="logout-btn">
                      <LogoutBtn />
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
}

export default Header;
