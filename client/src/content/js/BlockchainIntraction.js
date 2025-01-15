// import {fireAlert} from './app';
import Swal from "sweetalert2";
import fireAlert from "../js/app";
const Web3 = require("web3");
const web3 = new Web3();
const decodeBytes = (bytes) => web3.utils.hexToUtf8(bytes);


//**************************************** University Region ******************************/
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
      return true;
    } else {
      fireAlert("Unable to save data", "error");
      return false;
    }
  } catch (error) {
    handleError(error);
    return false;
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
      return true;
    } else {
      fireAlert("Unable to update data", "error");
      return false;
    }
  } catch (error) {
    handleError(error);
    return false;
  }
}
// Function to fetch all university credentials
export async function GetAllUniversities(contract) {
  try {
    const allUniversities = await contract.methods
      .getAllUniversityCredentials()
      .call();
    console.log("All Universities:", allUniversities);
    return allUniversities; // Return the fetched data
  } catch (error) {
    handleError(error);
  }
}

//**************************************** Staff Region ******************************/
export async function AddStaffDetails(param, contract, accounts) {
  try {
    const Result = await contract.methods
      .StaffRegistration(
        param.UCode,
        param.StaffName,
        param.Password,
        param.Address
      )
      .send({ from: accounts[0] });
    if (Result.status) {
      fireAlert("Staff added successfully", "success");
      return true;
    } else {
      fireAlert("Unable to save data", "error");
      return false;
    }
  } catch (error) {
    handleError(error);
    return false;
  }
}
export async function UpdateStaffDetails(param, contract, accounts) {
  try {
    const Result = await contract.methods
      .UpdateStaffDetails(
        param.UCode,
        param.StaffName,
        param.Password,
        param.OldPassword,
        param.Address,
        param.isremove
      )
      .send({ from: accounts[0] });
    if (Result.status) {
      fireAlert("Staff details updated successfully", "success");
      return true;
    } else {
      fireAlert("Unable to update data", "error");
      return false;
    }
  } catch (error) {
    handleError(error);
    return false;
  }
}

//**************************************** Utilities ******************************/
const handleError = (error) => {
  const errorMessage = error.message.match(/"reason":"([^"]+)"/);
  if (errorMessage) {
    const customError = errorMessage[1];
    fireAlert(customError, "error");
  } else {
    fireAlert("Unable to process your request", "error");
  }
};

