import axios from "axios";
// TODO: replace with env
const PRODUCT_SERVICE_URL = "http://127.0.0.1:3000/products-queue";

export const PullData = async (requestData: Record<string, unknown>) => {
  return await axios.post(PRODUCT_SERVICE_URL, requestData);
};
