import React, { useState } from 'react'
import { Container, LogoutBtn, Logo } from '../Index'
import { useSelector } from 'react-redux'
import { useNavigate, Link, useParams } from 'react-router'
import "../../App.css"


function Header() {

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const { slug } = useParams()


    const navItem = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All post",
            slug: "/all-post",
            active: authStatus
        },
        {
            name: "Add post",
            slug: "/add-post",
            active: authStatus
        },
        {
            name: "My Post",
            slug: "/my-post",
            active: authStatus
        }
    ]
    return (
        <header>
            <nav className="navbar navbar-expand-md shadow-0 w-100 py-3">
                <Container>
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <Link to="/" className="navbar-brand">
                            <Logo />
                        </Link>

                        {/* Hamburger toggler */}
                        <button
                            className="navbar-toggler"
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Collapsible menu */}
                        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                            <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
                                {navItem.map((item) =>
                                    item.active ? (
                                        <li className="nav-item" key={item.name}>
                                            <button
                                                className="px-4 py-1 bg-primary bg-opacity-10 text-primary rounded-pill border border-primary fw-semibold hover-bg-opacity"
                                                onClick={() => {
                                                    navigate(item.slug)
                                                    setIsOpen(false)
                                                }}>
                                                {item.name}
                                            </button>
                                        </li>
                                    ) : null
                                )}
                                {authStatus && (
                                    <li className="nav-item">
                                        <LogoutBtn />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </Container>
            </nav>
        </header>
    )
}

export default Header
