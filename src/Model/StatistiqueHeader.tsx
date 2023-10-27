import {UrlBase} from "../Config.ts";

export default class StatistiqueHeader {
    total:number
    pourcentage:number

    constructor(total: number, pourcentage: number) {
        this.total = total;
        this.pourcentage=pourcentage;
    }

    static async enCours(token) {
        try {
            const response = await fetch(UrlBase("statistique/encours"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                let pr=0
                if (data.last===0){
                    pr=100
                }else if (data.last>data.total){
                    pr=-(data.last/data.total)*100
                }else{
                    pr=(data.total/data.last)*100
                }
                return new StatistiqueHeader(data.total,pr);
            } else {
                return null
            }
        }catch (e) {
            return null
        }
    }

    static async prios(token) {
        try {
            const response = await fetch(UrlBase("statistique/prios"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                return new StatistiqueHeader(data.total,data.last);
            } else {
                return null
            }
        }catch (e) {
            return null
        }
    }

    static async tiket(token) {
        try {
            const response = await fetch(UrlBase("statistique/tiket"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                let pr=0
                if (data.last===0){
                    pr=0
                }else if (data.last>data.total){
                    pr=-(data.last/data.total)*100
                }else{
                    pr=(data.total/data.last)*100
                }
                return new StatistiqueHeader(data.total,pr);
            } else {
                return null
            }
        }catch (e) {
            return null
        }
    }

    static async perforamance(token) {
        try {
            const response = await fetch(UrlBase("statistique/performance"), {
                method: "get",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                const data = await response.json();
                let perf=0
                if (data.total!==0){
                    perf=(data.last/data.total)*100
                    perf=perf.toFixed(0)
                }
                return new StatistiqueHeader(data.total,perf);
            } else {
                return null
            }
        }catch (e) {
            return null
        }
    }
}