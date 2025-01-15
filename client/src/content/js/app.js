//Sweet Alert
import Swal from "sweetalert2";
export const fireAlert = (Msg, type) => {
    Swal.fire(Msg, "", type);
  };



//Get All university
export const GetUniversityData = async (database) => {
  var UniversityList;
  const snapshot = await database.ref("University").once("value");
  if (snapshot.exists()) {
    const data = snapshot.val();
    UniversityList =
      Object.entries(data).map(([id, details]) => ({ id, ...details }))
    
  }
  return UniversityList;
};