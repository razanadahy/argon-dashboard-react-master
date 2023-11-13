import {UrlBase} from "../Config.ts";

export default class StatTicketDev {
    afaire:number
    enCours:number
    terminer:number

    constructor(afaire: number, enCours: number, terminer: number) {
        this.afaire = afaire;
        this.enCours = enCours;
        this.terminer = terminer;
    }

    static async getStatDev(token,idDev,idType) {
        try {
            const response = await fetch(UrlBase(`statistique/statTicketDev/${idDev}/${idType}`), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as StatTicketDev;
            } else {
                return null
            }
        }catch (e) {
            return null
        }
    }
}