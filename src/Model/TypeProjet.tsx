import {UrlBase} from "../Config.ts";

export default class TypeProjet {
    id: number
    type: string

    constructor(id: number, type: string) {
        this.id = id;
        this.type = type;
    }

    static async getListTypeProjet(token) {
        try {
            const response = await fetch(UrlBase("main/typeprojets"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as TypeProjet[];
            } else {
                return []
            }
        }catch (e) {
            return []
        }
    }
}