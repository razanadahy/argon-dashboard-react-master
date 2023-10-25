import {UrlBase} from "../Config.ts";

export  default class Utilisateur {
    id: number
    type: number
    email: string
    mdp: string

    constructor(id: number, type: number, email: string ,mdp:string) {
        this.id = id;
        this.type = type;
        this.email = email;
        this.mdp=mdp;
    }

    static async  login(email, mdp) {
        try {
            const response = await fetch(UrlBase("login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new Utilisateur(-100,100,email,mdp)),
            });
            if (response.ok) {
                return  await response.json()
            } else {
                return false
            }
        } catch (error) {
            return undefined
        }
    }

    static async inscription(user, mdp, type, email) {
        const form=new FormData()
        form.append("nom",user)
        form.append("mdp",mdp)
        form.append("type",type)
        form.append("email",email)
        const utilisateur=new Utilisateur(-500,type,email,'')
        try {
            const response = await fetch("inscription", {
                // method: "POST",
                // body: form,
            });
            if (response.ok) {
                const ut = await response.json()
                return new Utilisateur(ut.id, ut.type, ut.email, "")
            } else {
                console.log(response.status)
                return utilisateur
            }
        } catch (error) {
            console.log(error)
            return utilisateur
        }
    }
}