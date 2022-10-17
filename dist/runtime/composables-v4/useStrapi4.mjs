import { useStrapiVersion, useStrapiClient } from "#imports";
export const useStrapi4 = () => {
  const client = useStrapiClient();
  const version = useStrapiVersion();
  if (version !== "v4") {
    console.warn("useStrapi4 is only available for v4");
  }
  const find = (contentType, params) => {
    return client(`/${contentType}`, { method: "GET", params });
  };
  const findOne = (contentType, id, params) => {
    return client(`/${contentType}/${id}`, { method: "GET", params });
  };
  const create = (contentType, data) => {
    return client(`/${contentType}`, { method: "POST", body: { data } });
  };
  const update = (contentType, id, data) => {
    if (typeof id === "object") {
      data = id;
      id = void 0;
    }
    const path = [contentType, id].filter(Boolean).join("/");
    return client(path, { method: "PUT", body: { data } });
  };
  const _delete = (contentType, id) => {
    const path = [contentType, id].filter(Boolean).join("/");
    return client(path, { method: "DELETE" });
  };
  return {
    find,
    findOne,
    create,
    update,
    delete: _delete
  };
};
