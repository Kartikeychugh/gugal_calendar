import { IFirebaseAuthService } from "../services";
import { takeLeading } from "redux-saga/effects";

export const initAuthDetailsSaga = (
  firebaseAuthService: IFirebaseAuthService
) => {
  function* signIn() {
    yield firebaseAuthService.signInWithGooglePopup();
  }

  function* watchSignIn() {
    yield takeLeading("SIGN_IN", signIn);
  }

  return watchSignIn;
};
