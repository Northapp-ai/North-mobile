import { User } from "@/app/auth/models/types";
import { TabType } from "./types";

export const TABS: TabType[] = ["WHY", "WHEN", "WHO"];

export const DEFAULT_TAB: TabType = "WHY";

export const MOCK_PEOPLE: User[] = [
  {
    id: "1",
    name: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "password123",
    fullName: "John Doe",
    profilePhoto: "https://randomuser.me/api/portraits/men/1.jpg",
    bio: "Software engineer passionate about mobile development",
  },
  {
    id: "2",
    name: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    password: "password123",
    fullName: "Sarah Johnson",
    profilePhoto: "https://randomuser.me/api/portraits/women/1.jpg",
    bio: "Product manager with 5 years of experience",
  },
  {
    id: "3",
    name: "Mike",
    lastName: "Brown",
    email: "mike.brown@example.com",
    password: "password123",
    fullName: "Mike Brown",
    profilePhoto: "https://randomuser.me/api/portraits/men/2.jpg",
    bio: "UX designer focused on user-centered design",
  },
  {
    id: "4",
    name: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@example.com",
    password: "password123",
    fullName: "Emma Wilson",
    profilePhoto: "https://randomuser.me/api/portraits/women/2.jpg",
    bio: "Marketing specialist and content creator",
  },
  {
    id: "5",
    name: "Alex",
    lastName: "Davis",
    email: "alex.davis@example.com",
    password: "password123",
    fullName: "Alex Davis",
    profilePhoto: "https://randomuser.me/api/portraits/men/3.jpg",
    bio: "Data analyst with expertise in machine learning",
  },
];

export const DEFAULT_PERSON_EMAIL = "john.doe@example.com";
