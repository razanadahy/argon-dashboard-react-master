import InfoUtilisateur from "./InfoUtilisateur";
import {UrlBase} from "../Config.ts";

export default class StatDev {
    dev: InfoUtilisateur
    nbSite: number
    pourcentage: number

    constructor(dev: InfoUtilisateur, nbSite: number, pourcentage: number) {
        this.dev = dev;
        this.nbSite = nbSite;
        this.pourcentage = pourcentage;
    }
    static async getByTicketRetour(token) {
        try {
            const response = await fetch(UrlBase("statistique/statDashbord/ticketRetour"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return await response.json() as StatDev[]
            }
            return []
        }catch (e) {
            return []
        }
    }

    static async getByAvgDev(token) {
        try {
            const response = await fetch(UrlBase("statistique/statDashbord/avgDev"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return await response.json() as StatDev[]
            }
            return []
        }catch (e) {
            return []
        }
    }
}