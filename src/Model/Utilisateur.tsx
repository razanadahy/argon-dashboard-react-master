import {UrlBase} from "../Config";

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

    static async  login(type, email, mdp) {
        const utilisateur=new Utilisateur(-200,type,email,'')
        try {
            const response = await fetch(UrlBase("login"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new Utilisateur(-100,type,email,mdp)),
            });
            if (response.ok) {
                const ut= await response.json()
                return new Utilisateur(ut.id,type,email,"")
            } else {
                return utilisateur
            }
        } catch (error) {
            return utilisateur
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
            const response = await fetch(BaseUrl("inscription"), {
                method: "POST",
                body: form
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