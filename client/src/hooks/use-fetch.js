import { useState } from "react";
import { useAuth } from "./auth";

const useFetch = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async (url, options = {}, isProtected = true) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(url, {
                ...options,
                headers: {
                    ...(options?.headers || {}),
                    ...(isProtected
                        ? { Authorization: "Bearer " + user.uid }
                        : {}),
                },
            });

            if (!res.ok) throw new Error(`Request failed with ${res.status}`);
            const result = await res.json();
            setData(result);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchData, loading, error, data };
};

export default useFetch;
