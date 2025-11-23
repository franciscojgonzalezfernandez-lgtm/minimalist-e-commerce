import axios from "axios";

const teslaApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// TODO interceptores

export { teslaApi };
