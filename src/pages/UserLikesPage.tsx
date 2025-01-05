import ProfileMenu from "../components/ProfileMenu";
import UserContentFeed from "../components/UserContentFeed";
import DefaultLayout from "../components/layouts/DefaultLayout";

const UserLikesPage = () => {

  return (
    <>
      <DefaultLayout />

      <div className="flex flex-col lg:flex-row items-start gap-y-2 w-full mt-5 mx-2 px-2">
        <div className="lg:w-1/4 w-full lg:max-width-[25rem] lg:min-width-[16rem]">
          <ProfileMenu />
        </div>

        <div className="flex flex-col flex-grow-1 lg:w-3/4 w-full">
          <div role="tablist" className="tabs tabs-bordered">
            <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Articles" />
            <div role="tabpanel" className="tab-content p-10"><UserContentFeed contentType="article" requestType="likes" /></div>
          </div>


        </div>
      </div>
    </>
  );
};

export default UserLikesPage;
