import InfoUtilisateur from "./InfoUtilisateur";
import {UrlBase} from "../Config.ts";

export default class InfoDev {
    infoUtilisateur: InfoUtilisateur
    enConge:boolean
    pourcentageTacheFini:number

    constructor(infoUtilisateur: InfoUtilisateur, enConge: boolean, pourcentageTacheFini: number) {
        this.infoUtilisateur = infoUtilisateur;
        this.enConge = enConge;
        this.pourcentageTacheFini = pourcentageTacheFini;
    }

    static async getAllDev(token) {
        try {
            const response = await fetch(UrlBase("projet/developpeurs"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return  await response.json() as InfoDev[]
            }
            return []
        }catch (e) {
            return []
        }
    }

    static async numberTicket(token) {
        try {
            const response = await fetch(UrlBase("main/ticketDev"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return  await response.json() as InfoDev[]
            }
            return []
        }catch (e) {
            return []
        }
    }
}