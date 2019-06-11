import logger from '../modules/logger';
import * as mssql from 'mssql';
import { IUser } from '../interfaces/models/IUser';
import { HttpError } from '../modules/errors/http.error';
import * as uuid from 'uuid/v4';
import { compare, hash } from '../modules/handlers/hashPromiseHandler';
import { sign } from '../modules/handlers/jwtHandler';

const config = require('../../config');

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

        if (user.recordset.length) {
            return user.recordset[0];
        } else {
            throw new HttpError(404, 'User not found');
        }

    }

    public async create(user: IUser) {

        const pool = await this.db;
        await this.isEmailRegistered(user.email);

        const refresh_token = uuid();
        const password = await hash(user.password);
        try {
            await pool.request()
                .input('firstName', mssql.VarChar(255), user.firstName)
                .input('lastName', mssql.VarChar(255), user.lastName)
                .input('email', mssql.VarChar(255), user.email)
                .input('password', mssql.VarChar(255), password)
                .input('isAdmin', mssql.Bit, +user.isAdmin)
                .input('imageUrl', mssql.VarChar(255), user.imageUrl)
                .input('address', mssql.VarChar(255), user.address)
                .input('phone', mssql.VarChar(255), user.phone)
                .input('refresh_token', mssql.UniqueIdentifier, refresh_token)
                .query('INSERT INTO JUser VALUES (@firstName, @lastName, @email, @password, @isAdmin, @imageUrl, @address, @phone, @refresh_token)');

            return pool.request().query('SELECT * FROM JUser WHERE idUser = @@identity')
                .then((user: any) => {
                    return user.recordset.shift();
                });

        } catch (err) {
            throw err;
        }
    }

    public async isEmailRegistered(email: string) {
        const pool = await this.db;
        const count = await pool.request()
            .input('email', mssql.VarChar(255), email)
            .query(`SELECT * FROM JUser WHERE vEmail = @email`);

        console.log('COUNT', !!count.recordset.length);
        if (!!count.recordset.length) {
            throw new HttpError(409, 'User already exists!');
        }
        return !!count.recordset.length;
    }


    public async userLogin(email: string, password: string) {
        const pool = await this.db;
        let user: any = {};
        try {
            user = await pool.request()
                .input('email', mssql.VarChar(255), email)
                .query('SELECT * FROM JUser WHERE vEmail = @email');

        } catch (err) {
            logger.error(err);
            throw new HttpError(500, 'Server error');
        }

        if (!user.recordset.length) {
            throw new HttpError(403, 'Password or email are incorrect');
        }
        const match = await compare(password, user.recordset[0].vPassword);

        console.log('USER: ', user);
        console.log('Match: ', match);
        if (!match) {
            throw new HttpError(401, 'Password or email are incorrect');
        }

        const payload = {
            idUser: user.recordset[0].idUser,
            isAdmin: user.recordset[0].bIsAdmin,
        };

        const secretKey = config.get('secret');
        const options = { expiresIn: '10h' };

        const token = await sign(payload, secretKey, options);
        const refreshToken = user.recordset[0].refreshToken;

        return {
            access_token: token,
            refresh_token: refreshToken,
            user: prepareUser(user.recordset[0])
        };
    }

    async refreshToken(userId: number, refreshToken: string) {
        const pool = await this.db;
        const user = await pool.request()
            .input('id', mssql.Int, userId)
            .input('refreshToken', mssql.UniqueIdentifier, refreshToken)
            .query('SELECT * FROM JUser WHERE id = @id AND refreshToken = @refreshToken');

        const payload = {
            idUser: user.recordset[0].idUser,
            isAdmin: user.recordset[0].bIsAdmin,
        };

        const secretKey = config.get('secret');
        const options = { expiresIn: '1h' };

        const token = await sign(payload, secretKey, options);

        return {
            refresh_token: refreshToken,
            access_token: token
        };

    }
}

function prepareUser(user: any) {
    const localUser = { ...user };
    delete localUser['vPassword'];
    return localUser;
}