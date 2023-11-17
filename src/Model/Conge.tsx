import {UrlBase} from "../Config.ts";

export default class Conge {
    debut: Date
    fin: Date

    constructor(debut: Date, fin: Date) {
        this.debut = debut;
        this.fin = fin;
    }
    static async insertConge(token,conge) {
        try {
            const response = await fetch(UrlBase("main/conge"), {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(conge),
            });
            return response.ok
        }catch (e) {
            return false
        }
    }
}