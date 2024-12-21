import { OkPacketParams } from "mysql2";
import { fileSaver } from "uploaded-file-saver";
import { dal } from "../2-utils/dal";
import { NotFoundError } from "../3-models/error-models";
import { VacationModel } from "../3-models/vacation-model";

class VacationService {

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const sql = 'select * from vacations where id = ?';
        const vacations = await dal.execute(sql, [vacationId]);
        return vacations[0];
    }

    async getVacationsWithLikes(userId: number): Promise<VacationModel[]> {
        const sql = `
            SELECT 
            vacations.id as id,
            vacations.destination,
            vacations.description,
            vacations.startDate,
            vacations.endDate,
            vacations.price,
            vacations.imageName,
            EXISTS(SELECT * 
                   FROM likes 
                   WHERE vacations.id = likes.vacationId 
                   AND userId = ?) AS isMyLiked,
            COUNT(likes.userId) AS likesCount
            FROM vacations 
            LEFT JOIN likes ON vacations.id = likes.vacationId
            GROUP BY 
            vacations.id,
            vacations.destination,
            vacations.description,
            vacations.startDate,
            vacations.endDate,
            vacations.price,
            vacations.imageName
            ORDER BY vacations.startDate
            `;

        const vacations = await dal.execute(sql, [userId]);

        return vacations;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validateInsert();
        const sql = 'insert into vacations values (default,?,?,?,?,?,?)';
        const imageName = vacation.img ? await fileSaver.add(vacation.img) : null;
        const values = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, imageName];
        const successParams: OkPacketParams = await dal.execute(sql, values);
        vacation.id = successParams.insertId;
        vacation.imgUrl = imageName;
        return vacation;
    }

    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validateUpdate();
        const oldImageName = await this.getImageName(vacation.id);
        const newImageName = vacation.img ? await fileSaver.update(oldImageName, vacation.img) : oldImageName;
        const sql = `update vacations set destination = ?, description = ?,startDate = ?,endDate = ?,price = ?, imageName = ? where id = ?`;
        const values = [vacation.destination, vacation.description, vacation.startDate, vacation.endDate, vacation.price, newImageName, vacation.id];
        const successParams: OkPacketParams = await dal.execute(sql, values);
        if (successParams.affectedRows === 0) throw new NotFoundError(`id ${vacation.id} not found`);
        const dbVacation = await this.getOneVacation(vacation.id);
        console.log(dbVacation);

        return dbVacation;
    }

    public async deleteVacation(vacationId: number): Promise<void> {
        const deleteLikesSql = 'delete from likes where vacationId = ?';
        await dal.execute(deleteLikesSql, [vacationId]);

        const sql = 'delete from vacations where id = ?';
        await dal.execute(sql, [vacationId]);
    }

    public async addLike(userId: number, vacationId: number): Promise<void> {
        const sql = "insert into likes(userId, vacationId) values(?, ?)";
        await dal.execute(sql, [userId, vacationId]);
    }

    public async removeLike(userId: number, vacationId: number): Promise<void> {
        const sql = "delete from likes where userId = ? and vacationId = ?";
        await dal.execute(sql, [userId, vacationId]);
    }

    private async getImageName(id: number): Promise<string> {
        const sql = "select imageName from vacations where id = ?";
        const values = [id];
        const vacations = await dal.execute(sql, values);
        const vacation = vacations[0];
        if (!vacation) return null;
        return vacation.imageName;
    }

}

export const vacationService = new VacationService();
