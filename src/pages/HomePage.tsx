import landingImage from "../assets/69872e1efba26d58a941943cc7169a4c3f7d87be.webp";

import SearchBar , { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,

    });
  };


  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-pink-400">
        Shop our unique paintings and customized handmade crochet creations today!
        </h1>
        <span className="text-xl">Your Customized order is just a click away!</span> 
        <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
      </div> 
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
          Place your orders here Now!
          </span>
          <span>
          Welcome to our crochet shop! Place your orders here for pick-up and take away as well as online. Enjoy the convenience of shopping online and picking up your beautifully handcrafted crochet items at your convenience.
          </span>
        
        </div>
      </div>
    </div>
  );
};

export default HomePage;
