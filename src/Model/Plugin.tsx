export default class Plugin {
    nom:string
    ssh:string

    constructor(nom: string, ssh: string) {
        this.nom = nom;
        this.ssh = ssh;
    }
}