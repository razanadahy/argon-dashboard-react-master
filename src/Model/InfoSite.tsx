import InfoUtilisateur from "./InfoUtilisateur";
import Plugin from "./Plugin";
import TypeTraitement from "./TypeTraitement";
import Protection from "./Protection";
import {UrlBase} from "../Config.ts";

export default class InfoSite {
    responsable: InfoUtilisateur
    nomSite: string
    plugin: Plugin
    domaine: string
    traitement: TypeTraitement
    reference: string
    url:string
    protection: Protection
    idProjet: number

    constructor(responsable: InfoUtilisateur, nomSite: string, plugin: Plugin, domaine: string, traitement: TypeTraitement, reference: string, url: string, protection: Protection, idProjet: number) {
        this.responsable = responsable;
        this.nomSite = nomSite;
        this.plugin = plugin;
        this.domaine = domaine;
        this.traitement = traitement;
        this.reference = reference;
        this.url = url;
        this.protection = protection;
        this.idProjet = idProjet;
    }
    static async insertSite(token,site) {
        try {
            const response = await fetch(UrlBase("traitement/site"), {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(site),
            });
            return response.ok
        }catch (e) {
            return false
        }
    }
    static async updateSite(token,site,idSite) {
        try {
            const response = await fetch(UrlBase("traitement/site/"+idSite), {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(site),
            });
            return response.ok
        }catch (e) {
            return false
        }
    }
}