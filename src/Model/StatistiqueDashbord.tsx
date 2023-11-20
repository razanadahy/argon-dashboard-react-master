import {UrlBase} from "../Config.ts";

export default class StatistiqueDashbord {
    label:string
    valeur: number

    constructor(label: string, valeur: number) {
        this.label = label;
        this.valeur = valeur;
    }
    static async getNumberProject(token,year) {
        try {
            const response = await fetch(UrlBase("statistique/statDashbord/projet/"+year), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return await response.json() as StatistiqueDashbord[]
            }
            return []
        }catch (e) {
            return []
        }
    }
}