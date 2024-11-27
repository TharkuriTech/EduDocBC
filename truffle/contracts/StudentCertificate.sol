// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StudentCertificate {
    address public Owner;
    struct UniversityDetails {
        bytes UserName;
        bytes Password;
        address Add;
    }
    struct StaffDetails {
        bytes UserName;
        bytes Password;
        address Add;
    }

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
    mapping(bytes => StaffDetails[]) private StaffCredentials;
    mapping(bytes => UniversityDetails) private UniversityCredentials;

    constructor() {
        Owner = msg.sender;
    }

    modifier isOwner(address add) {
        require(Owner == add, "you don't have access to proceed further");
        _;
    }

    modifier isUniversityAccess(
        string memory UCode,
        string memory userName,
        string memory Password,
        address add
    ) {
        require(
            (UniversityCredentials[bytes(UCode)].length != 0 &&
                keccak256(UniversityCredentials[bytes(UCode)].UserName) ==
                keccak256(bytes(userName)) &&
                keccak256(UniversityCredentials[bytes(UCode)].Password) ==
                keccak256(bytes(Password))),
            "you are not authorized"
        );
        _;
    }

    modifier isStaffAccess(
        string memory UCode,
        string memory userName,
        string memory Password
    ) {
        bool isAccess = false;
        if (StaffCredentials[bytes(UCode)].length != 0) {
            StaffDetails[] SD = StaffCredentials[bytes(UCode)];
            for (uint128 i = 0; i < SD.length; i++) {
                if (
                    keccak256(StaffCredentials[bytes(UCode)][i].UserName) ==
                    keccak256(bytes(userName)) &&
                    keccak256(StaffCredentials[bytes(UCode)][i].Password) ==
                    keccak256(bytes(Password))
                ) {
                    isAccess = true;
                }
            }
        }

        require(isAccess, "you don't have access to proceed further");
        _;
    }

    function UniversityRegistration(
        string memory UCode,
        string memory UName,
        string memory Password,
        address _add
    ) public isOwner(msg.sender) returns (bool status, bytes memory Message) {
        UniversityDetails UD;
        UD.UserName = bytes(StaffName);
        UD.Password = bytes(Password);
        UD.Add = _add;
        UniversityCredentials[bytes(UCode)] = SD;
        status = true;
        Message = "Successfully inserted";
    }
    function UpdateUniversityDetails(
        string memory UCode,
        string memory UName,
        string memory Password,
        string memory OldPassword,
        address _add,
        bool IsRemove
    ) public isOwner(msg.sender) returns (bool status, bytes memory Message) {
        if (IsRemove) delete UniversityCredentials[bytes(UCode)];
        else {
            staffDetails SD;
            SD.Password = bytes(Password);
            SD.Add = _add;
            UniversityCredentials[bytes(UCode)] = SD;
        }
        status = true;
        Message = "Successfully updated";
    }

    function StaffRegistration(
        string memory UCode,
        string memory StaffName,
        string memory Password,
        address _add
    )
        public
        isUniversityAccess(UCode, StaffName, Password, msg.sender)
        returns (bool status, bytes memory Message)
    {
        StaffDetails SD;
        SD.UserName = bytes(StaffName);
        SD.Password = bytes(Password);
        SD.Add = _add;
        StaffCredentials[bytes(UCode)].push(SD);
        status = true;
        Message = "Successfully inserted";
    }
    function UpdateStaffDetails(
        string memory UCode,
        string memory StaffName,
        string memory Password,
        string memory OldPassword,
        address _add,
        bool IsRemove
    )
        public
        isUniversityAccess(UCode, StaffName, OldPassword, msg.sender)
        returns (bool status, bytes memory Message)
    {
        StaffDetails[] SD = StaffCredentials[bytes(UCode)];
        for (uint128 i = 0; i < SD.length; i++) {
            if (
                keccak256(StaffCredentials[bytes(UCode)][i].UserName) ==
                keccak256(bytes(userName)) &&
                keccak256(StaffCredentials[bytes(UCode)][i].Password) ==
                keccak256(bytes(Password))
            ) {
                if (IsRemove) delete UniversityCredentials[bytes(UCode)];
                else {
                    staffDetails SD = StaffCredentials[bytes(UCode)][i];
                    SD.Password = bytes(Password);
                    SD.Add = _add;
                    StaffCredentials[bytes(UCode)].push(SD);
                }
                break;
            }
        }

        status = true;
        Message = "Successfully updated";
    }

    function CreateCertificate(
        string memory userName,
        string memory Password,
        CertificateDetails memory details
    )
        public
        isStaffAccess(details.UniversityCode, userName, Password)
        returns (bool status, bytes memory Message)
    {
        if (
            Certificates[bytes(CertificateDetails.CertificateNumber)].length !=
            0
        ) {
            status = false;
            Message = "Certificate Already exisit";
        } else {
            Certificates[bytes(CertificateDetails.CertificateNumber)] = details;
            status = true;
            Message = "Successfully added";
        }
    }
    function UpdateCertificate(
        string memory userName,
        string memory Password,
        CertificateDetails memory details
    )
        public
        isStaffAccess(details.UniversityCode, userName, Password)
        returns (bool status, bytes memory Message)
    {
        Certificates[bytes(CertificateDetails.CertificateNumber)] = details;
        status = true;
        Message = "Updated added";
    }
    function GetCertificate(
        string memory DOB,
        string memory RollNumber,
        string memory CertificateNumber
    )
        public
        returns (CertificateDetails memory details, string memory Message)
    {
        CertificateDetails Certdetails = Certificates[bytes(CertificateNumber)];

        if (
            keccak256(details.DOB) == keccak256(DOB) &&
            keccak256(details.StudentNumber) == keccak256(RollNumber) &&
            keccak256(details.CertificateNumber) == keccak256(CertificateNumber)
        ) {
            details = Certdetail;
        } else Message = "Not Found";
    }
}
