import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // TODO: log it out on UI with toast
  }

  if (error.response.data.toLowerCase() === "invalid token") {
    window.location.href = "/";
    // show error with toast that log in session expired
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
