import {BaseUrlMain} from "../Config.ts";
import axios from "axios";

export  class TypeTraitement {
    traitement : string
    id : number


    constructor(traitement: string, id: number) {
        this.traitement = traitement;
        this.id = id;
    }


    static async list(token) {
        // const headers = {
        //     'Authorization': `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        // };
        //
        // await axiosInstance.get(BaseUrlMain("traitement"), { headers })
        //     .then(response => {
        //         console.log(response.data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
        // console.log("........")


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${"dlfjsdlkfsdkjfhksdjfhdskjfhsdkjfhsdkjfshdkjf"}`);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/main/traitement", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
}


// const response = await fetch(BaseUrlMain("traitement"), {
//     method: "get",
//     // headers: {
//     //     'Content-Type': 'application/json',
//     //     'Accept': 'application/json',
//     //     'Access-Control-Allow-Origin':'*',
//     //     'Access-Control-Allow-Credentials': 'true',
//     //     'Authorization': `Bearer ${token}`
//     // },
// });
// if (response.status === 200) {
//     const data = await response.json();
//     console.log(data)
// } else {
//     console.log(response)
// }
// if (response.ok) {
//     const data = await response.json();
//     return data.map((item: any) => new TypeTraitement(item.traitement,item.id));
// } else {
//     console.error("Error data:", response.status);
// }