import { useUser } from "../Hooks/UserProvider";
import Button from "./Button";
import signOutUser from "../utils/signout";
import SharesRecevies from "./SharesRecevies";

export default function Navbar() {
  const user = useUser();

  const showUploader = () => {
    const box = document.querySelector("#upload-box");
    box.showModal();
  };

  return (
    <div>
      <nav className=" sticky px-2 w-screen h-[60px] bg-blue-500 text-white flex items-center justify-between ">
        <h1>File Sharing</h1>
        <div>
          {user ? (
            <div className=" flex items-center gap-2">
              <div className="bg-blue-400 rounded-full p-2">
                <img className=" w-4" src="/bell-regular.svg" alt="bell" />
              </div>
              <button
                onClick={showUploader}
                className="px-4 py-2 rounded font-medium text-white bg-[#4F46E5]"
              >
                Upload
              </button>
              <div
                title="Signout"
                onClick={signOutUser}
                className="bg-blue-400 rounded-full p-2"
              >
                <img
                  className=" w-4"
                  src="/arrow-right-from-bracket-solid.svg"
                  alt="bell"
                />
              </div>
            </div>
          ) : (
            <Button text="Sign Up" link="./auth/login" />
          )}
        </div>
      </nav>
      <SharesRecevies />
    </div>
  );
}
