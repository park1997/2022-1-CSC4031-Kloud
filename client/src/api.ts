import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
const BASE_URL = "http://localhost:8000";

export async function login(
  access_key_public: String,
  access_key_secret: String,
  region: String
) {
  if (access_key_public) {
    return await axios({
      method: "POST",
      url: `${BASE_URL}/login`,
      data: {
        access_key_public: access_key_public,
        access_key_secret: access_key_secret,
        region: region,
      },
    });
  }
}

export function getInfra() {
  const data = axios({
    method: "GET",
    url: `${BASE_URL}/infra/info`,
    data: {},
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return data;
}
export async function getNestedInfra(region: String) {
  const r = localStorage.getItem("region");
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${BASE_URL}/infra/tree`,
    data: {},
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const { data: response }: AxiosResponse = await axios(config);
  const data = {
    orphan: <Object[]>[],
    infra: {
      resource_id: r,
      resource_type: "region",
      children: {},
    },
  };
  // orphan 집어넣기
  for (const o in response.orphan) {
    var obj = {
      resource_id: o,
      resource_type: response.orphan[`${o}`].resource_type,
    };
    data.orphan.push(obj);
  }

  return data;
}
export function getCostHistory() {
  const data = axios({
    method: "GET",
    url: `${BASE_URL}/cost/history/default`,
    data: {},
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return data;
}
export function getSimilarityTrend() {
  const data = axios({
    method: "GET",
    url: `${BASE_URL}/cost/trend/similarity`,
    data: {},
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return data;
}
export function getProphetTrend() {
  const data = axios({
    method: "GET",
    url: `${BASE_URL}/cost/trend/prophet`,
    data: {},
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return data;
}

export function logOut() {
  const data = axios({
    method: "POST",
    url: `${BASE_URL}/logout`,
    data: {
      access_token: localStorage.getItem("access_token"),
    },
  });
}
