import axios from "axios";


const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNmMzOWQ1OWIwOTgwZjFjYmMxMWM3N2Y5NzE3NDEyZiIsIm5iZiI6MTcyNDUyMTEwNS4yNDY3NzgsInN1YiI6IjY0YWI4NjQ5YjY4NmI5MDBlZGZhMTRiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Jq4AVPwbwj0IsV07W7AuIaEi4sf5Ikaa2XqvQHTMCaw'
  }
})

export default instance;