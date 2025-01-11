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
    bytes[] private universityCodes;

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
        UniversityDetails storage university = UniversityCredentials[bytes(UCode)];

        require(
            keccak256(university.UserName) == keccak256(bytes(userName)) &&
            keccak256(university.Password) == keccak256(bytes(Password)) &&
            university.Add == add,
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
            StaffDetails[] memory SD = StaffCredentials[bytes(UCode)];
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
        UniversityDetails memory UD;
        UD.UserName = bytes(UName);
        UD.Password = bytes(Password);
        UD.Add = _add;
        UniversityCredentials[bytes(UCode)] = UD;
        status = true;
        Message = "Successfully inserted";
    }

    function UpdateUniversityDetails(
        string memory UCode,
        string memory UName,
        string memory Password,
        address _add,
        bool IsRemove
    ) public isOwner(msg.sender) returns (bool status, bytes memory Message) {
        if (IsRemove) {
            delete UniversityCredentials[bytes(UCode)];
        } else {
            UniversityDetails memory UD;
            UD.UserName = bytes(UName);
            UD.Password = bytes(Password);
            UD.Add = _add;
            UniversityCredentials[bytes(UCode)] = UD;
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
        StaffDetails memory SD;
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
        StaffDetails[] storage SD = StaffCredentials[bytes(UCode)];
        for (uint128 i = 0; i < SD.length; i++) {
            if (
                keccak256(SD[i].UserName) ==
                keccak256(bytes(StaffName)) &&
                keccak256(SD[i].Password) ==
                keccak256(bytes(Password))
            ) {
                if (IsRemove) {
                    delete StaffCredentials[bytes(UCode)][i];
                } else {
                    SD[i].Password = bytes(Password);
                    SD[i].Add = _add;
                }
                break;
            }
        }

        status = true;
        Message = "Successfully updated";
    }

    function getAllUniversityCredentials() 
    public 
    view 
    returns (UniversityDetails[] memory) 
{
    uint256 length = universityCodes.length;
    UniversityDetails[] memory allUniversities = new UniversityDetails[](length);
    
    for (uint256 i = 0; i < length; i++) {
        allUniversities[i] = UniversityCredentials[universityCodes[i]];
    }
    
    return allUniversities;
}


    function CreateCertificate(
        string memory userName,
        string memory Password,
        CertificateDetails memory details
    )
        public
        isStaffAccess(string(details.UniversityCode), userName, Password)
        returns (bool status, bytes memory Message)
    {
        if (bytes(Certificates[bytes(details.CertificateNumber)].CertificateNumber).length != 0) {
            status = false;
            Message = "Certificate Already exists";
        } else {
            Certificates[bytes(details.CertificateNumber)] = details;
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
        isStaffAccess(string(details.UniversityCode), userName, Password)
        returns (bool status, bytes memory Message)
    {
        Certificates[bytes(details.CertificateNumber)] = details;
        status = true;
        Message = "Successfully updated";
    }

    function GetCertificate(
        string memory DOB,
        string memory RollNumber,
        string memory CertificateNumber
    )
        public view
        returns (CertificateDetails memory details, string memory Message)
    {
        CertificateDetails memory Certdetails = Certificates[bytes(CertificateNumber)];

        if (
            keccak256(Certdetails.DOB) == keccak256(bytes(DOB)) &&
            keccak256(Certdetails.StudentNumber) == keccak256(bytes(RollNumber)) &&
            keccak256(Certdetails.CertificateNumber) == keccak256(bytes(CertificateNumber))
        ) {
            details = Certdetails;
        } else {
            Message = "Not Found";
        }
    }
}
