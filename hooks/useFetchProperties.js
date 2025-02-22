import axios from "axios";
import { useState } from "react";

export const useFetchProperties = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [properties, setProperties] = useState([]);
    
    const fetchProperties = async () => {
        setLoading(true);
        await axios
        .get("/api/properties/fetch")
        .then((response) => {
            console.log(" properties", response.data.properties);
            setSuccess(response.data.message);
            setProperties(response.data.properties);
        })
        .catch((error) => {
            setError(error.response.data.message);
        })
        .finally(() => {
            setLoading(false);
        });
    };
    
    return { loading, error, properties, fetchProperties };
    }