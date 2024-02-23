import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import hideBox from "../assets/hideBox";
import getAllUsers from "../utils/getAllUser";
import shareFile from "../utils/shareFile";
import { useUser } from "../Hooks/UserProvider";
import { useEffect, useRef } from "react";

export default function Share({ fileToShare }) {
  const user = useUser();
  const queryClinet = useQueryClient();
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
    if (!targetUserIds.length) throw new Error("Select atleast one");
    const promises = targetUserIds.map((userId) =>
      shareFile(user, userId, fileToShare)
    );
    await Promise.all(promises);
    return true;
  }

  useEffect(() => {
    if (!shareMutation.isSuccess) return;
    shareFormRef.current.close();
    queryClinet.invalidateQueries({ queryKey: ["my-shares"] });
  }, [shareMutation.isSuccess]);

  return (
    <dialog
      id="share-form"
      ref={shareFormRef}
      className="narrow-scroller backdrop:bg-black/50 z-40 p-5 bg-black/90 shadow-md text-white rounded w-full max-w-[400px]  max-h-[70vh]"
      onClick={hideBox}
    >
      {isPending ? (
        "Fetching users"
      ) : (
        <form onSubmit={shareMutation.mutate}>
          <div className=" sticky top-0 bg-black text-center z-20 my-2 p-1">
            <h1 className="w-full font-semibold text-4xl">Share With</h1>
            <small>File to share: {fileToShare}</small>
            {shareMutation.isError && (
              <p className="text-center text-red-800">
                {shareMutation.error.message}
              </p>
            )}
          </div>

          <div className="narrow-scroller flex flex-col overflow-y-auto">
            {data.length &&
              data.map(({ email, userId }) => (
                <label key={userId} className="relative text-lg">
                  <span>{email}</span>
                  <input
                    name={userId}
                    type="checkbox"
                    className=" absolute right-2 top-1/2  -translate-y-1/2"
                  />
                </label>
              ))}
          </div>
          <button
            disabled={shareMutation.isPending}
            className=" sticky w-full bottom-0 mt-3 px-4 py-2 disabled:opacity-50 rounded font-medium text-white bg-[#4F46E5]"
          >
            {shareMutation.isPending ? "Sharing" : "Share"}
          </button>
        </form>
      )}
    </dialog>
  );
}
