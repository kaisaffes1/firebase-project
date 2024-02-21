import Navbar from "../Components/Navbar";
import Upload from "../Components/Upload";

export default function Home() {
  return (
    <div className="grid grid-rows-[60px_auto]">
      <Navbar />
      <Upload />
      <h2 className="text-red-400">hello</h2>
    </div>
  );
}
