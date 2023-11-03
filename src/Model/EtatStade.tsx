import Etat from "./Etat";
import Stade from "./Stade";

export default class EtatStade {
    etat: Etat
    stade: Stade

    constructor(etat: Etat, stade: Stade) {
        this.etat = etat;
        this.stade = stade;
    }
}