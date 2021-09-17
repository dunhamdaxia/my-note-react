function request(url,data,suc = null,err = null) {
  let httpRequest = new XMLHttpRequest();
  httpRequest.open('post',window.host + url,true);
  httpRequest.setRequestHeader("Content-type", "application/json");
  httpRequest.send(JSON.stringify(data));

  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
      let json = httpRequest.responseText;//获取到服务端返回的数据
      console.log("suc",json);
      suc !== null && suc(json);
    } else {
      console.log("err");
      err !== null && err();
    }
  };
}