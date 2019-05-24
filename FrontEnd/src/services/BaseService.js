import axios from 'axios'
import { JewelryApiGateway } from '../settings/services'

export class BaseService {
    constructor() {
        this.$http = axios.create({
            baseURL: JewelryApiGateway
        })
    }
}