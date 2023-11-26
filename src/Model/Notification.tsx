import {UrlBase} from "../Config.ts";

export default class Notification {
    idObjectNotif: number
    type:number
    nom: string
    url:string
    dateNotif:Date
    idIDentifiant:number
    vue:boolean
    titre: string;

    constructor(idObjectNotif: number, type: number, nom: string, url: string, dateNotif: Date, idIDentifiant: number, vue: boolean, titre: string) {
        this.idObjectNotif = idObjectNotif;
        this.type = type;
        this.nom = nom;
        this.url = url;
        this.dateNotif = dateNotif;
        this.idIDentifiant = idIDentifiant;
        this.vue = vue;
        this.titre = titre;
    }
    static async notifications(token) {
        try {
            const response = await fetch(UrlBase("main/notification"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as Notification[];
            } else {
                return []
            }
        }catch (e) {
            return []
        }
    }

    static async assertVue(token) {
        try {
            const response = await fetch(UrlBase("main/notification"), {
                method: "put",
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