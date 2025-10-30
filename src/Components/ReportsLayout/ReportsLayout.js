import React, { useState, useEffect } from 'react';
import './ReportsLayout.css'; // Importing CSS for styling
import { useNavigate } from "react-router-dom";

const ReportLayout = ({ onClose }) => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Hardcoded appointments for three doctors
        const hardcodedAppointments = [
            { id: '1', doctorName: 'Dr. John Doe', doctorSpeciality: 'Cardiology', date: '2024-07-21', time: '10:00 AM' },
            { id: '2', doctorName: 'Dr. Jane Smith', doctorSpeciality: 'Dermatology', date: '2024-07-22', time: '11:00 AM' },
            { id: '3', doctorName: 'Dr. Emily Davis', doctorSpeciality: 'Neurology', date: '2024-07-23', time: '12:00 PM' },
        ];

        setAppointments(hardcodedAppointments);
    }, []);

    const handleViewReport = () => {
        window.open('/patient_report.pdf', '_blank');
    };

    const handleDownloadReport = () => {
        const link = document.createElement('a');
        link.href = '/patient_report.pdf';
        link.download = 'patient_report.pdf';
        link.click();
    };

    const handleClickCancel = () => {
        navigate("/");
    };

    return (
        <div className="report-table-container">
            <h2>Reports</h2>
            <table className="report-table">
                <thead>
                <tr>
                    <th>Serial Number</th>
                    <th>Doctor Name</th>
                    <th>Doctor Speciality</th>
                    <th>View Report</th>
                    <th>Download Report</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((doctor, index) => (
                    <tr key={doctor.id}>
                        <td>{index + 1}</td>
                        <td>{doctor.doctorName}</td>
                        <td>{doctor.doctorSpeciality}</td>
                        <td>
                            <button onClick={handleViewReport}>
                                View Report
                            </button>
                        </td>
                        <td>
                            <button onClick={handleDownloadReport}>
                                Download Report
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={handleClickCancel} className="close-button">Close</button>
        </div>
    );
};

export default ReportLayout;