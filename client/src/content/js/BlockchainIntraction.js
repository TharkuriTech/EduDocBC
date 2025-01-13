// import {fireAlert} from './app';
import Swal from "sweetalert2";
const Web3 = require('web3');
const web3 = new Web3();
const decodeBytes = (bytes) => web3.utils.hexToUtf8(bytes);

export async function CreateUniversity(param, contract, accounts) {
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
    handleError(error);
  }
}
export async function UpdateUniversity(param, contract, accounts) {
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
    handleError(error);
  }
}
// Function to fetch all university credentials
export async function GetAllUniversities(contract) {
  try {
    const allUniversities = await contract.methods.getAllUniversityCredentials().call();
    console.log("All Universities:", allUniversities);
    return allUniversities; // Return the fetched data
  } catch (error) {
    handleError(error);
  }
}

const handleError = (error) => {
  const errorMessage = error.message.match(/"reason":"([^"]+)"/);
  if (errorMessage) {
    const customError = errorMessage[1];
    fireAlert(customError, "error");
  } else {
    fireAlert("Unable to process your request", "error");
  }
};

const fireAlert = (Msg, type) => {
  Swal.fire(Msg, "", type);
};

export default fireAlert;
