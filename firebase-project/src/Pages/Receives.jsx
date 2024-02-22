import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CreateFilesTable from "../Components/CreateFilesTable";
import { useUser } from "../Hooks/UserProvider";
import getReceivedFiles from "../utils/getReceivedFiles";
import LoginRequired from "../Components/LoginRequired";
import Loader from "../Components/Loader";

export default function Receives() {
  const user = useUser();
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (user) {
      let unsubscribe;
      try {
        unsubscribe = getReceivedFiles(user.uid, setFiles);
      } catch (err) {
        setError(err);
      }

      return () => unsubscribe();
    }
  }, [user]);

  if (!user) return <LoginRequired message="Login to see what your receive" />;
  else if (files == null) return <Loader />;
  else if (error) return <h1>{error.message}</h1>;
  else if (!files) return <h1>Not File Exist</h1>;

  return (
    <div className="narrow-scroller overflow-x-auto">
      <CreateFilesTable files={files} />
    </div>
  );
}

// import { useQuery } from "@tanstack/react-query";
// import CreateFilesTable from "../Components/CreateFilesTable";
// import { useUser } from "../Hooks/UserProvider";
// import getReceivedFiles from "../utils/getReceivedFiles";
// import LoginRequired from "../Components/LoginRequired";
// import Loader from "../Components/Loader";
// export default function Receives() {
//   const user = useUser();
//   const { isPending, isError, error, data, isSuccess } = useQuery({
//     queryKey: ["my-receives"],
//     queryFn: () => getReceivedFiles(user.uid),
//     enabled: !!user,
//   });

//   if (!user) return <LoginRequired message="Login to see what your receive" />;
//   if (isPending) return <Loader />;
//   else if (isError) return <h1>{error.message}</h1>;

//   return (
//     isSuccess && (
//       <div className="narrow-scroller overflow-x-auto">
//         <CreateFilesTable files={data} />
//       </div>
//     )
//   );
// }
