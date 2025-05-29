import axios from 'axios';

const API_BASE = '/api/products';

export default {
  async fetchAll(params = {}) {
    const { data } = await axios.get(API_BASE, { params });
    return data;
  },
  async fetchById(id) {
    const { data } = await axios.get(`${API_BASE}/${id}`);
    return data;
  },
  async create(product) {
    const { data } = await axios.post(API_BASE, product);
    return data;
  },
  async update(id, product) {
    const { data } = await axios.put(`${API_BASE}/${id}`, product);
    return data;
  },
  async remove(id) {
    return axios.delete(`${API_BASE}/${id}`);
  }
};
