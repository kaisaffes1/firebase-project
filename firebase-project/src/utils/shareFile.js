import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../assets/firebase";
export default async function shareFile(ownerId, userId, fileId) {
  console.log(ownerId, userId, fileId);
  const userDoc = doc(db, "users", userId);
  try {
    await updateDoc(userDoc, {
      receivedFiles: arrayUnion({ ownerId, fileId }),
    });
  } catch (err) {
    throw err;
  }
}
