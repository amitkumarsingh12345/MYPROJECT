import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedAdmin = () => {
    const admin = localStorage.getItem('admin');
    return admin ? <Outlet /> : <Navigate to={'/'} />
}

export default ProtectedAdmin;