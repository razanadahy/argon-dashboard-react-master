import Etat from "./Etat";
import Stade from "./Stade";
import {UrlBase} from "../Config.ts";

export default class EtatStade {
    etat: Etat
    stade: Stade

    constructor(etat: Etat, stade: Stade) {
        this.etat = etat;
        this.stade = stade;
    }

    static async updateEtatTicket(token,idTicket,idStade,idEtat) {
        try {
            const response = await fetch(UrlBase("projet/stade/ticket/"+idTicket+"/"+idStade+"/"+idEtat), {
                method: "put",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            return response.ok;
        }catch (e) {
            return false
        }
    }
}