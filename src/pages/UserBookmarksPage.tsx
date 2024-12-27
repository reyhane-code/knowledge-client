import ProfileMenu from "../components/ProfileMenu";
import UserContentFeed from "../components/UserContentFeed";
import DefaultLayout from "../components/layouts/DefaultLayout";

const UserBookmarksPage = () => {

  return (
    <>
      <DefaultLayout />

      <div className="flex flex-col lg:flex-row gap-y-2 items-start w-full mt-5 mx-2 px-2">
        <div className="lg:w-1/4 lg:max-width-[25rem] lg:min-width-[16rem] w-full">
          <ProfileMenu />
        </div>

        <div className="flex flex-col flex-grow-1 lg:w-3/4 w-full">
          <div>
            <div role="tablist" className="tabs tabs-bordered">

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab"
                aria-label="Games"
                defaultChecked />
              <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="game" requestType="bookmarks" /></div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Articles" />
              <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="article" requestType="bookmarks" /></div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default UserBookmarksPage;
