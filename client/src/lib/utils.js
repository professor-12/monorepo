import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const tabList = [
    { name: "For you", id: "for-you" },
    { name: "Channel", id: "channel" },
    { name: "Popular", id: "popular" },
    { name: "Event", id: "event" },
    { name: "Market", id: "market-place" },
];

export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const departments = [
    { dept: "Agricultural and Environmental Engineering", code: "AEE" },
    { dept: "Chemical Engineering", code: "CHE" },
    { dept: "Civil Engineering", code: "CVE" },
    { dept: "Computer Science and Engineering", code: "CSC" },
    { dept: "Electronic and Electrical Engineering", code: "EEE" },
    { dept: "Food Science and Technology", code: "FST" },
    { dept: "Materials Science and Engineering", code: "MSE" },
    { dept: "Mechanical Engineering", code: "MEE" },
];