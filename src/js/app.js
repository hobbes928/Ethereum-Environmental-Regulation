App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    // $.getJSON('../pets.json', function(data) {
      // var petsRow = $('#petsRow');
      // var petTemplate = $('#petTemplate');

      //for (i = 0; i < data.length; i ++) {
       // petTemplate.find('.panel-title').text(data[i].name);
      //  petTemplate.find('img').attr('src', data[i].picture);
      //  petTemplate.find('.pet-breed').text(data[i].breed);
      //  /petTemplate.find('.pet-age').text(data[i].age);
      //  petTemplate.find('.pet-location').text(data[i].location);
      //  petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

//        petsRow.append(petTemplate.html());
     // }
  //  });
    



    return await App.initWeb3();

    
  },

  initWeb3: async function() {

// Modern dapp browsers...
if (window.ethereum) {
  App.web3Provider = window.ethereum;
  try {
    // Request account access
    await window.ethereum.enable();
  } catch (error) {
    // User denied account access...
    console.error("User denied account access")
  }
}
// Legacy dapp browsers...
else if (window.web3) {
  App.web3Provider = window.web3.currentProvider;
}
// If no injected web3 instance is detected, fall back to Ganache
else {
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);


    return App.initContract();
  },

  initContract: function() {
    
    $.getJSON('Water.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var WaterArtifact = data;
      App.contracts.Water = TruffleContract(WaterArtifact);
    
      // Set the provider for our contract
      App.contracts.Water.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the adopted pets
      //return App.getReport();
    });
    


    
    return App.bindEvents(), App.bindEvents4(), App.bindEvents5(), App.bindEvents6(), App.bindEvents7();
    

   

    



  },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.getlastreport);
  },

  bindEvents2: function() {
    $(document).on('click', '.btn-submit', App.reportsubmit);
  },

  bindEvents3: function() {
    $(document).on('click', '.btn-sign', App.signreport);
  },

  bindEvents4: function() {
    $(document).on('click', '.btn-AddComp', App.companysubmit);
  },

  bindEvents5: function() {
    $(document).on('click', '.btn-AddLab', App.labsubmit);
  },

  bindEvents6: function() {
    $(document).on('click', '.btn-AddReg', App.regulatorsubmit);
  },

  bindEvents7: function() {
    $(document).on('click', '.btn-GetComp', App.getcompany);
  },

  getlastreport: function(event) {

    var adoptionInstance;
    

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
    
      App.contracts.Water.deployed().then(function(instance) {
        adoptionInstance = instance;

    
        // Execute adopt as a transaction by sending account
        //return adoptionInstance.getLastReport.call();
       adoptionInstance.getLastReport.call().then(reportStruct => {
        reportStruct[0];
        reportStruct[1];
        reportStruct[2];
        reportStruct[3];
        console.log('got the report');
        console.log(reportStruct[0])
        $("#reportpH").html(reportStruct[0].c);
        $("#reporthard").html(reportStruct[1].c);
        $("#reportTDS").html(reportStruct[2].c);
        $("#reportSign").html(reportStruct[3]);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  });

  return App.bindEvents2(), App.bindEvents3();

  },

  reportsubmit: function(event) {
    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
    
      var account = accounts[0];
      var pH = $('#inputPH').val();
      var hardness = $('#inputhard').val();
      var tds = $('#inputTDS').val();
      var addr = $('#inputAddr').val();
    
      App.contracts.Water.deployed().then(function(instance) {
        adoptionInstance = instance;
    
        // Execute adopt as a transaction by sending account
        return adoptionInstance.SubmitReport(pH, hardness, tds, addr);
      }).then(function(result) {
        console.log('report submitted');
      }).catch(function(err) {
        console.log(err.message);
      });
    });

    return App.bindEvents3();
  
},


signreport: function(event) {
  var adoptionInstance;

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
  
    var account = accounts[0];
  
    App.contracts.Water.deployed().then(function(instance) {
      adoptionInstance = instance;
  
      // Execute adopt as a transaction by sending account
      return adoptionInstance.SignReport();
    }).then(function(result) {
      console.log('report signed');
    }).catch(function(err) {
      console.log(err.message);
    });
  });

  return App.bindEvents();


},

companysubmit: function(event) {
  var adoptionInstance;

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
  
    var account = accounts[0];
    var addr = $('#inputCAddr').val();
    var name = $('#inputCName').val();
  
    App.contracts.Water.deployed().then(function(instance) {
      adoptionInstance = instance;
  
      // Execute adopt as a transaction by sending account
      return adoptionInstance.addCompany(addr, name);
    }).then(function(result) {
      console.log('company submitted');
    }).catch(function(err) {
      console.log(err.message);
    });
  });
  
  return App.bindEvents7();

},

labsubmit: function(event) {
  var adoptionInstance;

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
  
    var account = accounts[0];
    var addr = $('#inputLAddr').val();
    var name = $('#inputLName').val();
  
    App.contracts.Water.deployed().then(function(instance) {
      adoptionInstance = instance;
  
      // Execute adopt as a transaction by sending account
      return adoptionInstance.addLab(addr, name);
    }).then(function(result) {
      console.log('lab submitted');
    }).catch(function(err) {
      console.log(err.message);
    });
  });
  
  return App.bindEvents3();

},


regulatorsubmit: function(event) {
  var adoptionInstance;

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
  
    var account = accounts[0];
    var addr = $('#inputRAddr').val();
    var name = $('#inputRName').val();
  
    App.contracts.Water.deployed().then(function(instance) {
      adoptionInstance = instance;
  
      // Execute adopt as a transaction by sending account
      return adoptionInstance.addRegulator(addr, name);
    }).then(function(result) {
      console.log('regulator submitted');
    }).catch(function(err) {
      console.log(err.message);
    });
  });
  
  return App.bindEvents3();

},

getcompany: function(event) {

  var adoptionInstance;
  

  web3.eth.getAccounts(function(error, accounts) {
    if (error) {
      console.log(error);
    }
  
    var account = accounts[0];
    var addr = $('#inputAddr').val();
  
    App.contracts.Water.deployed().then(function(instance) {
      adoptionInstance = instance;

  
      // Execute adopt as a transaction by sending account
      //return adoptionInstance.getLastReport.call();
     adoptionInstance.getCompany.call(addr).then(function(result) {
      //console.log('got company');
      console.log(result.toString(5));
      //$("#GetName").html(result);
     }).catch(function(err) {
      console.log(err.message);
    });
  });
});

return App.initContract();

},

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
