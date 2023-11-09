import Etat from "./Etat";
import InfoUtilisateur from "./InfoUtilisateur";

export default class Jira {
    reference: string
    url: string
    id: number
    etat: Etat
    developpeur: InfoUtilisateur

    constructor(reference: string, url: string, id: number) {
        this.reference = reference;
        this.url = url;
        this.id = id;
    }

}