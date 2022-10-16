//Pour raccourcir les requêtes faites avec axios

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzA2OTI3NzkyOWY3NjI5OTBkYjdmNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NTA3NzkwMSwiZXhwIjoxNjY1MzM3MTAxfQ.FOVm_SRahCJB6WG-OmJGYCsPKQDPZwuZzfAUkntconA" 
//token d'administrateur nécessaire pour faire des ajouts

export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${TOKEN}`}
})