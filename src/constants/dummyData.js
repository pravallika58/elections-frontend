import imagePath from "./imagePath";

const favorites = [
  {
    id: 1,
    title: "Flagstaff",
    subtitle: "Arizona",
  },
  {
    id: 2,
    title: "Columbus",
    subtitle: "Ohio",
  },
  {
    id: 3,
    title: "Toledo",
    subtitle: "Ohio",
  },
  {
    id: 4,
    title: "Chicago",
    subtitle: "Illinois",
  },
];

const favorites2 = [
  {
    id: 1,
    title: "Flagstaff",
    label: "Flagstaff, Arizona",
    subtitle: "Coconino County",
  },
  {
    id: 2,
    title: "Columbus",
    label: "Columbus, Ohio",
    subtitle: "Franklin County",
  },
  {
    id: 3,
    title: "Toledo",
    label: "Toledo, Ohio",
    subtitle: "Lucas County",
  },
  {
    id: 4,
    title: "Chicago",
    label: "Chicago, Illinois",
    subtitle: "Cook County",
  },
];

const SECTIONS = [
  {
    title: "What is Approval Voting?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "What would the ballot look like?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title:
      "How would approval voting results differ from plurality voting results?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "Does approval voting violate one person, one vote?",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

const PrivacyPolicy = [
  {
    id: 1,
    description: "Required by law",
  },
  {
    id: 2,
    description:
      "Enforced by law (fines or restrictions to the website in the event of a breach of data privacy)",
  },
  {
    id: 3,
    description: "Written to protect the privacy of the user",
  },
  {
    id: 4,
    description:
      "Explain the user’s data privacy rights and how their data will be collected and used",
  },
  {
    id: 5,
    description:
      "Lay out how to access and delete your personal data within your rights",
  },
  {
    id: 6,
    description: "Include any information about international data transfers",
  },
  {
    id: 7,
    description:
      "Are an agreement allowing the website or app to collect, manage, and use data in the ways outlined in the policy",
  },
  {
    id: 8,
    description:
      "Written to protect the rights of the business, as well as the environment of the business (i.e. terms banning hate speech or harassment of users)",
  },
  {
    id: 9,
    description:
      "Explain owner’s copyright terms, fair use, and general intellectual property rights",
  },
];

const favoriteCandidate = [
  {
    id: 1,
    name: "Joe Biden",
  },
  {
    id: 2,
    name: "Donald Trump",
  },
  {
    id: 3,
    name: "Kanye West",
  },
  {
    id: 4,
    name: "Jill Jones",
  },
  {
    id: 5,
    name: "Fred Dad",
  },
  {
    id: 6,
    name: "Mini Driver",
  },
  {
    id: 6,
    name: "Mini Driver",
  },
  {
    id: 6,
    name: "Mini Driver",
  },
  {
    id: 6,
    name: "Mini Driver",
  },
  {
    id: 6,
    name: "Mini Driver",
  },
  {
    id: 6,
    name: "Mini Driver",
  },
];

const events = [
  {
    id: 1,
    name: "KAKA LIVE PERFORMANC..",
    description:
      "Live performance by the latest sensation of Punjab- KAKA. The singer of viral...",
    image: imagePath.icImg1,
    artist_name: "KAKA",
    event_address: "Jalandhar",
    event_city: "Punjab",
    event_state: "India",
    start_date: "12/12/2020",
    start_time: "12:00",
    end_date: "12/12/2020",
    end_time: "12:00",
    images: [
      imagePath.icImg3,
      imagePath.icImg2,
      imagePath.icImg1,
      imagePath.icImg4,
    ],
  },

  {
    id: 2,
    name: "Grammy Party Report: Inside....",
    description:
      "While Grammy Week is traditionally loaded with parties and showcases a.....",
    image: imagePath.icImg2,
    artist_name: "KAKA",
    event_address: "Jalandhar",
    event_city: "Punjab",
    event_state: "India",
    start_date: "12/12/2020",
    start_time: "12:00",
    end_date: "12/12/2020",
    end_time: "12:00",
    images: [
      imagePath.icImg3,
      imagePath.icImg2,
      imagePath.icImg1,
      imagePath.icImg4,
    ],
  },
  {
    id: 3,
    name: "Hollie Rice | Holliewood.....",
    description:
      "Welcome to the mountains of Holliewood, a magical place wher..",
    image: imagePath.icImg3,
    artist_name: "KAKA",
    event_address: "Jalandhar",
    event_city: "Punjab",
    event_state: "India",
    start_date: "12/12/2020",
    start_time: "12:00",
    end_date: "12/12/2020",
    end_time: "12:00",
    images: [
      imagePath.icImg3,
      imagePath.icImg2,
      imagePath.icImg1,
      imagePath.icImg4,
    ],
  },
  {
    id: 4,
    name: "Harold Smith | Let me tell you.",
    description:
      "The work featured in Harold Smith’s Let me tell you is an exploration of Bla.....",
    image: imagePath.icImg4,
    artist_name: "KAKA",
    event_address: "Jalandhar",
    event_city: "Punjab",
    event_state: "India",
    start_date: "12/12/2020",
    start_time: "12:00",
    end_date: "12/12/2020",
    end_time: "12:00",
    images: [
      imagePath.icImg3,
      imagePath.icImg2,
      imagePath.icImg1,
      imagePath.icImg4,
    ],
  },
];

export default {
  favorites,
  favorites2,
  SECTIONS,
  PrivacyPolicy,
  favoriteCandidate,
  events,
};
