import axios from 'axios';

export default axios.create({
  baseURL: 'https://wordrace-backend.herokuapp.com/api/v1',
});
