import { UrlBase} from "../Config.ts";
import Jira from "./Jira";

export default class ProjectView {
    idProjet: number
    dateCreation: Date
    deadlines: Date
    nomProjet: string
    nomType:string
    prios: boolean
    nomEtat: string
    jira: Jira


    constructor(idProjet: number, dateCreation: Date, deadlines: Date, nomProjet: string, nomType: string, prios: boolean, nomEtat: string, jira: Jira) {
        this.idProjet = idProjet;
        this.dateCreation = dateCreation;
        this.deadlines = deadlines;
        this.nomProjet = nomProjet;
        this.nomType = nomType;
        this.prios = prios;
        this.nomEtat = nomEtat;
        this.jira = jira;
    }

    static async all(token) {
        try{
            const response = await fetch(UrlBase("projet/allViewProject"), {
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            });
            if (response.ok) {
                return  await response.json() as ProjectView[];
            } else {
                return []
            }   
        }catch (e) {
            return []
        }
    }

}