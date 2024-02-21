export default async function loginUser(email, password) {
  console.log(email, password);
  return;
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log("User logged in successfully:", user.uid);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error logging in user:", errorCode, errorMessage);
  }
}
