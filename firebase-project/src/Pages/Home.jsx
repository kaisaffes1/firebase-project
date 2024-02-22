import { useQuery } from "@tanstack/react-query";
import CreateFilesTable from "../Components/CreateFilesTable";
import getUserFiles from "../utils/getMyFiles";
import { useUser } from "../Hooks/UserProvider";
import Share from "../Components/Share";
import { useState } from "react";
import LoginRequired from "../Components/LoginRequired";
import Loader from "../Components/Loader";
export default function Home() {
  const [fileToShare, setFileToShare] = useState(null);
  const user = useUser();

  const { isPending, isError, error, data, isSuccess } = useQuery({
    queryKey: ["my-files"],
    queryFn: () => (user ? getUserFiles(user.uid) : null),
    enabled: !!user,
  });

  const updateFileToShare = (fileName) => setFileToShare(fileName);

  if (!user) return <LoginRequired message="Login to see your uploads" />;
  else if (isPending) return <Loader />;
  else if (isError) return <h1>{error.message}</h1>;
  else if (!data) return <h1>No File Exist</h1>;

  return (
    isSuccess && (
      <div className="narrow-scroller overflow-x-auto">
        <Share fileToShare={fileToShare} />
        <CreateFilesTable updateFileToShare={updateFileToShare} files={data} />
      </div>
    )
  );
}
