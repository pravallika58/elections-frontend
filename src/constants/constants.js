import imagePath from "./imagePath";

export const GOOGLE_API_KEY = "AIzaSyDDWp3_sAHm2vzOpRU8_cwN7vLFICBNm1o";

const tabs = [
  {
    id: 1,
    name: "Today",
    icon: imagePath.icToday,
  },
  {
    id: 2,
    name: "Week",
    icon: imagePath.icWeek,
  },
  {
    id: 3,
    name: "Month",
    icon: imagePath.icMonth,
  },
  {
    id: 4,
    name: "Calendar",
    icon: imagePath.icCalendar,
  },
];

const typeOfArtEvent = [
  {
    id: 1,
    name: "Watch Party",
  },
  {
    id: 2,
    name: "Community Event",
  },
  {
    id: 3,
    name: "House Party",
  },
  {
    id: 4,
    name: "Canvas",
  },
  {
    id: 5,
    name: "Phone Book",
  },
  {
    id: 6,
    name: "Meet and Greet",
  },
];

const Category = [
  {
    id: 1,
    name: "Top Headlines",
    category: "general",
  },
  {
    id: 8,
    name: "Politics",
    category: "politics",
  },
  {
    id: 5,
    name: "Sports",
    category: "sports",
  },
  {
    id: 2,
    name: "Business",
    category: "business",
  },
  {
    id: 3,
    name: "Entertainment",
    category: "entertainment",
  },
  {
    id: 4,
    name: "Health",
    category: "health",
  },
  {
    id: 6,
    name: "Science",
    category: "science",
  },
  {
    id: 7,
    name: "Technology",
    category: "technology",
  },
];

const team = [
  {
    id: 11,
    name: "Jerry W.",
    role: "Designer",
    image: imagePath.icMan5,
  },
  {
    id: 1,
    name: "Pravallika",
    role: "Developer",
    image: imagePath.icLady1,
  },
  {
    id: 2,
    name: "Anuhya",
    role: "Developer",
    image: imagePath.icLady2,
  },
  {
    id: 3,
    name: "Binish",
    role: "Developer",
    image: imagePath.icLady3,
  },
  {
    id: 4,
    name: "Aakanksha",
    role: "Developer",
    image: imagePath.icLady4,
  },
  {
    id: 5,
    name: "Tram",
    role: "Developer",
    image: imagePath.icMan1,
  },
  {
    id: 6,
    name: "Zachary",
    role: "Developer",
    image: imagePath.icMan5,
  },
  {
    id: 7,
    name: "Alex",
    role: "Developer",
    image: imagePath.icMan3,
  },
  {
    id: 8,
    name: "Mitch",
    role: "Developer",
    image: imagePath.icMan4,
  },
  {
    id: 9,
    name: "Brandon",
    role: "Developer",
    image: imagePath.icMan7,
  },
  {
    id: 10,
    name: "Thang",
    role: "Developer",
    image: imagePath.icMan6,
  },
];

export default {
  tabs,
  team,
  typeOfArtEvent,
  Category,
};
