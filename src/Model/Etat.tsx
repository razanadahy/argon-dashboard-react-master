export default class Etat {
    id:number
    nom: string
    valeur: number

    constructor(id: number, nom: string, valeur: number) {
        this.id = id;
        this.nom = nom;
        this.valeur = valeur;
    }
}