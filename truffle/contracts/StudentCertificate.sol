// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StudentCertificate{
   
   address public Owner;
   
   struct CertificateDetails {
        bytes StudentName;
        bytes DOB;
        bytes FatherName;
        bytes UniversityCode; //UniversityName to be get from web2 database
        bytes CollegeCode; //CollegeName to be get from web2 database
        bytes Degree;
        bytes Stream;
        bytes Grade;
        bytes Year;
        bytes StudentNumber;
        bytes CertificateNumber;
        bytes CertificateAuthorizedPerson;
        bytes IssuedDate;
   }
  mapping(bytes => CertificateDetails) private Certificates;
  mapping(bytes => bytes) private StaffCredentials;

   constructor(){
    Owner = msg.sender;
   }


   modifier isOwner(address add){
    require(Owner == add,"you don't have access to proceed further");
    _;
   }
   modifier isAccess(string memory userName,string memory Password,address add){
    require(Owner == add || (keccak256(StaffCredentials[bytes(userName)]) == keccak256(bytes(Password))) ,"you are not authorized");
    _;
   }

   function StaffRegistration(string memory StaffName, string memory Password) public isOwner(msg.sender) returns(bool status,bytes memory Message){
        if(StaffCredentials[bytes(StaffName)].length != 0)
        {
            status = false;
            Message = "Staff Already exisit";
        }
        else{
            StaffCredentials[bytes(StaffName)] = bytes(Password);
            status = true;
            Message = "Successfully added";
        }
   }

   function CreateCertificate(string memory userName, string memory Password, CertificateDetails memory details

) public isAccess(userName,Password,msg.sender) returns (bool status,bytes memory Message){
    // if(StaffCredentials[bytes(StudentNumber)])
    //  {
    //     status = false; 
    //     Message = "Staff Already exisit";
    //  }
    //  else{
    //     StaffCredentials[bytes(StudentNumber)] = Password;
    //     status = true;
    //     Message = "Successfully added";
    //  }

}



}