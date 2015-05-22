angular.module('hambayo.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('OptionlistCtrl', function($scope, $resource) {
  $scope.optionlist = [
    { title: 'Accounts', id: 'accounts', note: 'Log in', class: 'item-note',icon: 'accounts_icon.png' },
    { title: 'Messages', id: 'messages' },
    { title: 'Prepaid Electricity Calculator', id: 'prepaid' },
    { title: 'Complaints', id: 'complaints' },
    { title: 'Talk to us', id: 'talk' },
    { title: 'Directory', id: 'directory' },
    { title: 'Media Releases', id: 'media' },
    { title: 'Quotations', id: 'quotations', note: '7', class: 'badge badge-assertive' },
    { title: 'Tenders', id: 'tenders', note: '3', class: 'badge badge-assertive' },
    { title: 'Notices', id: 'notices' },
    { title: 'IDP Projects', id: 'projects' },
    { title: 'Tariffs', id: 'tariffs' },
    { title: 'Electricity Readings', id: 'ereadings' },
    { title: 'Water Readings', id: 'wreadings' }

  ];

  $scope.loadsheddingAPI = $resource("http://www.stlm.gov.za/loadshedding/sheddingstatus_android.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.shedding=$scope.loadsheddingAPI.get({});
  $scope.shedding_class=$scope.shedding;
  console.log($scope.shedding);
})

.controller('LoadSheddingCtrl', function($scope, $resource, $stateParams){
  $scope.loadsheddingAPI = $resource("http://www.stlm.gov.za/loadshedding/sheddingstatus_android.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.shedding=$scope.loadsheddingAPI.get({});
  console.log($scope.shedding);

})

.controller('QuotationsCtrl', function($scope, $resource, $stateParams){
  $scope.quotationAPI = $resource("http://www.stlm.gov.za/json/listQuotations.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.quotations=$scope.quotationAPI.get({});
  console.log($scope.quotations);

})

.controller('MessagesCtrl', function($scope, $resource, $stateParams){
  $scope.messageAPI = $resource("http://stlm-online.co.za/json/sms/list.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.messages=$scope.messageAPI.get({});
  console.log($scope.messages);

})

.controller('AccountsCtrl', function($scope, $resource, $stateParams){
  $scope.accountAPI = $resource("http://www.stlm-online.co.za/json/finance/accounts/accounts.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "GET" }});

  $scope.accounts=$scope.accountAPI.get({username:'mariusoft', password:'panda11'});
  console.log($scope.accounts);
  /*
  $scope.accounts = [
    {title: 'MR & EJM Britz', address: '11 DE VILLIERS', nr: '1470694X'},
    {title: 'EJM Britz', address: '11 DE VILLIERS', nr:'1564456X'}
  ];
*/
})

.controller('AccountDetailCtrl', function($scope, $resource, $stateParams){
  var self = this;
  $scope.accountNr=$stateParams.accountNr;
  $scope.accountMonth=$stateParams.accountMonth;

  $scope.accountDetailsAPI = $resource("http://www.stlm-online.co.za/json/finance/accounts/accounts_detail.php",
  { callback: "JSON_CALLBACK" },
  { get: { method: "JSONP" }});

  $scope.accountDetails=$scope.accountDetailsAPI.get({accno:$scope.accountNr, monthnr:$scope.accountMonth});
  console.log($scope.accountDetails);

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
