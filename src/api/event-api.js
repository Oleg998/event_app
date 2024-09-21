import contactsInstance from "./user-api"


export const requestEvent = async () =>{
    const {data} =await contactsInstance.get("/api/events");    
    return data;
}


