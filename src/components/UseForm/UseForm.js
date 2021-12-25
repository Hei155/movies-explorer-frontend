import React from "react";
import { useCallback } from "react";
import { CurrentUserContext } from "../../contexts/currentUserContext";
import { useLocation } from "react-router-dom";

export default function UseForm() {
    const currentUser = React.useContext(CurrentUserContext);
    const location = useLocation();
    const [nameProfile, setNameProfile] = React.useState(currentUser.name);
    const [emailProfile, setEmailProfile] = React.useState(currentUser.email);
    const [nameError, setNameError] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false)
    const handleProfileChange = (event) => {
        if (event.target.name === 'name') {
            setNameProfile(event.target.value);
            setNameError(event.target.validationMessage);
        }
        if (event.target.name === 'email') {
            setEmailProfile(event.target.value);
            setEmailError(event.target.validationMessage);
        }
        setIsValid(event.target.closest("form").checkValidity());
    }
    const  handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    }
    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsValid = false) => {
            setValues(newValues);
            setErrors(newErrors);
            setIsValid(newIsValid);
        },
        [setValues, setErrors, setIsValid]
    );
    return {nameProfile, emailProfile, values, handleChange,handleProfileChange, nameError, emailError, errors, isValid, resetForm };
}