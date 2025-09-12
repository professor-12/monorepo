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

export const avatars = [
    // Dicebear
    "https://api.dicebear.com/7.x/adventurer/svg?seed=John",
    "https://api.dicebear.com/7.x/bottts/svg?seed=Jane",
    "https://api.dicebear.com/7.x/pixel-art/svg?seed=Alex",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    "https://api.dicebear.com/7.x/fun-emoji/svg?seed=Mike",
    "https://api.dicebear.com/7.x/thumbs/svg?seed=Sarah",

    // Random User
    "https://randomuser.me/api/portraits/men/32.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/men/65.jpg",
    "https://randomuser.me/api/portraits/women/12.jpg",
    "https://randomuser.me/api/portraits/men/78.jpg",
    "https://randomuser.me/api/portraits/women/21.jpg",

    // Pravatar
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=10",
    "https://i.pravatar.cc/150?img=15",
    "https://i.pravatar.cc/150?img=20",
    "https://i.pravatar.cc/150?img=30",
];
