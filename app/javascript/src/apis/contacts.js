import axios from "axios";

const fetch = () => axios.get("api/v1/contacts");

const create = payload => axios.post("api/v1/contacts", payload);

const contactsApi = {
  fetch,
  create,
};

export default contactsApi;
