import { doc, setDoc } from "firebase/firestore";
import { db } from "../assets/firebase";

export default async function createEmptyUserDoc(userId) {
  const userDoc = doc(db, "users", userId);
  await setDoc(userDoc, {
    receivedFiles: [],
    files: [],
  });
}
