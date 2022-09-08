import axios from "axios";

//const BASE_URL = 'https://juanroldan1989-moviequotes-v1.p.rapidapi.com/api/v1/quotes'

const BASE_URL = 'https://programming-quotes-api.herokuapp.com/Quotes/random'

export default axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})