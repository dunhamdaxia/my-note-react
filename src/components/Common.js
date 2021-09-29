import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export function useInit(func) {
  const [isLoad,setIsLoad] = useState(false)

  useEffect(()=>{
    if (!isLoad) {
      setIsLoad(true)
      func()
    }
  })
}

export function useQuery() {
  const { search } = useLocation();
  let str = decodeURI(search);
  if (str[0] === "?") {
    str = str.slice(1,str.length)
  }
  let strArr = str.split("&");
  let obj = {};
  strArr.map((iStr)=>{
    let iArr = iStr.split("=");
    if (iArr.length > 1) obj[iArr[0]] = iArr[1]
  })
  return obj;
}