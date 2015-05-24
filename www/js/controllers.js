angular.module('hambayo.controllers', [])

.factory('InitialData', function($http) {
  var InitialData = {};
  InitialData.get = function(callback) {
    $http.get('http://www.stlm.gov.za/loadshedding/sheddingstatus_android.php')
      .success(function(data) {
        callback(data);
      });
    };
  return InitialData;
})

.factory('LoginData', function($http, $rootScope) {
  var LoginData = {};

  LoginData.get = function(callback) {
    $http.get('https://www.stlm-online.co.za/json/finance/accounts/login.php',{params: {username:$rootScope.u, password:$rootScope.p}})
      .success(function(data) {
        status=data.login;
        if(status=='auth_error'){
          $rootScope.$broadcast('handleAuthData', status);
          console.log('Login error',status);
        }else{
          $rootScope.uid=data.id;
          $rootScope.stat=data.login;
          console.log('Login success');
        }
        callback(data);
      });
    };
  return LoginData;
})

.factory('eMeterData', function($http, $rootScope) {

  var meters = [];

  return {
    getMeters: function(){
      return $http.get('https://www.stlm-online.co.za/json/finance/prepaid/listMeters.php?user_id=' + $rootScope.uid).then(function(response){
        meters = response.data;
        $rootScope.$broadcast('handleEmeterData', meters);
        return meters;
      })
    },
    removeMeter: function(meter_id){
      return $http.get('https://www.stlm-online.co.za/json/finance/prepaid/removeMeter.php?user_id=' + $rootScope.uid + "&meter_id=" + meter_id).then(function(response){
        meters = response.data;
        $rootScope.$broadcast('handleEmeterData', meters);
        return meters;
      })
    },
    saveMeters: function($params){
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: 'https://www.stlm-online.co.za/json/finance/prepaid/addMeters.php',
        method: "POST",
        data: $params,
      })
        .success(function(addData){
          meters = addData;
          $rootScope.$broadcast('handleEmeterData', meters);
        });
    }
  }
})

.factory('loginRegisterData', function($http, $rootScope) {

  var login = [];

  return {
    check: function($user){
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: 'https://www.stlm-online.co.za/json/finance/accounts/uniquelogin.php',
        method: "POST",
        data: $user,
      })
        .success(function(data){
          status = data.status;
          $rootScope.$broadcast('handleCheckUser', status);
        })
    },
    register: function($params){
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: 'https://www.stlm-online.co.za/json/finance/accounts/addLogin.php',
        method: "POST",
        data: $params,
      })
        .success(function(addData){
          login = addData;
          $rootScope.$broadcast('handleLoginData', login);
        });
    }
  }
})

.factory('accountsData', function($http, $rootScope) {

  var accounts = [];

  return {
    getAccounts: function(){
      return $http.get('https://www.stlm-online.co.za/json/finance/accounts/accounts.php?username=' + $rootScope.u + "&password=" + $rootScope.p).then(function(response){
        accounts = response.data;
        $rootScope.$broadcast('handleAccountData', accounts);
        return accounts;
      })
    },
    removeAccount: function(account_id){
      return $http.get('https://www.stlm-online.co.za/json/finance/accounts/removeAccount.php?user_id=' + $rootScope.uid + "&account_id=" + account_id).then(function(response){
        accounts = response.data;
        $rootScope.$broadcast('handleAccountData', accounts);
        return accounts;
      })
    },
    saveAccount: function($params){
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: 'https://www.stlm-online.co.za/json/finance/accounts/addAccounts.php',
        method: "POST",
        data: $params,
      })
        .success(function(addData){
          accounts = addData;
          $rootScope.$broadcast('handleAccountData', accounts);
        });
    }
  }
})

.factory('sseMeterData', function($http, $rootScope) {

  var meters = [];

  return {
    getMeters: function(){
      return $http.get('https://www.stlm-online.co.za/json/finance/self_service/listMeters.php?user_id=' + $rootScope.uid).then(function(response){
        meters = response.data;
        $rootScope.$broadcast('handleSSEmeterData', meters);
        return meters;
      })
    },
    removeMeter: function(meter_id){
      return $http.get('https://www.stlm-online.co.za/json/finance/self_service/removeMeter.php?user_id=' + $rootScope.uid + "&meter_id=" + meter_id).then(function(response){
        meters = response.data;
        $rootScope.$broadcast('handleSSEmeterData', meters);
        return meters;
      })
    },
    saveMeters: function($params){
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: 'https://www.stlm-online.co.za/json/finance/self_service/addMeter.php',
        method: "POST",
        data: $params,
      })
        .success(function(addData){
          meters = addData;
          $rootScope.$broadcast('handleSSEmeterData', meters);
        });
    }
  }


})

.factory('ssMeterReadingData', function($http, $rootScope) {

  var readings = [];

  return {
    getReadings: function(meter_id){
      return $http.get('https://www.stlm-online.co.za/json/finance/self_service/listReadings.php?user_id=' + $rootScope.uid + '&meter_id=' + meter_id).then(function(response){
        readings = response.data;
        $rootScope.$broadcast('handleSSReadingData', readings);
        return readings;
      })
    },
    removeReading: function(meter_id,reading_id){
      return $http.get('https://www.stlm-online.co.za/json/finance/self_service/removeReading.php?user_id=' + $rootScope.uid + "&meter_id=" + meter_id + "&reading_id=" + reading_id).then(function(response){
        readings = response.data;
        $rootScope.$broadcast('handleSSReadingData', readings);
        return readings;
      })
    },
    saveReading: function($params){
      return $http({
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        url: 'https://www.stlm-online.co.za/json/finance/self_service/addReading.php',
        method: "POST",
        data: $params,
      })
        .success(function(addData){
          readings = addData;
          $rootScope.$broadcast('handleSSReadingData', readings);
        });
    }
  }


})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $rootScope, LoginData, loginRegisterData, $ionicLoading, $ionicPopup) {


  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/smsoptions.html', {
    scope: $scope
  }).then(function(smsmodal) {
    $scope.smsmodal = smsmodal;
  });

  // Create the Register modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(regmodal) {
    $scope.regmodal = regmodal;
  });

  // Triggered in the modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.closeSMS = function() {
    $scope.smsmodal.hide();
  };

  $scope.closeRegister = function() {
    $scope.regmodal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();

  };

  // Open the SMS options modal
  $scope.smsoptions = function() {
    $scope.smsmodal.show();
    $scope.settingsList = [
    { text: "Accounts", checked: true },
    { text: "Services", checked: false }
    ];
  };

  // Open the Register modal
  $scope.openRegister = function() {
    $scope.regmodal.show();
  };

  // Perform SMS option changes
  $scope.smsaccountChange = function(){

  };

  $scope.smsservicesChange = function(){

  };

  $scope.checkUser = function(data){
    var checkname = data.$viewValue;
    if(checkname.length>0){
      $params = ({params:{
        "user":checkname
      }})
      loginRegisterData.check($params);
    }
  };

  $scope.$on('handleCheckUser', function(events, status){
    $scope.status=status;
  });

  $scope.doRegister = function(loginData){
    $params = ({params:{
      "user":loginData.username,
      "pass":loginData.password,
      "account":loginData.account,
      "eservice":loginData.eservice
    }})
    loginRegisterData.register($params);
    $scope.closeRegister();
  }

  $scope.$on('handleAuthData', function(events, status){
    // An alert dialog
   var alertPopup = $ionicPopup.alert({
     title: 'Login status',
     template: 'Username or Password incorrect, please try again.'
   });
   alertPopup.then(function(res) {
   });
  });

  $scope.helpAccount = function(){
    var alertPopup = $ionicPopup.alert({
      title: 'Registration help',
      template: '<strong>Email:</strong> This will be used as your login username.<br><strong>Password:</strong> Use a secure password that you will remember. <br><strong>Account No:</strong> Your STLM account number in the top right corner of the municipal invoice.The number ends with an X.<br><strong>E-service No:</strong> On the municipal invoice, below the Totals value you will find the ACT CODE or E-Service number, use that number here.'
    });
  }

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $rootScope.u=$scope.loginData.username;
    $rootScope.p=$scope.loginData.password;

    LoginData.get(function(data){
        $scope.stat=data;
        $scope.$emit('loginStatus', data);

    })

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 200);
  };
})

.controller('eMeterCtrl', function($scope, $ionicModal, $timeout, eMeterData, $rootScope, $ionicLoading) {
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });

  $scope.name = 'eMeterCtrl';

  $ionicModal.fromTemplateUrl('templates/meterelect.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $ionicModal.fromTemplateUrl('templates/meterelectremove.html', {
      scope: $scope
    }).then(function(modalr) {
      $scope.modalr = modalr;
    });

  $scope.closeMeterElect = function() {
      $scope.modal.hide();
      $scope.modalr.hide();
    };

  $scope.addmeter = function() {
      $scope.modal.show();
    };

  $scope.removemeter = function() {
      $scope.modalr.show();
    };

  eMeterData.getMeters().then(function(meters){
    $scope.meters = meters;
    $ionicLoading.hide();
  });


  $scope.$on('handleEmeterData', function(events, meters){
    $scope.meters = meters;
    $ionicLoading.hide();
  });

  $scope.doAddEMeter = function(meterData){
    $params = ({params:{
      "description":meterData.description,
      "serial":meterData.serial,
      "user_id":$rootScope.uid
    }})
    eMeterData.saveMeters($params);
    $scope.closeMeterElect();
  }

  $scope.pushNotificationChange = function(id){
    eMeterData.removeMeter(id);
    console.log("Meter ID", id);
  }

})

.controller('AccountsCtrl', function($scope, $ionicModal, $stateParams, $rootScope, accountsData, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });

  $scope.name = 'AccountsCtrl';

  $ionicModal.fromTemplateUrl('templates/addaccount.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/accountremove.html', {
    scope: $scope
  }).then(function(modalr) {
    $scope.modalr = modalr;
  });

  $scope.addAccount = function(){
    $scope.modal.show();
  };

  $scope.removeAccount = function() {
    $scope.modalr.show();
  };

  $scope.closeAddAccount = function(){
    $scope.modal.hide();
  };

  $scope.closeRemoveAccount = function(){
    $scope.modalr.hide();
  };

  accountsData.getAccounts().then(function(accounts){
    $scope.accounts = accounts;
    $ionicLoading.hide();
  });

  $scope.$on('handleAccountData', function(events, accounts){
    $scope.accounts = accounts;
    $ionicLoading.hide();
  });

  $scope.doAddAccount = function(accountData){
      $params = ({params:{
        "accountnumber":accountData.number,
        "eservicenumber":accountData.eService,
        "user_id":$rootScope.uid
      }})
      accountsData.saveAccount($params);
      $scope.closeAddAccount();
    }

    $scope.pushNotificationChange = function(id){
      accountsData.removeAccount(id);
      console.log("Account ID", id);
    }

})

.controller('ssEreadingsCtrl', function($scope, $ionicModal, $timeout, sseMeterData, $rootScope, $ionicLoading) {
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });

  $scope.name = 'ssEreadingsCtrl';

  $ionicModal.fromTemplateUrl('templates/ssmeterelect.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $ionicModal.fromTemplateUrl('templates/ssmeterelectremove.html', {
      scope: $scope
    }).then(function(modalr) {
      $scope.modalr = modalr;
    });

  $scope.closeMeterElect = function() {
      $scope.modal.hide();
    };

  $scope.closeRemoveMeterElect = function() {
      $scope.modalr.hide();
    };

  $scope.addmeter = function() {
      $scope.modal.show();
    };

  $scope.removemeter = function() {
      $scope.modalr.show();
    };

  sseMeterData.getMeters().then(function(meters){
    $scope.meters = meters;
    $ionicLoading.hide();
  });


  $scope.$on('handleSSEmeterData', function(events, meters){
    $scope.meters = meters;
    $ionicLoading.hide();
  });

  $scope.doAddssMeter = function(meterData){
    $params = ({params:{
      "description":meterData.description,
      "address":meterData.address,
      "comment":meterData.comment,
      "meter_type":meterData.meter_type,
      "user_id":$rootScope.uid
    }})
    sseMeterData.saveMeters($params);
    $scope.closeMeterElect();
  }

  $scope.pushNotificationChange = function(id){
    sseMeterData.removeMeter(id);
    console.log("Meter ID", id);
  }

})

.controller('ssMeterReadingsCtrl', function($scope, $ionicModal, $timeout, ssMeterReadingData, $rootScope, $ionicLoading, $stateParams) {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = yyyy + '-' + mm + '-' + dd;

  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });

  $scope.name = 'ssMeterReadingsCtrl';
  $scope.address=$stateParams.address;
  $scope.description=$stateParams.description;
  $scope.meter_type=$stateParams.meter_type;
  $scope.meter_id=$stateParams.meter_id;
  $scope.date_read = today;
  console.log('date',today);

  $ionicModal.fromTemplateUrl('templates/ssmeterreadingelect.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

  $ionicModal.fromTemplateUrl('templates/ssmeterreadingelectremove.html', {
      scope: $scope
    }).then(function(modalr) {
      $scope.modalr = modalr;
    });

  $scope.closeMeterElect = function() {
      $scope.modal.hide();
    };

  $scope.closeRemoveMeterElect = function() {
      $scope.modalr.hide();
    };

  $scope.addreading = function() {
      $scope.modal.show();
    };

  $scope.removereading = function() {
      $scope.modalr.show();
    };

  ssMeterReadingData.getReadings($stateParams.meter_id).then(function(readings){
    $scope.readings = readings;
    $ionicLoading.hide();
  });

  $scope.$on('handleSSReadingData', function(events, readings){
    $scope.readings = readings;
    $ionicLoading.hide();
  });

  $scope.doAddReading = function(readingsData){
    $params = ({params:{
      "date_read":readingsData.date_read,
      "reading":readingsData.reading,
      "comment":readingsData.comment,
      "address":$scope.address,
      "description":$scope.description,
      "meter_type":$scope.meter_type,
      "meter_id":$scope.meter_id,
      "user_id":$rootScope.uid
    }})
    ssMeterReadingData.saveReading($params);
    $scope.closeMeterElect();
  }

  $scope.pushNotificationChange = function(id){
    ssMeterReadingData.removeReading($scope.meter_id,id);
  }

})

.controller('OptionlistCtrl', function($scope, LoginData, InitialData, $rootScope, $state, $stateParams, $ionicLoading) {
    $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });

  $scope.stat='auth_error';
  if(typeof $rootScope.stat !== 'undefined'){
    $scope.stat=$rootScope.stat;
  }
  InitialData.get(function(data){
    $scope.shedding_class = data;
    $ionicLoading.hide();
  })
  $rootScope.$on('loginStatus', function(event, data) {
    $scope.stat=data;
    $ionicLoading.hide();
  });

  $scope.schedule = function(status){
    $state.go("app.schedule",{ 'link':status});

  };

  $scope.loginOptions = [
    { title: 'Accounts', id: 'accounts', class: 'item-note',icon: 'accounts_icon.png' },
    { title: 'Prepaid Electricity', id: 'prepaid',icon: 'elec_calc_icon.png' },
    { title: 'Self Service Readings', id: 'ssereadings',icon: 'elec_reading_icon.png' }

  ];

  $scope.optionList = [
    { title: 'Messages', id: 'messages',icon: 'messages_icon.png' },
    { title: 'Directory', id: 'directory',icon: 'phone_icon.png' },
    { title: 'Quotations', id: 'quotations', class: 'badge badge-assertive',icon: 'quotations_icon.png' },
    { title: 'Tenders', id: 'tenders', class: 'badge badge-assertive',icon: 'tenders_icon.png' },
    { title: 'Media Releases', id: 'media',icon: 'media_icon.png' },
    { title: 'Notices', id: 'notices',icon: 'notices_icon.png' },
    { title: 'IDP Needs', id: 'projects',icon: 'projects_icon.png' }

  ];

})

.controller('LoadSheddingCtrl', function($scope, $resource, $stateParams){
  $scope.loadsheddingAPI = $resource("http://www.stlm.gov.za/loadshedding/sheddingstatus_android.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.shedding=$scope.loadsheddingAPI.get({});
  console.log($scope.shedding);

})

.controller('eEeterHistoryCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });
  var ppHistoryAPI = $resource("https://www.stlm-online.co.za/json/finance/accounts/last_five_elec_purchases.php?meternumber=" + $stateParams.serialNr,
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});
  $scope.serialNr = $stateParams.serialNr;
  $scope.description=$stateParams.description;
  $scope.history=ppHistoryAPI.get({});
  $ionicLoading.hide();

})

.controller('DirectoryCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });

  $scope.directoryAPI = $resource("http://www.stlm.gov.za/json/listDirectory.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.directory=$scope.directoryAPI.get({});
  $ionicLoading.hide();


})

.controller('ScheduleCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });
  $scope.scheduleAPI = $resource("http://www.stlm.gov.za/json/listSchedule.php?link=" + $stateParams.link,
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.schedules=$scope.scheduleAPI.get({});
  $ionicLoading.hide();

})

.controller('TendersCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });

  $scope.showTender=function(url){
    window.open(url, '_system');
  }

  $scope.tenderAPI = $resource("http://www.stlm.gov.za/json/listTenders.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.tenders=$scope.tenderAPI.get({});
  $ionicLoading.hide();

})

.controller('QuotationsCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });

  $scope.showQuotation=function(url){
    window.open(url, '_system');
  }

  var quotationAPI = $resource("http://www.stlm.gov.za/json/listQuotations.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET"}});

  $scope.quotations=quotationAPI.get({});
  $ionicLoading.hide();

})

.controller('MediaCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });
  $scope.mediaAPI = $resource("http://www.stlm.gov.za/json/listMedia.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.mediaItems=$scope.mediaAPI.get({});
  $ionicLoading.hide();

})

.controller('NoticesCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });
  $scope.noticeAPI = $resource("http://www.stlm.gov.za/json/listNotices.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.notices=$scope.noticeAPI.get({});
  $ionicLoading.hide();

})

.controller('ProjectsCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });
  $scope.projectAPI = $resource("http://www.stlm.gov.za/json/listProjects.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.projects=$scope.projectAPI.get({});
  $ionicLoading.hide();

})

.controller('MessagesCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });
  $scope.messageAPI = $resource("http://stlm-online.co.za/json/sms/list.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.messages=$scope.messageAPI.get({});
  $ionicLoading.hide();

})

.controller('ElecCalcCtrl', function ($scope) {
  var b1pu = '';
  var b2pu = '';
  var b3pu = '';
  var b4pu = '';
  var btpu = '';

  var b1pa = '';
  var b2pa = '';
  var b3pa = '';
  var b4pa = '';
  var btpa = '';

  var b1nu = '';
  var b2nu = '';
  var b3nu = '';
  var b4nu = '';
  var btnu = '';

  var b1na = '';
  var b2na = '';
  var b3na = '';
  var b4na = '';
  var btna = '';

  var val1=parseFloat("0.7758");
  var val2=parseFloat("1.0321");
  var val3=parseFloat("1.2184");
  var val4=parseFloat("1.3714");
  var vat=parseFloat("1.14");

  var prevAmountPurchase=0;
  var nextAmountPurchase=0;
  var totalAmountPurchase=0;

  var unitsLeftFromAmount=0;
  var prevBlock=1;
  var nextBlock=1;
//Update
$scope.update=function(){

var block1To=50;
var block2To=350;
var block3To=600;

var block1Max=0;
var block2Max=0;
var block3Max=0;

var block1Total=0;
var block2Total=0;
var block3Total=0;

//Calculations
var block1Incl=round(parseFloat(val1*vat),6);
var block2Incl=round(parseFloat(val2*vat),6);
var block3Incl=round(parseFloat(val3*vat),6);
var block4Incl=round(parseFloat(val4*vat),6);

var totalAmount=0;
var totalUnits=0;
var totalAmountNext=0;
var totalUnitsNext=0;
var totalPU=0;
var totalPA=0;
var totalTU=0;
var totalTA=0;

unitsLeftFromAmount=0;
amountLeftInBlock=0;

block1Max=parseFloat(block1Incl * block1To);
block2Max=parseFloat(block2Incl * (block2To - block1To));
block3Max=parseFloat(block3Incl * (block3To - block2To));

block1Total=block1Max;
block2Total=block1Max+block2Max;
block3Total=block1Max+block2Max+block3Max;

if(prevAmountPurchase===""){ prevAmountPurchase=0; }
if(nextAmountPurchase===""){ nextAmountPurchase=0; }
totalAmountPurchase = parseFloat(prevAmountPurchase + nextAmountPurchase);
//Calculate previous purchase end block
          if (prevAmountPurchase <= block1Total) {
              prevBlock = 1;
          } else {
              if (prevAmountPurchase <= block2Total) {
                  prevBlock = 2;
              } else {
                  if (prevAmountPurchase <= block3Total) {
                      prevBlock = 3;
                  } else {
                      if (prevAmountPurchase > block3Total) {
                          prevBlock = 4;
                      }
                  }
              }
          }

    //Calculate next purchase end block
          if (totalAmountPurchase <= block1Total) {
              nextBlock = 1;
          } else {
              if (totalAmountPurchase <= block2Total) {
                  nextBlock = 2;
              } else {
                  if (totalAmountPurchase <= block3Total) {
                      nextBlock = 3;
                  } else {
                      if (totalAmountPurchase > block3Total) {
                          nextBlock = 4;
                      }
                  }
              }
          }

//Previous Block Calculations
//First Block
          if (prevBlock == 1) {
              b1pa=round(prevAmountPurchase,4).toFixed(4);
              b1pu=round(prevAmountPurchase / block1Incl,2);
              totalAmount=round(prevAmountPurchase,4);
              totalUnits=round(prevAmountPurchase / block1Incl,2);

          } else {
              b1pa=round(block1Max,4).toFixed(4);
              b1pu=round(block1Max / block1Incl,2);
              totalAmount = round(block1Max,4);
              totalUnits = round(block1Max / block1Incl,2);
          }
//Second Block
          if (prevBlock == 2) {
              b2pa=round((prevAmountPurchase - block1Total),4).toFixed(4);
              b2pu=round(((prevAmountPurchase - block1Total) / block2Incl),2);
              totalAmount = round(totalAmount + (prevAmountPurchase - block1Total),4);
              totalUnits = round(totalUnits + ((prevAmountPurchase - block1Total) / block2Incl),2);
          }
          if (prevBlock > 2) {
              b2pa=round(block2Max,4).toFixed(4);
              b2pu=round((block2Max / block2Incl),2);
              totalAmount = round(totalAmount + (block2Max),4);
              totalUnits = round(totalUnits + (block2Max / block2Incl),2);
          }
          if (prevBlock < 2) {
              b2pa=0;
              b2pu=0;
          }
//Third Block
          if (prevBlock == 3) {
              b3pa=round((prevAmountPurchase - block2Total),4).toFixed(4);
              b3pu=round(((prevAmountPurchase - block2Total) / block3Incl),2);
              totalAmount = round(totalAmount + (prevAmountPurchase - block2Total),4);
              totalUnits = round(totalUnits + ((prevAmountPurchase - block2Total) / block3Incl),2);
          }
          if (prevBlock > 3) {
              b3pa=round((block3Max),4).toFixed(4);
              b3pu=round((block3Max / block3Incl),2);
              totalAmount = round(totalAmount + (block3Max),4);
              totalUnits = round(totalUnits + (block3Max / block3Incl),2);
          }
          if (prevBlock < 3) {
              b3pa=0;
              b3pu=0;
          }
//Fourth Block
          if (prevBlock == 4) {
              b4pa=round((prevAmountPurchase - block3Total),4).toFixed(4);
              b4pu=round(((prevAmountPurchase - block3Total) / block4Incl),2);
              totalAmount = round(totalAmount + (prevAmountPurchase - block3Total),4);
              totalUnits = round(totalUnits + ((prevAmountPurchase - block3Total) / block4Incl),2);
          }
          if (prevBlock < 4) {
              b4pa=0;
              b4pu=0;
          }

    totalPU=round(totalUnits,2);
    totalPA=round(totalAmount,4);
    tpu=roundDownOne(totalPU);
    tpa=totalPA.toFixed(2);


//Total Block Calculations
//First Block
          if (nextBlock == 1) {
              b1ta=round(totalAmountPurchase, 4);
              b1tu=round(totalAmountPurchase / block1Incl, 2);
              unitsLeftFromAmount = round((block1Total - totalAmountPurchase) / block1Incl, 2) + " units @ R";
              amountLeftInBlock=round(block1Total - totalAmountPurchase, 2).toFixed(2);

              totalAmountNext = round(totalAmountPurchase,4);
              totalUnitsNext = b1tu;
          } else {
              b1ta=round(block1Max, 4);
              b1tu=round(block1Max / block1Incl, 2);

              totalAmountNext = round(block1Max,4);
              totalUnitsNext = b1tu;
          }
//Second Block
          if (nextBlock == 2) {
              b2ta=round(totalAmountPurchase - block1Total, 4);
              b2tu=round((totalAmountPurchase - block1Total) / block2Incl, 2);
              unitsLeftFromAmount = round((block2Total - totalAmountPurchase) / block2Incl, 2) + " units @ R";
              amountLeftInBlock=round(block2Total - totalAmountPurchase, 2).toFixed(2);

              totalAmountNext = round(totalAmountNext + (totalAmountPurchase - block1Total),4);
              totalUnitsNext = totalUnitsNext + b2tu;
          }
          if (nextBlock > 2) {
              b2ta=round(block2Max, 4);
              b2tu=round(block2Max / block2Incl, 2);

              totalAmountNext = round(totalAmountNext + (block2Max),4);
              totalUnitsNext = totalUnitsNext + b2tu;
          }
          if (nextBlock < 2) {
              b2ta=0;
              b2tu=0;
          }
//Third Block
          if (nextBlock == 3) {
              b3ta=round(totalAmountPurchase - block2Total, 4);
              b3tu=round((totalAmountPurchase - block2Total) / block3Incl, 2);
              unitsLeftFromAmount = round((block3Total - totalAmountPurchase) / block3Incl, 2) + " units @ R";
              amountLeftInBlock=round(block3Total - totalAmountPurchase, 2).toFixed(2);

              totalAmountNext = round(totalAmountNext + (totalAmountPurchase - block2Total),4);
              totalUnitsNext = totalUnitsNext + $scope.b3tu;
          }
          if (nextBlock > 3) {
              b3ta=round(block3Max, 4);
              b3tu=round((block3Max) / block3Incl, 2);

              totalAmountNext = round(totalAmountNext + (block3Max),4);
              totalUnitsNext = totalUnitsNext + b3tu;
          }
          if (nextBlock < 3) {
              b3ta=0;
              b3tu=0;
          }
//Fourth Block
          if (nextBlock == 4) {
              b4ta=round(totalAmountPurchase - block3Total, 4);
              b4tu=round((totalAmountPurchase - block3Total) / block4Incl, 2);
              unitsLeftFromAmount="Unlimited";
              amountLeftInBlock="";

              totalAmountNext = round(totalAmountNext + (totalAmountPurchase - block3Total),4);
              totalUnitsNext = totalUnitsNext + b4tu;
          }
          if (nextBlock < 4) {
              b4ta=0;
              b4tu=0;
          }

    totalTU=round(totalUnitsNext,2);
    totalTA=round(totalAmountNext,4);
    ttu=roundDownOne(totalTU);
    tta=totalTA.toFixed(2);

    b1nu=round(b1tu-$scope.b1pu,2);
    b1na=round(b1ta-$scope.b1pa,4);
    b2nu=round(b2tu-$scope.b2pu,2);
    b2na=round(b2ta-$scope.b2pa,4);
    b3nu=round(b3tu-$scope.b3pu,2);
    b3na=round(b3ta-$scope.b3pa,4);
    b4nu=round(b4tu-$scope.b4pu,2);
    b4na=round(b4ta-$scope.b4pa,4);

    tnu=round((totalTU-totalPU),2);
    tna=round((totalTA-totalPA),2);

}//update
    function round(value, exp) {
      if (typeof exp === 'undefined' || +exp === 0)
        return Math.round(value);

      value = +value;
      exp  = +exp;

      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
        return;

      // Shift
      value = value.toString().split('e');
      value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }

    function roundDownOne(value){
    	var s = [];
    	var output="";

    	s = value.toString().split('.');

    	if(typeof s[1] === 'undefined'){
    		output = value.toString();
    	}else{
    		if(s[1].length > 1){ output = value.toString().slice(0,-1); }
    	}
    	return output;

    	/*return value;*/
  }
})

.controller('AccountDetailCtrl', function($scope, $resource, $stateParams, $ionicLoading){
  $ionicLoading.show({
    content: 'Loading',
    animation: 'fade-in',
    showBackdrop: true,
    maxWidth: 200,
    showDelay: 0,
    duration: 5000
  });
  var self = this;
  $scope.accountNr=$stateParams.accountNr;
  $scope.accountMonth=$stateParams.accountMonth;

  $scope.accountDetailsAPI = $resource("http://www.stlm-online.co.za/json/finance/accounts/accounts_detail.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "JSONP" }});

  $scope.accountDetails=$scope.accountDetailsAPI.get({accno:$scope.accountNr, monthnr:$scope.accountMonth});
  $ionicLoading.hide();

$scope.refresh=function(acc,num){
  loadRemoteData(acc,num);
}

  function loadRemoteData(acc,num){

    $resource("http://www.stlm-online.co.za/json/finance/accounts/accounts_detail.php",
    { callback: "JSON_CALLBACK" },
    { get: { method: "JSONP" }});

    $scope.accountDetails=$scope.accountDetailsAPI.get({accno:acc, monthnr:num});

  }

})

.service('GetAccountData', function($http){
  var self = this;

  this.collect = function(accountNr,accountMonth){
    $http.get('http://www.stlm-online.co.za/json/finance/accounts/accounts_detail.php?accno=' + accountNr + '&monthnr=' + accountMonth)
      //.then(function(resp) {
      .success(function(response){
      console.log('Success', response);
      return self.response;
      /*$scope.headingItems = resp.data.heading;
      $scope.details = resp.data.detail_items;
      $scope.months = resp.data.detail_dates;*/
      // For JSON responses, resp.data contains the result
    })
      .error(function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    });
  };

});
