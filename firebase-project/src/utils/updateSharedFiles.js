import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../assets/firebase";

export default async function updateSharedFiles(
  userId,
  fileId,
  receiverName,
  receiverUid
) {
  const userDoc = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDoc);
  const userData = userSnapshot.data();
  const shares = userData?.shares || {};
  const sharedFile = shares[fileId] || { receivers: [] };
  sharedFile.receivers.push({
    receiverName,
    receiverUid,
  });

  shares[fileId] = sharedFile;

  await updateDoc(userDoc, {
    shares: shares,
  });
}
