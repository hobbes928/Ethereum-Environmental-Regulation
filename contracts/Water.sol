pragma solidity >=0.4.22 <0.6.0;

contract Water {


address private admin;

event getReport (
    uint pH
);

struct report {
    uint ID;
    uint pH;
    uint hardness;
    uint TDS;
    address sender;
    bool latest;
    bool sign;
}

struct CompanyProp {
    address CompanyAddress;
    string Name;
}

struct RegulatorProp {
    address RegulatorAddress;
    string Name;
}

struct LabProp {
    address LabAddress;
    string Name;
}

mapping (uint => report) public reportStruct ;

mapping (uint => CompanyProp) public Company;

mapping (uint => RegulatorProp) public Regulator;

mapping (uint => LabProp) public Lab;

constructor () public {
    
    admin = msg.sender;
    
}  
    
    modifier OnlyAdmin {
        require (admin == msg.sender, "Is not an Admin");
        _;
    }
    
    uint CompanyID;
       
    modifier OnlyCompany {
        for (uint i=0; i < CompanyID; i++){
            if(Company[i].CompanyAddress == msg.sender){
            _;
            return;
        }
    }
        revert();
}

    uint RegulatorID;
       
    modifier OnlyRegulator {
        for (uint i=0; i < RegulatorID; i++){
            if(Regulator[i].RegulatorAddress == msg.sender){
            _;
            return;
        }
    }
        revert();
}

    uint LabID;
       
    modifier OnlyLab {
        for (uint i=0; i < LabID; i++){
            if(Lab[i].LabAddress == msg.sender){
            _;
            return;
        }
    }
        revert();
}
    
    function addCompany (address _company, string memory _name) public OnlyAdmin returns (uint) {
        Company[CompanyID].CompanyAddress = _company;
        Company[CompanyID].Name = _name;
        
        CompanyID += 1;
        return (CompanyID);
    }
    
    function addRegulator (address _regulator, string memory _name) public OnlyAdmin returns (uint) {
        Regulator[RegulatorID].RegulatorAddress = _regulator;
        Regulator[RegulatorID].Name = _name;
        
        RegulatorID += 1;
        return (RegulatorID);
    }
    
    function addLab (address _lab, string memory _name) public OnlyAdmin returns (uint) {
        Lab[LabID].LabAddress = _lab;
        Lab[LabID].Name = _name;
        
        LabID += 1;
        return (LabID);
    }        
    
    function getCompany (address _companyAddress) public view returns (string memory cName) {
        for (uint i=0; i < CompanyID; i++) {
            
            if (Company[i].CompanyAddress == _companyAddress){
            return (Company[i].Name);
        }
    }
}
    
    uint reportID;
    
    function SubmitReport (uint _pH, uint _hardness, uint _TDS, address _companyAddress) public returns (uint) {
        
        //find the latest report and if it is not signed revert state
        for (uint i=0; i < reportID; i++) {
            if (reportStruct[i].sender == _companyAddress && reportStruct[i].latest == true && reportStruct[i].sign == false) {
                revert();
            }
        }
        
        // find the latest report and change the bool to false before adding a new entry for that 
        // company
        for (uint i=0; i < reportID; i++) {
            if (reportStruct[i].sender == _companyAddress && reportStruct[i].latest == true) {
                reportStruct[i].latest = false;
            }
        }
        
        reportStruct[reportID].ID = reportID;
        reportStruct[reportID].pH = _pH;
        reportStruct[reportID].hardness = _hardness;
        reportStruct[reportID].TDS = _TDS;
        reportStruct[reportID].sender = _companyAddress;
        reportStruct[reportID].latest = true;
        reportStruct[reportID].sign = false;
        
        reportID += 1;
        return (reportID);
    }
    


    function getLastReport () public payable returns (uint ph, uint hardness, uint TDS, bool sign) {
        for (uint i=0; i < reportID; i++) {
            if(reportStruct[i].sender == msg.sender && reportStruct[i].latest == true) {
               return (reportStruct[i].pH, reportStruct[i].hardness, reportStruct[i].TDS, reportStruct[i].sign);
               //emit getReport(reportStruct[i].pH);             
            }
            
        } 

    }


    
    function SignReport () public returns (uint pH, uint hardness, uint TDS, bool latest, bool sign) {
        for (uint i=0; i < reportID; i++) {
            if(reportStruct[i].sender == msg.sender && reportStruct[i].latest == true) {
                reportStruct[i].sign = true;
               return (reportStruct[i].pH, reportStruct[i].hardness, reportStruct[i].TDS, reportStruct[i].latest,
               reportStruct[i].sign);
            }
    
        }     
    
    }    



}

    
    
    
    
    
    
    
    
    
    
    
