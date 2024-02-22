import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../assets/firebase";
export default async function getUserFiles(userId) {
  const userDocRef = doc(db, "users", userId);
  try {
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // The document data will be returned in the format:
      // { files: { fileName: { metadata, downloadURL }, ... }, permissions: [] }
      return userDocSnap.data().files;
    } else {
      throw new Error("No File Exists");
      //   console.log("No such document!");
    }
  } catch (err) {
    console.log("Error getting document:", err);
    throw err;
  }
}
