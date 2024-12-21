import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { RoleModel } from "../3-models/role-model";
import { UserModel } from "../3-models/user-model";
import { cyber } from "../2-utils/cyber";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError } from "../3-models/error-models";

class UserService {

    public async getAllUsers(): Promise<UserModel[]> {
        const sql = 'select * from users';
        const users = await dal.execute(sql);
        return users;
    }

    public async register(user: UserModel): Promise<string> {
        user.roleId = RoleModel.User;
        user.password = cyber.hash(user.password);

        const sql = "insert into users(firstName, lastName, email, password, roleId) values(?, ?, ?, ?, ?)"
        const values = [user.firstName, user.lastName, user.email, user.password, user.roleId]
        const successParams: OkPacketParams = await dal.execute(sql, values);
        user.id = successParams.insertId;
        const token = cyber.getNewToken(user);
        return token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {

        credentials.password = cyber.hash(credentials.password);

        const sql = "select * from users where email = ? and password = ?";
        const values = [credentials.email, credentials.password];
        const users = await dal.execute(sql, values);
        const user = users[0];
        if (!user) throw new UnauthorizedError(`Incorrect email or password`);

        const token = cyber.getNewToken(user);
        return token;
    }

    public async isEmailExists(email: string): Promise<boolean> {
        const sql = `select count(*) as count from users where email = ?`;
        const result = await dal.execute(sql, [email]);
        return result[0].count > 0;
    }
}

export const userService = new UserService();
