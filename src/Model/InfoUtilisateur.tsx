export default class InfoUtilisateur {
    nom: string
    email: string
    id: number
    type: number

    constructor(nom: string, email: string, id: number, type: number) {
        this.nom = nom;
        this.email = email;
        this.id = id;
        this.type = type;
    }
}