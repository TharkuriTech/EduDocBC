// import {fireAlert} from './app';
import Swal from "sweetalert2";

export async function CreateUniversity(param, contract, accounts) {
  debugger;
  try {
    const Result = await contract.methods
      .UniversityRegistration(
        param.UCode,
        param.UName,
        param.Password,
        param.Address
      )
      .send({ from: accounts[0] });
    if (Result.status) {
      fireAlert("University created successfully", "success");
    } else fireAlert("Unable to save data", "error");
  } catch (error) {
    const errorMessage = error.message.match(/"reason":"([^"]+)"/);
    if (errorMessage) {
      const customError = errorMessage[1];
      fireAlert(customError, "error");
    } else {
      fireAlert("Unable to process your request", "error");
    }
  }
}
export async function UpdateUniversity(param, contract, accounts) {
  debugger;
  try {
    const Result = await contract.methods
      .UpdateUniversityDetails(
        param.UCode,
        param.UName,
        param.Password,
        param.Address,
        param.isremove
      )
      .send({ from: accounts[0] });
    if (Result.status) {
      fireAlert("University updated successfully", "success");
    } else fireAlert("Unable to update data", "error");
  } catch (error) {
    const errorMessage = error.message.match(/"reason":"([^"]+)"/);
    if (errorMessage) {
      const customError = errorMessage[1];
      fireAlert(customError, "error");
    } else {
      fireAlert("Unable to process your request", "error");
    }
  }
}

const fireAlert = (Msg, type) => {
  Swal.fire(Msg, "", type);
};

export default fireAlert;
