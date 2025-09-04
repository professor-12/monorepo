import { useQuery } from "@tanstack/react-query";
import React from "react";
import useFetch from "./use-fetch";
import { BASE_URL } from "../lib/utils";
import { useAuth } from "./auth";
import { useSearchParams } from "react-router-dom";

const useProfile = () => {
    const params = useSearchParams()[0];
    const realParms = new URLSearchParams(params.toString());
    console.log(params.get("xnd"));
    const { data, error, fetchData, loading } = useFetch();
    const { user } = useAuth();
    return useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            return await fetch(BASE_URL + "/profile?xnd=" + params.get("xnd"), {
                headers: { Authorization: "Bearer " + user.uid },
            }).then((e) => e.json());
        },
    });
};

export default useProfile;
