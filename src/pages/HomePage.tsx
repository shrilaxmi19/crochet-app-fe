import landingImage from "../assets/land2.jpg";
// import appDownloadImage from "../assets/appDownload.png";
import SearchBar
//  { SearchForm } 
 from "@/components/SearchBar";
// import { useNavigate } from "react-router-dom";

const HomePage = () => {
//   const navigate = useNavigate();

//   const handleSearchSubmit = (searchFormValues: SearchForm) => {
//     navigate({
//       pathname: `/search/${searchFormValues.searchQuery}`,

//     });
//   };


  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Experience the warmth of handcrafted crochet – shop our unique creations now!
        </h1>
        <span className="text-xl">Your Customized order is just a click away!</span> 
        <SearchBar
          // placeHolder="Search by City or Town"
          // onSubmit={handleSearchSubmit}
        />
      </div> 
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
          Place your orders here for pick-up and take away!
          </span>
          <span>
        
          Welcome to our crochet shop! Place your orders here for pick-up and take away. Enjoy the convenience of shopping online and picking up your beautifully handcrafted crochet items at your convenience.
          </span>
          {/* <img src={appDownloadImage} /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
