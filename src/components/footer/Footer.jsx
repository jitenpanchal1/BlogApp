import React from 'react';
import { Link } from 'react-router';

function Footer() {
    return (
        <footer className="bg-dark text-white pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row">

                    {/* Logo & About */}
                    <div className="col-md-3 mb-4">
                        <h5 className="fw-bold">YourApp</h5>
                        <p className="text-muted">
                            YourApp is your go-to solution for modern, fast, and beautiful web experiences.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-md-3 mb-4">
                        <h6 className="text-uppercase fw-bold">Quick Links</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
                            <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
                            <li><Link to="/blog" className="text-white text-decoration-none">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div className="col-md-3 mb-4">
                        <h6 className="text-uppercase fw-bold">Help</h6>
                        <ul className="list-unstyled">
                            <li><Link to="/faq" className="text-white text-decoration-none">FAQ</Link></li>
                            <li><Link to="/support" className="text-white text-decoration-none">Support</Link></li>
                            <li><Link to="/terms" className="text-white text-decoration-none">Terms</Link></li>
                            <li><Link to="/privacy" className="text-white text-decoration-none">Privacy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3 mb-4">
                        <h6 className="text-uppercase fw-bold">Contact</h6>
                        <p className="mb-1"><i className="bi bi-envelope-fill me-2"></i> contact@yourapp.com</p>
                        <p className="mb-1"><i className="bi bi-phone-fill me-2"></i> +91 98765 43210</p>
                        <div className="mt-2">
                            <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-white"><i className="bi bi-github"></i></a>
                        </div>
                    </div>
                </div>

                <hr className="border-light" />
                <p className="text-center text-muted mb-0">
                    &copy; {new Date().getFullYear()} YourApp. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
