
import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';
import './GiveReviews.css'; // Importing CSS for styling

const GiveReviews = ({ doctor, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0,
        doctorId: doctor.id // Ensure the doctorId is included in the form data
    });
    const [showWarning, setShowWarning] = useState(false);
    const [submittedMessage, setSubmittedMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRatingChange = (newRating) => {
        setFormData({ ...formData, rating: newRating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.review && formData.rating > 0) {
            const existingReviews = JSON.parse(localStorage.getItem('reviews')) || [];
            localStorage.setItem('reviews', JSON.stringify([...existingReviews, formData]));

            setSubmittedMessage(`Name: ${formData.name}, Review: ${formData.review}, Rating: ${formData.rating}`);
            setFormData({
                name: '',
                review: '',
                rating: 0,
                doctorId: doctor.id // Ensure the doctorId is included in the form data
            });
            setShowWarning(false);
            onClose(); // Close form after submission
        } else {
            setShowWarning(true);
        }
    };

    return (
        <div className="review-form-container">
            <form onSubmit={handleSubmit} className="review-form">
                <h2>Give Your Feedback for {doctor.name}</h2>
                {showWarning && <p className="warning">Please fill out all fields.</p>}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="review">Review:</label>
                    <textarea id="review" name="review" value={formData.review} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <Rating
                        count={5}
                        value={formData.rating}
                        onChange={handleRatingChange}
                        size={24}
                        activeColor="#ffd700"
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
                <button type="button" className="close-button" onClick={onClose}>Close</button>
            </form>
            {submittedMessage && (
                <div className="submitted-message">
                    <h3>Submitted Message:</h3>
                    <p>{submittedMessage}</p>
                </div>
            )}
        </div>
    );
};

export default GiveReviews;
