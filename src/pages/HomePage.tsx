import GamesContainer from "../components/GameContainer";
import GenreList from "../components/GenreList";
import PlatformSelector from "../components/PlatformSelector";
import SortSelector from "../components/SortSelector";

const HomePage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-12 flex flex-col">
        <div className="flex w-full mb-5 gap-x-3">
          <GenreList />
          <PlatformSelector />
          <SortSelector
            sortbyOptions={[
              { value: "-createdAt", label: "Date added" },
              { value: "name", label: "Name" },
              { value: "-metacritic", label: "Popularity" },
              { value: "-rating_top", label: "Average rating" },
            ]}
          />
        </div>
        <div className="w-full">
          <GamesContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
