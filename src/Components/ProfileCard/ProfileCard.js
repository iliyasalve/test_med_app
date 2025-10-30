
import React, { useState } from 'react';
import ProfileForm from '../ProfileForm/ProfileForm'; // Ensure the path is correct
import "./ProfileCard.css";
import { useNavigate } from "react-router-dom";


const ProfileCard = () => {
    const [showProfileForm, setShowProfileForm] = useState(false);
    const [showReport, setShowReport] = useState(false);
    const navigate = useNavigate();

    const handleCardClick = (type) => {
        if (type === 'profile') {
            setShowProfileForm(true);
            setShowReport(false);
        } else if (type === 'report') {
            navigate("/report");
        }
    };

    const handleClose = () => {
        setShowProfileForm(false);
        setShowReport(false);
    };

    return (
        <div className="profile-card">
            {showProfileForm ? (
                <ProfileForm onClose={handleClose} />
            ) : showReport ? (
                <div className="report-content">
                    {/* Replace this with the actual report component or content */}
                    <h2>Your Report</h2>
                    <button onClick={handleClose}>Close</button>
                </div>
            ) : (
                <>
                    <div className="profile-card__info" onClick={() => handleCardClick('profile')}>
                        Your Profile
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileCard;
