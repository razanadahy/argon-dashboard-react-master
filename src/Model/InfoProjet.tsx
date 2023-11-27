import {UrlBase} from "../Config.ts";

export default class InfoProjet {
    idProjet: number
    creation: Date
    deadLine: Date
    nomProjet:string
    consigne:string
    idEtat:number


    constructor(idProjet: number, creation: Date, deadLine: Date, nomProjet: string, consigne: string, idEtat: number) {
        this.idProjet = idProjet;
        this.creation = creation;
        this.deadLine = deadLine;
        this.nomProjet = nomProjet;
        this.consigne = consigne;
        this.idEtat = idEtat;
    }

    static async getProjet(token,idProjet) {
        try {
            const response = await fetch(UrlBase("projet/view/"+idProjet), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return  await response.json() as InfoProjet
            }
            return null
        }catch (e) {
            return null
        }
    }

    static async deleteProjet(token,idProjet) {
        try {
            const response = await fetch(UrlBase("traitement/projet/"+idProjet), {
                method: "delete",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            return response.ok
        }catch (e) {
            return false
        }
    }
}