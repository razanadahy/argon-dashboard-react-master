import Jira from "./Jira";
import {UrlBase} from "../Config.ts";

export default class TicketAssignedDev {
    jira:Jira
    idSite: number
    nomSite: string
    idProjet: number
    nomProjet: string
    typeTicket: number

    constructor(jira: Jira, idSite: number, nomSite: string, idProjet: number, nomProjet: string, typeTicket: number) {
        this.jira = jira;
        this.idSite = idSite;
        this.nomSite = nomSite;
        this.idProjet = idProjet;
        this.nomProjet = nomProjet;
        this.typeTicket = typeTicket;
    }

    static async getTicketAssigned(token) {
        try {
            const response = await fetch(UrlBase("projet/tickets/me"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as TicketAssignedDev[];
            } else {
                return []
            }
        }catch (e) {
            return []
        }
    }
    static async getTicketAssignedByIdDev(token,idDev,typeDev) {
        try {
            const response = await fetch(UrlBase("projet/tickets/"+idDev+"/"+typeDev), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as TicketAssignedDev[];
            } else {
                return []
            }
        }catch (e) {
            return []
        }
    }
}