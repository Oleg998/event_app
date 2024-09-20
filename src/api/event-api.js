import contactsInstance from "./auth-api"


export const requestEvent = async () =>{
    const {data} =await contactsInstance.get("/api/events");    
    return data;
}


