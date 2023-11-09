import Difficulte from "./Difficulte";

export default class Protection {
    nom: string
    description:string
    difficulte:Difficulte
    nomFichier: string
    id:number

    constructor(nom: string, description: string, difficulte: Difficulte, nomFichier: string, id: number) {
        this.nom = nom;
        this.description = description;
        this.difficulte = difficulte;
        this.nomFichier = nomFichier;
        this.id = id;
    }
}