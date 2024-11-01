import serviceInstance from "./index";

const groupPaths = {
  get: "/group/get",
  create: "/group/create",
  leave: "/group/leave",
  rename: "/group/rename",
  changeHost: "/group/change-host",
  addMember: "/group/add-member",
  remove: "/group/remove",
};

export const getGroups = async () => {
  try {
    const data = await serviceInstance.get(groupPaths.get, true);
    return data?.groups || [];
  } catch (error) {
    console.log(error);
  }
};
