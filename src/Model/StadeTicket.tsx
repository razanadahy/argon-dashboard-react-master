import Site from "./Site";

import Jira from "./Jira";
import InfoUtilisateur from "./InfoUtilisateur";
import TypeProjet from "./TypeProjet";
import {UrlBase} from "../Config.ts";
import EtatStade from "./EtatStade";

export default class StadeTicket {
    idStadeTiket: number
    idTiket: number
    site: Site
    etatStade: EtatStade[]
    ticket: Jira
    utilisateur: InfoUtilisateur
    typeProjet: TypeProjet


    constructor(idStadeTiket: number, idTiket: number, site: Site, etatStade: EtatStade[], ticket: Jira, utilisateur: InfoUtilisateur, typeProjet: TypeProjet) {
        this.idStadeTiket = idStadeTiket;
        this.idTiket = idTiket;
        this.site = site;
        this.etatStade = etatStade;
        this.ticket = ticket;
        this.utilisateur = utilisateur;
        this.typeProjet = typeProjet;
    }

    static async getStadeTicketByIdProject(token,idProjet) {
        try {
            const response = await fetch(UrlBase("projet/stade/ticket/"+idProjet), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as StadeTicket[];
            } else {
                return []
            }
        }catch (e) {
            return []
        }
    }
}