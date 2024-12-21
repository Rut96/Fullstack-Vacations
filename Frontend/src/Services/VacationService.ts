import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { store } from "../Redux/Store";
import { vacationActions } from "../Redux/VacationSlice";
import { appConfig } from "../Utils/AppConfig";

class VacationService {

    // don't need to add redux slice, because using it temporarily in EditVacation
    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get(appConfig.vacationsUrl + vacationId);
        const vacation = response.data;
        return vacation;
    }

    public async getVacationsWithLikes(): Promise<VacationModel[]> {
        const userId = store.getState().user?.id;
        if (!userId) return [];

        const response = await axios.get(appConfig.vacationsWithLikesUrl);
        const vacations = response.data;

        const action = vacationActions.initVacations(vacations);
        store.dispatch(action);
        
        return vacations;
    }

    public async getVacationImage(imgUrl: string): Promise<any> {
        const response = await axios.get(appConfig.vacationImgUrl + imgUrl);
        console.log(JSON.stringify(response));
        const image = response.data;
        return image;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {

        //header for sending not only json, but also files 
        const options: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const response = await axios.post(appConfig.vacationsUrl, vacation, options);
        const dbVacation = response.data;

        const action = vacationActions.addVacation(dbVacation);
        store.dispatch(action);

        return dbVacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {

        const vacationToSend = {
            ...vacation,
            startDate: new Date(vacation.startDate).toISOString().slice(0, 19).replace('T', ' '),
            endDate: new Date(vacation.endDate).toISOString().slice(0, 19).replace('T', ' ')
        };

        const options: AxiosRequestConfig = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        const response = await axios.put<VacationModel>(
            appConfig.vacationsUrl + vacation.id,
            vacationToSend,
            options
        );

        const dbVacation = response.data;

        const action = vacationActions.updateVacation(dbVacation);
        store.dispatch(action);

        return dbVacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + vacationId);
        const action = vacationActions.deleteVacation(vacationId);
        store.dispatch(action);
    }

}

export const vacationService = new VacationService();

