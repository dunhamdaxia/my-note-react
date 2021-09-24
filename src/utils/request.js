import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.baseURL = 'http://127.0.0.1:8080';

export function postJson (url,data,suc = null,err = null) {
  let token = localStorage.getItem("note-token");
  if (token) {
    axios.defaults.headers.token = token;
  }
  axios.post(url, data)
    .then(function (response) {
      if (response && response.status === 200) {
        suc && suc(response.data)
        return
      }
      throw response.statusText;
    })
    .catch(function (error) {
      err && err(error)
    });
}
