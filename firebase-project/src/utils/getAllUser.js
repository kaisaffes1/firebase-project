import { getDocs } from "firebase/firestore";
import { registeredUserCollection } from "../assets/firebase";
export default async function getAllUsers() {
  const userSnapshot = await getDocs(registeredUserCollection);
  const users = userSnapshot.docs.map((doc) => doc.data());
  return users;
}
