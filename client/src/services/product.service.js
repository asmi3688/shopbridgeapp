import axios from "axios";
const apiUrl = "http://localhost:4000/product"
export const addProduct = (formData) => {
    const bodyFormData = { formData }
    return axios.post(apiUrl, bodyFormData, {
        headers: {
            "content-type": "application/json"
        }
    })
}

export const updateProduct = (formData, id) => {
    const bodyFormData = { formData }
    return axios.put(`${apiUrl}/${id}`, bodyFormData, {
        headers: {
            "content-type": "application/json"
        }
    })
}

export const getProduct = (id) => {
    return axios.get(`${apiUrl}/${id}`, {}, {
        headers: {
            "content-type": "application/json"
        }
    })

}

export const getProducts = () => {
    return axios.get(apiUrl, {}, {
        headers: {
            "content-type": "application/json"
        }
    })
}

export const deleteProduct = (id) => {
    return axios.delete(`${apiUrl}?id=${id}`, {}, {
        headers: {
            "content-type": "application/json"
        }
    })
}