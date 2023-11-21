import TypeTraitement from "./TypeTraitement";
import Plugin from "./Plugin";
import Protection from "./Protection";
import InfoUtilisateur from "./InfoUtilisateur";
import Jira from "./Jira";
import {UrlBase} from "../Config.ts";

export default class Site {
    idSite: number
    nomSite: string
    domaine:string
    plugin: Plugin
    traitement: TypeTraitement
    protection:Protection
    developpeur: InfoUtilisateur
    ticketBug:Jira[]
    finished:boolean

    constructor(idSite: number, nomSite: string, domaine: string, plugin: Plugin, traitement: TypeTraitement, protection: Protection, developpeur: InfoUtilisateur, ticketBug: Jira[], finished: boolean) {
        this.idSite = idSite;
        this.nomSite = nomSite;
        this.domaine = domaine;
        this.plugin = plugin;
        this.traitement = traitement;
        this.protection = protection;
        this.developpeur = developpeur;
        this.ticketBug = ticketBug;
        this.finished = finished;
    }

    static async getSiteById(token,idSite) {
        try {
            const response = await fetch(UrlBase("projet/site/"+idSite), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as Site;
            } else {
                return null
            }
        }catch (e) {
            return null
        }
    }
}