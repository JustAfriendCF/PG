
import { FETCH_USER } from "../types";


export const getUser = () => async (dispatch) => {
    const res = await fetch("http://localhost:8080/user/get");
    const data = await res.json();
    console.log(data);
    dispatch({
      type: FETCH_USER,
      payload: data,
    });
  };
  