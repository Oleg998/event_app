import contactsInstance from "./user-api"


export const requestEvent = async (page) =>{
    const { data } = await contactsInstance.get(`/api/events?page=${page}`)   ;
    return data;
}


