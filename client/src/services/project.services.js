import axios from "axios"

class ProjectServices {

    constructor() {

        this.axiosApp = axios.create({
            baseURL: import.meta.env.VITE_SERVER_URL
        })

        this.axiosApp.interceptors.request.use(config => {

            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config
        })
    }


    getAllProjects = () => {
        return this.axiosApp.get(`/api/projects`)
    }

    saveProject = projectInfo => {
        return this.axiosApp.post(`/api/projects`, projectInfo)
    }
}

export default new ProjectServices()