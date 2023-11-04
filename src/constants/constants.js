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
export default {
  tabs,
  typeOfArtEvent,
};
