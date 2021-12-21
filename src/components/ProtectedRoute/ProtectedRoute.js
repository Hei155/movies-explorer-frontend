import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute  = ({ isLoginIn , children}) => {
    if (!isLoginIn) {
        return <Navigate to="/"/>
    }
    return children
}