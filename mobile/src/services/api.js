import axios from "axios";

export const api = axios.create({
  baseURL: "https://proweb.leoproti.com.br/",
});
