import DefaultLayout from "../components/layouts/DefaultLayout";
import ProfileMenu from "../components/ProfileMenu";
import UserInfoForm from "../components/UserInfoForm";

const ProfilePage = () => {

  return (
    <>
      <DefaultLayout />

      <div className="flex flex-col lg:flex-row items-start gap-y-2 w-full mt-5 mx-2 px-2">
        <div className="w-full lg:max-width-[25rem] lg:min-width-[16rem] lg:w-1/4">
          <ProfileMenu />
        </div>

        <div className="flex flex-col flex-grow-1 lg:w-3/4 w-full">
          <UserInfoForm />
        </div>
      </div>

    </>
  );
};

export default ProfilePage;
