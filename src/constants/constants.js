import imagePath from "./imagePath";

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
export default {
  tabs,
  typeOfArtEvent,
  Category,
};
