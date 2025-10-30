
import React, { useState, useEffect } from 'react';
import GiveReviews from './GiveReviews'; // Assuming GiveReviews is in the same directory
import './ReviewForm.css'; // Importing CSS for styling

const ReviewForm = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
        setReviews(savedReviews);

        // Load appointments from local storage
        const allDoctorDataKeys = Object.keys(localStorage).filter(key => key !== 'doctorData' && key !== 'email');
        let allAppointments = [];

        allDoctorDataKeys.forEach(doctorName => {
            const doctorAppointments = JSON.parse(localStorage.getItem(doctorName)) || [];
            allAppointments = [...allAppointments, ...doctorAppointments];
        });

        allAppointments = allAppointments.filter(appointment => appointment.name && appointment.date && appointment.time);

        setAppointments(allAppointments);
    }, [showForm]);

    const handleFeedbackClick = (doctor) => {
        setSelectedDoctor(doctor);
        setShowForm(true);
    };

    const getReviewStatus = (doctorId) => {
        return reviews.some(review => review.doctorId === doctorId) ? 'Provided' : 'Not Provided';
    };

    const isReviewProvided = (doctorId) => {
        return reviews.some(review => review.doctorId === doctorId);
    };
    return (
        <div className="review-table-container">
            <h2>Reviews</h2>
            <table className="review-table">
                <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Doctor Name</th>
                    <th>Doctor Speciality</th>
                    <th>Provide feedback</th>
                    <th>Review Given</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((doctor,index) => (
                    <tr key={doctor.id}>
                        <td>{index + 1}</td>
                        <td>{doctor.doctorName}</td>
                        <td>{doctor.doctorSpeciality}</td>
                        <td>
                            <button
                                onClick={() => handleFeedbackClick(doctor)}
                                disabled={isReviewProvided(doctor.id)}>
                                {isReviewProvided(doctor.id) ? 'Feedback Given' : 'Click Here'}
                            </button>
                        </td>
                        <td>
                            {getReviewStatus(doctor.id)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {showForm && selectedDoctor && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <GiveReviews doctor={selectedDoctor} onClose={() => setShowForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
