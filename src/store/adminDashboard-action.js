import { AdminDashboard } from "../api/agent";
//admin actions
// upload sheet
export const uploadSheets = async (files) => {
  console.log("start");
  let promiseArray = files.map((file) => {
    console.log(file, "df");
    return AdminDashboard.uploadSheet(file.id, file.file);
  });
  try {
    const reu = await Promise.all(promiseArray);
    console.log({ reu });
  } catch (e) {
    console.log("error :", e);
  }
};
