import { AdminDashboard } from "../api/agent";
//admin actions
// upload sheet
export const uploadSheets = async (files) => {
  console.log("start uploading sheets");
  let promiseArray = files.map((file) => {
    console.log(file, "df");
    return AdminDashboard.uploadSheet(file.id, file.file);
  });
  try {
    const uploadedSheets = await Promise.all(promiseArray);
    console.log("Sheets are uploaded :", { uploadedSheets });
  } catch (e) {
    console.log("sheets uploading error :", e);
  }
};

export const toggleUserStatus = async (user) => {
  console.log(user);
  const userId = parseInt(user.userid);
  const updatedStatus = !user.active;
  const { roles, username } = user;
  const updatedUser = {
    active: updatedStatus,
    roles,
    username,
  };
  console.log({ updatedUser }, userId);
  try {
    const response = await AdminDashboard.updateUser(updatedUser, user.userid);
    console.log("user updated :", response);
  } catch (e) {
    console.log(e.message);
  }
};
