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
