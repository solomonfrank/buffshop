import HeroSection from "./hero-section";
import { Trending } from "./trending";

const GameStore = () => {
  const categories = [
    "All Categories",
    "Action",
    "Adventure",
    "Role-Playing Games (RPG)",
    "Simulation",
    "Strategy",
    "Sports",
    "Fighting",
    "Puzzle",
    "Racing",
    "Horror",
    "Party Games",
    "Casual",
    "Sandbox",
  ];

  const featuredCategories = [
    {
      title: "Racing",
      description:
        "Experience the rush of the open road with our immersive racing games.",
      image: "/api/placeholder/400/320",
      bgClass: "bg-gradient-to-r from-orange-500 to-yellow-500",
    },
    {
      title: "Action",
      description:
        "Find fast-paced shooters, thrilling adventures, and intense combat.",
      image: "/api/placeholder/400/320",
      bgClass: "bg-gradient-to-r from-gray-700 to-gray-900",
    },
    {
      title: "Adventure",
      description:
        "Embark on epic quests, explore fantastical worlds, and uncover hidden secrets.",
      image: "/api/placeholder/400/320",
      bgClass: "bg-gradient-to-r from-blue-500 to-purple-500",
    },
  ];

  const trendingGames = Array(4).fill({
    title: "Call Of Duty: Black Ops 3",
    price: "₦25,000.00",
    originalPrice: "₦30,000.00",
    rating: 4.5,
    reviews: 16,
    image: "/api/placeholder/300/400",
  });

  return (
    <div>
      <HeroSection />

      <div className="mt-[4rem]">
        <Trending />
      </div>
    </div>
  );
};

export default GameStore;
