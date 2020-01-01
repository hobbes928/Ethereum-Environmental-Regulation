# Ethereum-Environmental-Regulation Whitepaper
Improving Environmental Transparency and Enforcement using Ethereum Blockchain

Manraj Jawanda

Introduction
Strong legislation currently exists to regulate environmental violations by industrial plants and manufacturing sites. However public transparency and enforcement for offenders is slow and inefficient due to manual processes and environmental data being recorded inside multiple databases. 
EnviroReg (ENVR) helps solve this problem by deploying environmental data to the Ethereum blockchain not only making it publicly transparent but also eliminating much of the manual data entry that is required. 
ENVR uses Ethereum smart contracts to manage environmental agreements between companies and regulators. The contract(s) are designed to retrieve environmental data on the blockchain and automatically penalize offenders that either do not submit records or submit data that is in violation of the agreement.

What is the problem?
Environment Canada has acknowledged, “It is not good enough to adopt laws; legislation must be effectively enforced.” 
Environmental enforcement has seen a consistent decline even though there has been an increase in the number of enforcement officers. Below are some of the reasons why:
  Legal obligations to release reports are not being met in a timely manner. 
  Fines have been so low that their use is no longer effective.
  Information about environmental offenders such as the exact location and nature of the violation is limited. 
  The commissioner of Environment and sustainable development audited environmental enforcement and concluded that public     disclosure of enforcement information is required.

What is the solution?
Enforcement ensures violators get punished and those are compliant are rewarded. Effective enforcement is fast and transparent. ENVR uses Ethereum smart contracts which will receive environmental data submitted by companies and automatically enforce penalties by fining offenders in cryptocurrency. These violations will be published to the Ethereum blockchain and therefore be permanent and available for the public to view.

A proof of concept was developed that focused on drinking water environmental records. Truffle was used to design the front-end interface. A local blockchain was run using Ganache for development and MetaMask was used to manage the ether and submit transactions. 

The contract was deployed to the Ropsten test network as well and MetaMask was used to interface with Infura which ran the smart contracts.

A Water.sol smart contract was developed that automatically manages the interaction between three primary groups:

Companies
  Would represent industrial sites.
  Have names and addresses.
  Have a balance to hold cryptoasset (ether, token, etc).
  Can sign environmental reports which are submitted by third party labs on their behalf.
  
Regulators
  Would represent the government or environmental regulator of some sort.
  Have names and addresses.
  Have a balance to hold cryptoasset.
  Automatically deduct tokens from a Company’s balance whenever there is an environmental violation for a signed/verified     environmental report.
  
Third-party labs
  Laboratories that conduct sample testing sent to them by industrial sites.
  Submit the unsigned/unverified environmental report to the blockchain for the Company to sign and verify.
  Have a balance to hold cryptoasset.

A struct type called report is created which contains all the variables associated with an environmental report:
struct report {
uint pH
uint hardness
uint TDS (Total Dissolved Solids)
address sender (company address)
bool signed (is the report verified by company)
bool latest (is this the latest report for the company)
}
A mapping is used to map a uint to the report variables which is called reportStruct. 
mapping (uint 🡪 report) reportStruct
This maps a uint to each variable inside the struct we called report. We will use the variable reportID to identify each environmental report per company address.
reportStruct
uint
report
reportID
pH
Hardness
TDS
Sender Address
Signed
Latest Report
reportID
reportStruct[reportID].pH
reportStruct[reportID].hardness
reportStruct[reportID].TDS
reportStruct[reportID].sender
reportStruct[reportID].signed
reportStruct[reportID].latest
reportID + 1












reportID + 2













Functions inside the smart contract handle different operations. Some of the functions are shown below.

SubmitReport allows for third party labs to submit environmental reports on behalf of a company.

getLastReport returns the latest report for a company. Used by a company to review environmental data submitted on their behalf by a third party lab.

SignReport is used by a company to sign a report verifying they have confirmed the environmental data submitted on their behalf.

VerifyReport is used by a regulator to confirm the environmental data is compliant with a set of criteria that is agreed upon by both parties.

Summary
The current issues surrounding environmental enforcement are:
  Lack of public disclosure and transparency
  Enforcement is slow and ineffective
  Data around environmental violations is limited
  
We have demonstrated a proof of concept that manages drinking water reports using Ethereum smart contracts three untrusted parties: regulators, companies and third-party laboratories. A smart contract Water.sol was written in solidity and was deployed to a local development blockchain and then to the Ropsten test network. Truffle was used to develop the user interface and MetaMask was used to interact with the smart contract. This proof of concept demonstrates that environmental agreements can be managed using Ethereum smart contracts and could be extended to things like industrial flaring and industrial carbon emissions. The next phase of this project will look to manage industrial flaring using Ethereum smart contracts.
