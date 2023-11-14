import {UrlBase} from "../Config.ts";

export default class Plateforme {
    id: number
    nomPlateforme:string

    constructor(id: number, nomPlateforme: string) {
        this.id = id;
        this.nomPlateforme = nomPlateforme;
    }
    static async getListPlateforme(token) {
        try {
            const response = await fetch(UrlBase("main/plateformes"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as Plateforme[];
            } else {
                return []
            }
        }catch (e) {
            return []
        }
    }
}