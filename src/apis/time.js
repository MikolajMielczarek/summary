import axios from "axios"

const BASE_URL = 'https://worldtimeapi.org/api/ip/'

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})