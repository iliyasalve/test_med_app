import React, { useEffect, useState } from 'react';
import './BookingConsultation.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch';
import DoctorCard from '../DoctorCard/DoctorCard';

const BookingConsultation = () => {
    const [searchParams] = useSearchParams();
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [isSearched, setIsSearched] = useState(false);

    const getDoctorsDetails = () => {
        fetch('https://api.npoint.io/9a5543d36f1460da2f63')
            .then(res => res.json())
            .then(data => {
                setDoctors(data);
                if (searchParams.get('speciality')) {
                    const speciality = searchParams.get('speciality').toLowerCase();
                    const filtered = data.filter(doctor => doctor.speciality.toLowerCase() === speciality);
                    setFilteredDoctors(filtered);
                    setIsSearched(true);
                }
            })
            .catch(err => console.log('Error fetching doctor data:', err));
    };

    const handleSearch = (searchText) => {
        if (searchText === '') {
            setFilteredDoctors([]);
            setIsSearched(false);
        } else {
            const filtered = doctors.filter(
                (doctor) => doctor.speciality.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredDoctors(filtered);
            setIsSearched(true);
        }
    };

    useEffect(() => {
        getDoctorsDetails();
    }, [searchParams]);

    return (
        <center>
            <div className="searchpage-container">
                <FindDoctorSearch onSearch={handleSearch} />
                <div className="search-results-container">
                    {isSearched ? (
                        <center>
                            <h2>{filteredDoctors.length} doctors are available</h2>
                            <h3>Book appointments with minimum wait-time & verified doctor details</h3>
                            {filteredDoctors.length > 0 ? (
                                filteredDoctors.map(doctor => <DoctorCard className="doctorcard" {...doctor} key={doctor.name} />)
                            ) : (
                                <p>No doctors found.</p>
                            )}
                        </center>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </center>
    );
};

export default BookingConsultation;
