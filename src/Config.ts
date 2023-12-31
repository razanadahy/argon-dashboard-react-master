export function BaseUrlMain(url: string): string {
    // return 'http://10.140.31.21:8080/main/'+url
    //  return 'http://localhost:8080/main/'+url
     return 'https://followup-14li.onrender.com/'+url
}
export function UrlBase(url: string): string{
    // return 'http://10.140.31.21:8080/'+url
    //  return 'http://localhost:8080/'+url
     return 'https://followup-14li.onrender.com/'+url
}
export function GetMdp() {
    return 'niavo jr'
}
export function Next(nextPage,object, navigate) {
    if (object){
        const searchParams = new URLSearchParams({
            projet: JSON.stringify(object),
        });
        navigate(`/${nextPage}?${searchParams.toString()}`);
    }else{
        navigate(`/${nextPage}`);
    }
}
export function GetObjectFromURL() {
    const searchParams = new URLSearchParams(window.location.search);
    const projetParam = searchParams.get('projet');

    if (projetParam) {
        return JSON.parse(projetParam);
    }

    return null;
}