import { Link } from "react-router-dom";

export default function Button({ text, link }) {
  return (
    <Link
      to={link}
      className="px-4 py-2 rounded font-medium text-white bg-[#4F46E5]"
    >
      {text}
    </Link>
  );
}
