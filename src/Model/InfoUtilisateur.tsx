import {UrlBase} from "../Config.ts";

export default class InfoUtilisateur {
    nom: string
    email: string
    id: number
    type: number

    constructor(nom: string, email: string, id: number, type: number) {
        this.nom = nom;
        this.email = email;
        this.id = id;
        this.type = type;
    }

    static async getUser(token) {
        try {
            const response = await fetch(UrlBase("utilisateur"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return await response.json() as InfoUtilisateur
            }
            return null
        }catch (e) {
            return null
        }
    }
    static async getAllUser(token) {
        try {
            const response = await fetch(UrlBase("main/allDev"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return await response.json() as InfoUtilisateur[]
            }
            return []
        }catch (e) {
            return []
        }
    }
}