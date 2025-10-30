import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);

        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith("reviewFormData_")) {
                localStorage.removeItem(key);
            }
        }
        setEmail('');
        window.location.reload();
    }

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");

        if (storedEmail) {
            setIsLoggedIn(true);
            setEmail(storedEmail);
            setUsername(storedEmail.split('@')[0]);
        }
    }, []);

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy <i style={{color:'#2190FF'}} className="fa fa-user-md"></i>
                </Link>
                <span>.</span>
            </div>
            <div className="nav__icon" onClick={handleClick}>
                <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
            </div>
            <ul className={click ? 'nav__links active' : 'nav__links'}>
                <li className="link">
                    <Link to="/">Home</Link>
                </li>
                <li className="link">
                    <Link to="/search/doctors">Appointments</Link>
                </li>
                <li className="link">
                    <Link to="/healthblog">Health Blog</Link>
                </li>
                <li className="link">
                    <Link to="/reviews">Reviews</Link>
                </li>
                <li className="link">
                    <Link to="/instant-consultation">Instant Consultation</Link>
                </li>
                {isLoggedIn ? (
                    <>
                        <li className="link welcome-user">
                            <span>Welcome, {username}</span>
                            <ul className="dropdown-menu">
                                {/*<ProfileCard/>*/}
                                <li><Link to="/profile">Profile</Link></li>
                                <li><Link to="/report">Report</Link></li>
                            </ul>
                        </li>
                        <li className="link">
                            <button onClick={handleLogout} className="btn2">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/signup">
                                <button className="btn1">Sign Up</button>
                            </Link>
                        </li>
                        <li className="link">
                            <Link to="/login">
                                <button className="btn1">Login</button>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
