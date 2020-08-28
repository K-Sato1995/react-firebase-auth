import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
const firestore = admin.firestore();

export const authOnCreate = functions.auth
  .user()
  .onCreate(async (user: any) => {
    console.log(user);
    console.log(`Creating document for user ${user.uid}`);
    await firestore.collection("users").doc(user.uid).set({
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      credits: 5,
    });
  });

export const checkUser = functions.https.onCall(async (data, _) => {
  try {
    const user = await admin.auth().getUserByEmail(data.email);
    const isTrusted = user.customClaims?.trusted;
    return { isTrusted: isTrusted };
  } catch (e) {
    throw new functions.https.HttpsError("invalid-argument", e.code);
  }
});

export const createNewUser = functions.https.onCall(async (data, _) => {
  try {
    const user = await admin.auth().createUser({
      email: data.email,
      emailVerified: false,
      password: data.password,
      displayName: data.name,
    });

    if (user) {
      await admin.auth().setCustomUserClaims(user.uid, { trustedUser: true });
    }
    return { status: "ok" };
  } catch (e) {
    throw new functions.https.HttpsError("invalid-argument", e.code);
  }
});
