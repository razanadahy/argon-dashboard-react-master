export default class Jira {
    reference: string
    url: string
    id: number

    constructor(reference: string, url: string, id: number) {
        this.reference = reference;
        this.url = url;
        this.id = id;
    }
}