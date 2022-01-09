import {
  Auth,
  GoogleAuthProvider,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "@firebase/auth";

export interface IFirebaseAuthService {
  signInWithGooglePopup: () => Promise<UserCredential>;
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  signInWithRedirect: () => Promise<never>;
}

export class FirebaseAuthService implements IFirebaseAuthService {
  private firebaseAuth: Auth;
  private googleProvider: GoogleAuthProvider;

  constructor(firebaseAuth: Auth, googleProvider: GoogleAuthProvider) {
    this.firebaseAuth = firebaseAuth;
    this.googleProvider = googleProvider;
  }

  public signOut = () => {
    return signOut(this.firebaseAuth);
  };

  public signInWithGooglePopup = () => {
    return signInWithPopup(this.firebaseAuth, this.googleProvider);
  };

  public signInWithRedirect = () => {
    return signInWithRedirect(this.firebaseAuth, this.googleProvider);
  };

  public signInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(this.firebaseAuth, email, password);
  };

  public registerAuthCallback(callback: (user: User | null) => void) {
    onAuthStateChanged(this.firebaseAuth, callback);
  }

  public createUserWithEmailAndPassword = (
    email: string,
    password: string,
    displayName: string
  ) => {
    return this._createUserWithEmailAndPassword(email, password, displayName);
  };

  private _createUserWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password);
  };
}
