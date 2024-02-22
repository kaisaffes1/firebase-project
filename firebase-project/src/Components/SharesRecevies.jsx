import { Link } from "react-router-dom";
export default function SharesRecevies() {
  return (
    <div className="w-full my-1 px-2  flex flex-col sm:flex-row justify-center items-center gap-1">
      {["My Files", "receives", "Shares"].map((el) => (
        <Link
          key={el}
          to={el == "My Files" ? "/" : `./${el.toLocaleLowerCase()}`}
          className=" w-full max-w-[400px] py-3 text-center uppercase rounded font-medium text-white bg-[#4F46E5]"
        >
          {el}
        </Link>
      ))}
    </div>
  );
}
