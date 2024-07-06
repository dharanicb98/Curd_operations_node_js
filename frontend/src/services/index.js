import axios from "axios";

const url = process.env.url || "http://localhost:5000";

const getData = async () => {
  try {
    const response = await axios.get(url + "/products");
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error);
  }
};

const postData = async (payload) => {
  try {
    const response = await axios.post(url + "/products", payload);
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error);
  }
};

const putData = async (id, payload) => {
  try {
    const response = await axios.put(`${url}/products/${id}`, payload);
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error);
  }
};

const deleteData = async (id) => {
  try {
    const response = await axios.delete(`${url}/products/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(err?.response?.data?.error);
  }
};

export { getData, postData, putData, deleteData };
