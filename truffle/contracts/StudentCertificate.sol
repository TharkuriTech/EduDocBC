// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StudentCertificate {
    address public Owner;

    struct CertificateDetails {
        bytes UCode;
        bytes StudentName;
        bytes DOB;
        bytes FatherName;
        bytes UniversityCode; 
        bytes CollegeCode; 
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
 
    constructor() {
        Owner = msg.sender;
    }

// ********************** Modifers ****************************************
    modifier isOwner(address add) {
        require(Owner == add, "you don't have access to proceed further");
        _;
    }

  

 //*********************************functions*************** */
    function CreateCertificate(
        CertificateDetails memory details
    )
        public
        isOwner(msg.sender)
        returns (bool status, bytes memory Message)
    {
            bytes memory combinedKey = abi.encodePacked(details.CertificateNumber, details.UCode);
        if (bytes(Certificates[combinedKey].CertificateNumber).length != 0) {
            status = false;
            Message = "Certificate Already exists";
        } else {
            Certificates[combinedKey] = details;
            status = true;
            Message = "Successfully added";
        }
    }

    function UpdateCertificate(
        CertificateDetails memory details
    )
        public
       isOwner(msg.sender)
        returns (bool status, bytes memory Message)
    {
        bytes memory combinedKey = abi.encodePacked(details.CertificateNumber, details.UCode);
        Certificates[combinedKey] = details;
        status = true;
        Message = "Successfully updated";
    }

    function GetCertificate(
        string memory DOB,
        string memory UCode,
        string memory CertificateNumber
    )
        public view
        returns (CertificateDetails memory details, string memory Message)
    {
        bytes memory combinedKey = abi.encodePacked(CertificateNumber, UCode);

        CertificateDetails memory Certdetails = Certificates[combinedKey];

        if (
            keccak256(Certdetails.DOB) == keccak256(bytes(DOB)) &&
            keccak256(Certdetails.CertificateNumber) == keccak256(bytes(CertificateNumber))
        ) {
            details = Certdetails;
        } else {
            Message = "Not Found";
        }
    }
}
