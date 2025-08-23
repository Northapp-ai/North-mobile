import { Person, TabType } from "./types";

export const TABS: TabType[] = ["WHY", "WHEN", "WHO"];

export const DEFAULT_TAB: TabType = "WHY";

export const MOCK_PEOPLE: Person[] = [
  {
    id: "1",
    name: "John",
    uri: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Sarah",
    uri: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "3",
    name: "Mike",
    uri: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: "4",
    name: "Emma",
    uri: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "5",
    name: "Alex",
    uri: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

export const DEFAULT_PERSON_ID = "1";
