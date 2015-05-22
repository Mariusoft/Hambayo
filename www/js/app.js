// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('hambayo', ['ionic', 'hambayo.controllers', 'ngResource', 'angular.filter'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.optionlist', {
      url: "/optionlist",
      views: {
        'menuContent': {
          templateUrl: "templates/options.html",
          controller: 'OptionlistCtrl'
        }
      }
    })
    .state('app.directory', {
      url: "/optionlist/directory",
      views: {
        'menuContent': {
          templateUrl: "templates/directory.html",
          controller: 'DirectoryCtrl'
        }
      }
    })
    .state('app.prepaid', {
      url: "/optionlist/prepaid",
      views: {
        'menuContent': {
          templateUrl: "templates/emeters.html",
          controller: 'eMeterCtrl'
        }
      }
    })
    .state('app.ssereadings', {
      url: "/optionlist/ssereadings",
      views: {
        'menuContent': {
          templateUrl: "templates/ssmeters.html",
          controller: 'ssEreadingsCtrl'
        }
      }
    })
    .state('app.schedule', {
      url: "/schedule",
      views: {
        'menuContent': {
          templateUrl: "templates/loadsheddingschedule.html",
          controller: 'ScheduleCtrl'
        }
      }
    })
    .state('app.messages', {
      url: "/optionlist/messages",
      views: {
        'menuContent': {
          templateUrl: "templates/messages.html",
          controller: 'MessagesCtrl'
        }
      }
    })
    .state('app.quotations', {
      url: "/optionlist/quotations",
      views: {
        'menuContent': {
          templateUrl: "templates/quotations.html",
          controller: 'QuotationsCtrl'
        }
      }
    })
    .state('app.tenders', {
      url: "/optionlist/tenders",
      views: {
        'menuContent': {
          templateUrl: "templates/tenders.html",
          controller: 'TendersCtrl'
        }
      }
    })
    .state('app.media', {
      url: "/optionlist/media",
      views: {
        'menuContent': {
          templateUrl: "templates/media.html",
          controller: 'MediaCtrl'
        }
      }
    })
    .state('app.notices', {
      url: "/optionlist/notices",
      views: {
        'menuContent': {
          templateUrl: "templates/notices.html",
          controller: 'NoticesCtrl'
        }
      }
    })
    .state('app.projects', {
      url: "/optionlist/projects",
      views: {
        'menuContent': {
          templateUrl: "templates/projects.html",
          controller: 'ProjectsCtrl'
        }
      }
    })
    .state('app.accounts', {
      url: "/optionlist/accounts",
      views: {
        'menuContent': {
          templateUrl: "templates/accounts.html",
          controller: 'AccountsCtrl'
        }
      }
    })
    .state('app.emeterhistory', {
      url: "/emeterhistory/:serialNr/:description",
      views: {
        'menuContent': {
          templateUrl: "templates/emeterhistory.html",
          controller: 'eEeterHistoryCtrl'
        }
      }
    })
    .state('app.accountdetail', {
      url: "/accountdetail/:accountNr/:accountMonth",
      views: {
        'menuContent': {
          templateUrl: "templates/accountdetail.html",
          controller: 'AccountDetailCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/optionlist');
});
