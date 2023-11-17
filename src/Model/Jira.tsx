import Etat from "./Etat";
import InfoUtilisateur from "./InfoUtilisateur";
import {UrlBase} from "../Config.ts";

export default class Jira {
    reference: string
    url: string
    id: number
    etat: Etat
    developpeur: InfoUtilisateur


    constructor(reference: string, url: string, id: number, etat: Etat, developpeur: InfoUtilisateur) {
        this.reference = reference;
        this.url = url;
        this.id = id;
        this.etat = etat;
        this.developpeur = developpeur;
    }

    static async insertTicketBug(token,jira,idSite) {
        try {
            const response = await fetch(UrlBase("traitement/ticketBug/"+idSite), {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(jira),
            });
            return response.ok
        }catch (e) {
            return false
        }
    }
}