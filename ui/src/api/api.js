import CONSTANT from "../constant/constant"
import axios from "axios"

export async function login(payload) {
  const url = `${CONSTANT.BASE_URL}${CONSTANT.AUTH_API.LOGIN}`
  try {
    const data = await axios.post(url, payload);
    console.log(data, "data");
    data?.data?.token && localStorage.setItem("token", data.data.token);
    return;
  } catch (error) {
    throw error
  }
}

export async function resolveToken(payload) {
  const url = `${CONSTANT.BASE_URL}${CONSTANT.AUTH_API.RESOLVE_TOKEN}`
  try {
    const data = await axios.post(url, payload);
    return data.data;
  } catch (error) {
    throw error
  }
}
