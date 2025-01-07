const StudentCertificate = artifacts.require("StudentCertificate");

module.exports = function (deployer) {
  deployer.deploy(StudentCertificate);
};
