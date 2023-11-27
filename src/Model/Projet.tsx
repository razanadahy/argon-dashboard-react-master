import TypeProjet from "./TypeProjet";
import Plateforme from "./Plateforme";
import {UrlBase} from "../Config.ts";

export default class Projet {
    titre:string
    consigne:string
    reference:string
    url:string
    type:TypeProjet
    creation:Date
    deadLine:Date
    plateforme:Plateforme

    constructor(titre: string, consigne: string, reference: string, url: string, type: TypeProjet, creation: Date, deadLine: Date, plateforme: Plateforme) {
        this.titre = titre;
        this.consigne = consigne;
        this.reference = reference;
        this.url = url;
        this.type = type;
        this.creation = creation;
        this.deadLine = deadLine;
        this.plateforme = plateforme;
    }
    static async insertProjet(token,projet) {
        try {
            const response = await fetch(UrlBase("traitement/projet"), {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(projet),
            });
           return response.ok
        }catch (e) {
            return false
        }
    }
    static async update(token,projet,idProjet) {
        try {
            const response = await fetch(UrlBase("traitement/projet/"+idProjet), {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body:JSON.stringify(projet),
            });
            return response.ok
        }catch (e) {
            return false
        }
    }
}