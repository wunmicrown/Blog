// export const API_URL='http://localhost:4000/api/v1'     
export const API_URL= import.meta.env.MODE === "development"? 'http://localhost:4000/api/v1' : "https://blog-backend-tdjo.onrender.com"
