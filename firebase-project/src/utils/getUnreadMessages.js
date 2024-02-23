import { doc, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../assets/firebase";

export default function getUnreadNotifications(userId, callback) {
  const userDoc = doc(db, "users", userId);
  const notificationsCollection = collection(userDoc, "notifications");
  const q = query(notificationsCollection, where("read", "==", false));

  return onSnapshot(q, (snapshot) => {
    let unreadNotifications = [];
    snapshot.forEach((doc) => {
      unreadNotifications.push({ ...doc.data(), id: doc.id });
    });
    callback(unreadNotifications);
  });
}

// export default async function getUnreadMessages(userId, callback) {
//   // const docRef = doc(db, "users", userId);
//   // const userDoc = await getDoc(docRef);
//   // const data = userDoc.data();
//   // console.log(userDoc.data());
//   // const unreadMessages = [];
//   // for(let key in data.notifications)
//   // const q = query(userDoc, where("read", "==", false));
//   // return onSnapshot(q, (snapshot) => {
//   //   let unreadMessages = [];
//   //   snapshot.forEach((doc) => {
//   //     unreadMessages.push(doc.data());
//   //   });
//   //   callback(unreadMessages);
//   // });
// }
