import axios from "axios"

export const prodList = async () => {
    const { data } = await axios.get('/api/products/all_products');
    return data;
}

export const getUsers = async () => {
    const { data } = await axios.get('/api/user/all_users');

    return data;
}

