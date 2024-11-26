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
   modifier isAccess(bytes userName,bytes Password,address add){
    require(Owner == add || (StaffCredentials[userName] == Password)) ,"you are not authorized");
    _;
   }

   function StaffRegistration(string memory StaffName, string memory Password) public isOwner(msg.sender) returns(bool status,bytes Message){
     if(StaffCredentials[StaffName])
     {
        status = false;
        Message = "Staff Already exisit";
     }
     else{
        StaffCredentials[StaffName] = Password;
        status = true;
        Message = "Successfully added";
     }
     return;
   }

   function CreateCertificate(string memory userName, string memory Password, string memory StudentName, string memory DOB,  string memory FatherName,  string memory UniversityCode, 
        string memory CollegeCode, 
        string memory Degree,
        string memory Stream,
        string memory Grade,
        string memory Year,
        string memory StudentNumber,
        string memory CertificateNumber,
        string memory CertificateAuthorizedPerson,
        string memory IssuedDate

) public isAccess(bytes(userName),bytes(Password),msg.sender) returns (bool status,bytes Message){
    if(StaffCredentials[StaffName])
     {
        status = false;
        Message = "Staff Already exisit";
     }
     else{
        StaffCredentials[StaffName] = Password;
        status = true;
        Message = "Successfully added";
     }
     return;

}



}