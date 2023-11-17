import {UrlBase} from "../Config.ts";

export default class TypeTraitement {
    traitement : string
    id : number


    constructor(traitement: string, id: number) {
        this.traitement = traitement;
        this.id = id;
    }
    static async getTraitement(token) {
        try {
            const response = await fetch(UrlBase("main/traitement"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok){
                return await response.json() as TypeTraitement[]
            }
            return []
        }catch (e) {
            return []
        }
    }

}