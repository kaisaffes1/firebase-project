import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../assets/firebase";
import createEmptyUserDoc from "./createEmptyUserDoc";

export default async function createUser(email, password) {
  console.log(email, password);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await createEmptyUserDoc(user.uid, user.email);
    return "User created successfully";
  } catch (error) {
    const errorMessage = error.message;
    throw new Error(`Error creating user: ${errorMessage}`);
  }
}
