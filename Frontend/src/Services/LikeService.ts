import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { store } from "../Redux/Store";
import { vacationActions } from "../Redux/VacationSlice";

class LikeService {

    public async addLikes(vacationId: number): Promise<void> {
        const userId = store.getState().user?.id;
        if (!userId) return;
        store.dispatch(vacationActions.toggleVacationLike(vacationId));
        await axios.post(appConfig.likesUrl + vacationId);
    }

    public async removeLikes(vacationId: number): Promise<void> {
        const userId = store.getState().user?.id;
        if (!userId) return;
        store.dispatch(vacationActions.toggleVacationLike(vacationId));
        await axios.delete(appConfig.likesUrl + vacationId);
    }
    
}

export const likeService = new LikeService();