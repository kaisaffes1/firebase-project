import { useMutation, useQuery } from "@tanstack/react-query";
import hideBox from "../assets/hideBox";
import getAllUsers from "../utils/getAllUser";
import shareFile from "../utils/shareFile";
import { useUser } from "../Hooks/UserProvider";
import { useEffect, useRef } from "react";

export default function Share({ fileToShare }) {
  const user = useUser();
  const shareFormRef = useRef(null);
  const { isPending, isError, error, data, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const shareMutation = useMutation({
    mutationKey: ["share"],
    mutationFn: handleSubmit,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const targetUserIds = [...formData.keys()];
    const promises = targetUserIds.map((userId) =>
      shareFile(user.uid, userId, fileToShare)
    );
    await Promise.all(promises);
    return true;
  }

  useEffect(() => {
    if (!shareMutation.isSuccess) return;
    shareFormRef.current.close();
  }, [shareMutation.isSuccess]);

  if (isPending) return <h1>Loading Users</h1>;
  else if (isError) return <h1>{error.message}</h1>;
  return (
    <dialog
      id="share-form"
      ref={shareFormRef}
      className="z-40 p-3 bg-black/90 shadow-md text-white rounded w-full max-w-[400px]  max-h-[70vh]"
      onClick={hideBox}
    >
      <form onSubmit={shareMutation.mutate}>
        <h1 className=" sticky top-0 z-20 bg-black w-full text-center font-semibold text-4xl">
          Share With
        </h1>
        <div className="narrow-scroller flex flex-col overflow-y-auto">
          {data.length &&
            data.map(({ info }) => (
              <label key={info.userUid} className="relative text-lg">
                <span>{info.name}</span>
                <input
                  name={info.userUid}
                  type="checkbox"
                  className=" absolute right-2 top-1/2  -translate-y-1/2"
                />
              </label>
            ))}
        </div>
        <button
          disabled={shareMutation.isPending}
          className=" sticky w-full bottom-0 px-4 py-2 disabled:opacity-50 rounded font-medium text-white bg-[#4F46E5]"
        >
          {shareMutation.isPending ? "Sharing" : "Share"}
        </button>
      </form>
    </dialog>
  );
}
