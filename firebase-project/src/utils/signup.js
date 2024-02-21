async function createUser(email, password) {
  try {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    // Signed in
    const user = userCredential.user;
    console.log("User created successfully:", user.uid);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw new Error("Error creating user:", errorCode, errorMessage);
  }
}
