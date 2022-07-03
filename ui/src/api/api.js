import CONSTANT from "../constant/constant";
import axios from "axios";

export async function login(payload) {
  const url = `${CONSTANT.BASE_URL}${CONSTANT.AUTH_API.LOGIN}`;
  try {
    const data = await axios.post(url, payload);
    data?.data?.token && localStorage.setItem("token", data.data.token);
    return;
  } catch (error) {
    throw error;
  }
}

export async function resolveToken(payload) {
  const url = `${CONSTANT.BASE_URL}${CONSTANT.AUTH_API.RESOLVE_TOKEN}`;
  try {
    const data = await axios.post(url, payload);
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function createAadhar(payload) {
  const url = `${CONSTANT.BASE_URL}${CONSTANT.DATA.CREATE_AADHAR}`;
  try {
    const data = await axios.post(url, payload, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token") || ""
      }
    });
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function viewAllData() {
  const url = `${CONSTANT.BASE_URL}${CONSTANT.DATA.VIEW_ALL}`;
  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token") || ""
      }
    });
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getData() {
  const url = `${CONSTANT.BASE_URL}${CONSTANT.DATA.USER_DATA}`;
  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token") || ""
      }
    });
    return data.data;
  } catch (error) {
    throw error;
  }
}

export async function getDataBasedOnState(state) {
  const url = `${CONSTANT.BASE_URL}${CONSTANT.DATA.VIEW_ALL}/${state}`;
  try {
    const data = await axios.get(url, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token") || ""
      }
    });
    return data.data;
  } catch (error) {
    throw error;
  }
}
