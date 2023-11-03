import {UrlBase} from "../Config.ts";

export default class Stade {
    id:number
    nom: string

    constructor(id: number, nom: string) {
        this.id = id;
        this.nom = nom;
    }
    static async getStades(token) {
        try {
            const response = await fetch(UrlBase("projet/stades"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as Stade[];
            } else {
                return []
            }
        }catch (e) {
            return []
        }
    }
}