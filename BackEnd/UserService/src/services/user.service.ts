import logger from '../modules/logger';
import * as mssql from 'mssql';
import { IUser } from '../interfaces/models/IUser';

export class UserService {
    private readonly db: any;

    constructor(dbPromise: Promise<any>) {
        this.db = dbPromise;
    }

    public async getUserById(id: number): Promise<IUser> {
        const pool = await this.db;
        const user = await pool.request()
            .input('id', mssql.Int, id)
            .query('SELECT * FROM JUser WHERE idUser = @id');

        if (user.recordset.length !== 0) {
            return Promise.resolve(user.recordset);
        } else {

        }
    }

    public async create(user: IUser) {
        try {
            const pool = await this.db;
            const count = await pool.request()
                .input('email', mssql.VarChar(255), user.email)
                .query(`SELECT * FROM JUser WHERE vEmail = @email`);
            if (count.recordset.length === 0) {

                const insert = await pool.request()
                    .input('firstName', mssql.VarChar(255), user.firstName)
                    .input('lastName', mssql.VarChar(255), user.lastName)
                    .input('email', mssql.VarChar(255), user.email)
                    .input('password', mssql.VarChar(255), user.password)
                    .input('isAdmin', mssql.Bit, +user.isAdmin)
                    .input('imageUrl', mssql.VarChar(255), user.imageUrl)
                    .input('address', mssql.VarChar(255), user.address)
                    .input('phone', mssql.VarChar(255), user.phone)
                    .query('INSERT INTO JUser VALUES (@firstName, @lastName, @email, @password, @isAdmin, @imageUrl, @address, @phone)');
            }
        } catch (err) {
            logger.error(err);
        }
    }

    public async getUserByEmailAndPassword(email: string, password: string) {
        try {
            const pool = await this.db;
            const getUser = await pool.request()
                .input('email', mssql.VarChar(255), email)
                .input('password', mssql.VarChar(255), password)
                .query('SELECT * FROM JUser WHERE vEmail = @email AND vPassword = @password');

            return getUser.recordset;

        } catch(err) {
            logger.error(err);
        }
    }
}