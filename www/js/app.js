// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

app.controller('mainController',function($scope, $ionicPopup, $ionicListDelegate){
  var tasks = new getTasks();

  $scope.list = tasks.items;
  $scope.showMarked = false;
  $scope.removeStatus = false;

  function getItem(item,novo){
    $scope.data={};
    $scope.data.newTasks = item.nome;

    $ionicPopup.show({
      title:"Nova tarefa",
      scope:$scope,
      template:"<input type='text' placeholder='Tarefa'autofocus='true' ng-model='data.newTasks'>",
      buttons:[
        {text:'Cancelar'},
        {text:'Ok',
        type: 'button-positive',
        onTap: function(e){
          item.nome = $scope.data.newTasks;
          if(item.nome == undefined || item.nome ==""){
            $ionicPopup.alert({
              title: 'Campo vazio!',
              template: '<div class="center-align">Campo Vazio, favor escrever o nome do item!</div>'
            }).then(function(res) {});
            return;
            }
          if(novo){
            tasks.add(item);
          }
          tasks.save();
        }},

      ]
    });
    $ionicListDelegate.closeOptionButtons();
  };

  $scope.onMarkTask = function(item){
    item.finalizada = !item.finalizada;
    tasks.save();
  };


  $scope.onHideItem = function(item){
    return item.finalizada && !$scope.showMarked;
  };
  $scope.onItemAdd=function(){
    var item={nome: "", finalizada: false };
    getItem(item, true);
  };
  $scope.onItemEdit = function(item){
    getItem(item, false);
    tasks.save();
  };
  $scope.onItemRemove = function(item){
    $ionicPopup.confirm({
      title: 'Confirmação de Remoção',
      template: '<div style="text-align:center">Você deseja realmente remover o item?</div>'
      }).then(function(res) {
        if(res){
          tasks.remove(item);
          tasks.save();
        }
      });
      return;
  };
  $scope.onClickRemove = function() {
    $scope.removeStatus = !$scope.removeStatus
  };
});
