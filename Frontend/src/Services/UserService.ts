import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/UserModel";
import { store } from "../Redux/Store";
import { userActions } from "../Redux/UserSlice";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";

class UserService {

    public constructor() {

        // Load token: 
        const token = sessionStorage.getItem("token");

        if (!token) return;

        // Extract user from token and send to redux: 
        this.initUser(token);
    }

    public async register(user: UserModel): Promise<void> {

        // Send user to backend for register: 
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Get back a JWT token: 
        const token = response.data;

        // Extract user from token and send to redux: 
        this.initUser(token);

        // Save token:
        sessionStorage.setItem("token", token);
    }

    // Login as exiting user: 
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send credentials to backend for login: 
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Get back a JWT token: 
        const token = response.data;

        // Extract user from token and send to redux: 
        this.initUser(token);

        // Save token:
        sessionStorage.setItem("token", token);
    }

    // Logout:
    public logout() {

        // Logout from redux: 
        const action = userActions.logoutUser();
        store.dispatch(action);

        // Delete token: 
        sessionStorage.removeItem("token");
    }

    // Extract user from token and send to redux: 
    private initUser(token: string): void {

        // Extract container object from the token (npm i jwt-decode):
        const container = jwtDecode<{ user: UserModel }>(token);

        // Extract user from container: 
        const dbUser = container.user;

        // Init user in global state: 
        const action = userActions.initUser(dbUser);
        store.dispatch(action);
    }

}

export const userService = new UserService();
