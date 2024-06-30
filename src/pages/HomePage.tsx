import landingImage from "../assets/Untitled Project.jpg";

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
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
        Transform your space with our curated selection of customized paintings and handmade crochet items – shop our unique creations now!
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
