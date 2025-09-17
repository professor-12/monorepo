import { useQuery } from "@tanstack/react-query";
import React from "react";
import useFetch from "./use-fetch";
import { BASE_URL } from "../lib/utils";
import { useAuth } from "./auth";
import { useSearchParams } from "react-router-dom";

const useProfile = () => {
    const params = useSearchParams()[0];
    // const realParms = new URLSearchParams(params.toString());
    const xnd = params.get("xnd");

    console.log(xnd)

    // const { data, error, fetchData, loading } = useFetch();
    const { user } = useAuth();
    return useQuery({
        queryKey: ["profile", xnd],
        queryFn: async () => {
            return await fetch(BASE_URL + "/profile?xnd=" + params.get("xnd"), {
                headers: { Authorization: "Bearer " + user.uid },
            }).then((e) => e.json());
        },
        // refetchOnMount: true,
        initialData: {},
    });
};

export default useProfile;
