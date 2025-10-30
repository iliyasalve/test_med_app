import React, { useEffect, useState } from 'react';
import "./Notification.css";

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [appointments, setAppointments] = useState([]);
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('email');
        const allDoctorDataKeys = Object.keys(localStorage).filter(key => key !== 'doctorData' && key !== 'email');
        let allAppointments = [];

        console.log('Stored Username:', storedUsername);

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }

        allDoctorDataKeys.forEach(doctorName => {
            const doctorAppointments = JSON.parse(localStorage.getItem(doctorName)) || [];
            allAppointments = [...allAppointments, ...doctorAppointments];
        });

        // Filter out empty or invalid appointments
        allAppointments = allAppointments.filter(appointment => appointment.name && appointment.date && appointment.time);

        console.log('All Appointments:', allAppointments);

        if (allAppointments.length > 0) {
            setAppointments(allAppointments);
        }
    }, []);

    useEffect(() => {
        console.log('Appointments state updated:', appointments);
    }, [appointments]);

    const handleCancel = (appointmentId) => {
        const updatedAppointments = appointments.filter(appointment => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);

        // Update localStorage for each doctor
        const doctorAppointmentsMap = updatedAppointments.reduce((acc, appointment) => {
            acc[appointment.doctorName] = acc[appointment.doctorName] || [];
            acc[appointment.doctorName].push(appointment);
            return acc;
        }, {});

        Object.keys(doctorAppointmentsMap).forEach(doctorName => {
            localStorage.setItem(doctorName, JSON.stringify(doctorAppointmentsMap[doctorName]));
        });

        console.log('Updated Appointments after cancellation:', updatedAppointments);
    };

    return (
        <div>
            {children}
            {isLoggedIn && appointments.length > 0 && showNotification && (
                <div className="notification-container">
                    <div className="notification-content">
                        <h3>Appointment Details</h3>
                        {appointments.map(appointment => (
                            <div key={appointment.id} className="appointment-details">
                                <p><strong>User:</strong> {appointment.name}</p>
                                <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                                <p><strong>Speciality:</strong> {appointment.doctorSpeciality}</p>
                                <p><strong>Date:</strong> {appointment.date}</p>
                                <p><strong>Time:</strong> {appointment.time}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;
