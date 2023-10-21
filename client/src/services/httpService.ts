import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  console.log("YOOOOOO");

  if (!expectedError) {
    // TODO: log it out on UI with toast
  }

  return Promise.reject(error);
});

function setJwt(jwt?: string) {
  if (!jwt) return;
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};
