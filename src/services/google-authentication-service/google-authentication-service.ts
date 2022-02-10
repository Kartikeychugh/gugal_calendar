import { GoogleGAPIService } from "../google-client-service/google-client-service";

export class GoogleAuthenticationService {
  private googleGapiService: GoogleGAPIService;

  constructor(googleGapiService: GoogleGAPIService) {
    this.googleGapiService = googleGapiService;
  }

  public async isSignedIn(): Promise<boolean> {
    const GoogleAuth = await this.googleGapiService.getAuth();
    return GoogleAuth.currentUser.get().isSignedIn();
  }

  public async signIn(): Promise<any> {
    const GoogleAuth = await this.googleGapiService.getAuth();
    return GoogleAuth.signIn();
  }

  public ensureServiceInitialised() {
    return this.googleGapiService.ensureGAPIInitialised();
  }

  public async ensureSignIn(): Promise<void> {
    const isSignedIn = await this.isSignedIn();

    if (!isSignedIn) {
      console.log("Need to login");
      return this.signIn().then((user: any) => {
        console.log("Logged in", user);
        return user;
      });
    } else {
      console.log("Already logged in");
      return this.getCurrentUser();
    }
  }
  // public getIdToken() {}
  // public getAccessToken() {}

  public async getCurrentUser() {
    const GoogleAuth = await this.googleGapiService.getAuth();
    return GoogleAuth.currentUser.get();
  }
}
