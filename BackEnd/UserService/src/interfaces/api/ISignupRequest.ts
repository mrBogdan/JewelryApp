import { IRequest } from './IRequest';
import { ISignupUser } from '../models/ISignupUser';

export interface ISignupRequest extends IRequest {
    body: ISignupUser;
}