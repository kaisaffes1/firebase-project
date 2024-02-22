import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../assets/firebase";
import createEmptyUserDoc from "./createEmptyUserDoc";

export default async function createUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created successfully:", user);
    await createEmptyUserDoc(user.uid);
    return "User created successfully";
  } catch (error) {
    console.log(error.message);
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error(`Error creating user: ${errorMessage}`);
  }
}
