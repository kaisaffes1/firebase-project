import { Link } from "react-router-dom";
const tableColHeading = ["SeqNo.", "filename", "type", "size", "preview"];
export default function CreateFilesTable({ files, updateFileToShare }) {
  const data = Array.from(Object.entries(files));

  const showSharesForm = () => {
    const box = document.querySelector("#share-form");
    box.showModal();
  };

  return (
    <table className=" w-[95%] border m-2 max-w-[1000px] mx-auto overflow-x-scroll">
      <thead>
        <tr>
          {tableColHeading.map((heading, index) => (
            <th key={index} className="text-center">
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((file, index) => {
          const metaData = file[1].metadata;
          return (
            <tr className="group/tr relative h-8">
              {[
                index + 1,
                metaData.name,
                metaData.contentType,
                metaData.size,
                <Link
                  to={file[1].downloadURL}
                  target="blank"
                  className=" hover:text-blue-600"
                >
                  url
                </Link>,
              ].map((cell) => (
                <td className="text-center first:font-semibold">{cell}</td>
              ))}
              <td className="absolute left-1  font-semibold whitespace-nowrap rounded-full bg-blue-300 px-2 text-sm scale-0 group-hover/tr:scale-100 transition-all duration-100">
                <button
                  onClick={() => {
                    showSharesForm();
                    updateFileToShare(metaData.name);
                  }}
                >
                  {" "}
                  share{" "}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
