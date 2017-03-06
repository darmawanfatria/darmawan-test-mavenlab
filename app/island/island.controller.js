'use strict';

angular.module('myApp.island', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/island', {
    templateUrl: 'island/island.html',
    controller: 'IslandController',
    controllerAs: 'vm',
  });
}])


.controller('IslandController', [function($scope) {
  var vm = this;
  vm.title="Darmawan Fatriananda | Mavenlab Test";
  var LAND = '1'; //defined LAND = '1'

  //define param
  vm.generatedIslandMatrix=null;
  vm.displayIsland = [
    []
  ];
  vm.numberOfIsland = 0;

  //function to generate island and counting number of island
  vm.generateIsland = function (event) {
    event.preventDefault();
    vm.displayIsland = createMatrixArray(vm.param); //html purpose,view only array
    vm.generatedIslandMatrix = angular.copy(vm.displayIsland); //process the matrix
    vm.numberOfIsland = getNumberOfIsland(); //get number of island
  };

  //to create 2dimensional array based on input param
  function createMatrixArray(size){
    let arr = [];
    for (let i=0;i<size;i++) {
      let cell = new Array(size);
      for (let j=0;j<size;j++) {
        cell[j] = (randomIntFromInterval(0,1)).toString();
      }
      arr[i] = cell;
    }
    return arr;
  }

  //to get number of island
  function getNumberOfIsland(){
    if (vm.generatedIslandMatrix !== null){
      var numberOfIsland = 0;
      var len = vm.param;
      for(let i = 0; i < len; i++){
        for(let j = 0; j < len; j++){
          if(vm.generatedIslandMatrix[i][j] === LAND){
            findNeighbourhood([{row : i, col : j}]);
            if(isConnectingLand(i,j)){
              numberOfIsland++;
            }
          }
        }
      }
      return numberOfIsland;
    }
    return 0;
  }

  //find 8 directional neighbour
  function findNeighbourhood(island){
    var len = island.length;
    var top=null;
    var i=0;
    var j=0;
    while(len--){
      top = island.pop();
      i = top.row;
      j = top.col;
      if(vm.generatedIslandMatrix[i] && vm.generatedIslandMatrix[i][j] && vm.generatedIslandMatrix[i][j] === LAND){
        vm.generatedIslandMatrix[i][j] = '99';
        island.push({row : i + 1, col : j}); //2
        island.push({row : i + 1, col : j+1}); //3
        island.push({row : i + 1, col : j-1}); //1
        island.push({row : i - 1, col : j}); //4
        island.push({row : i, col : j + 1}); // 6
        island.push({row : i-1, col : j + 1}); // 9
        island.push({row : i-1, col : j - 1}); // 7
        island.push({row : i, col : j - 1});// 8
      }
    }
    if(island.length !== 0){
      findNeighbourhood(island);
    }
  }

  // to check is the land have neighbour or connecting to other land
  function isConnectingLand(row,col){
    var matrixSize = vm.param;
    var connectingArray =[];
    //extract 8 direction into 1 dimenssion array
    //my self notes, is need to optimize the code,
    //to check the border :)
    try {
      connectingArray.push(vm.displayIsland[row+1][col]); //2
    }catch(err) {
      //do nothing
    }
    try {
      connectingArray.push(vm.displayIsland[row+1][col+1]); //3
    }catch(err) {
      //do nothing
    }
    try {
      connectingArray.push(vm.displayIsland[row+1][col-1]); //1
    }catch(err) {
      //do nothing
    }
    try {
      connectingArray.push(vm.displayIsland[row-1][col]); //4
    }catch(err) {
      //do nothing
    }
    try {
      connectingArray.push(vm.displayIsland[row][col+1]); // 6
    }catch(err) {
      //do nothing
    }
    try {
      connectingArray.push(vm.displayIsland[row-1][col+1]); // 9
    }catch(err) {
      //do nothing
    }
    try {
      connectingArray.push(vm.displayIsland[row-1][col-1]); // 7
    }catch(err) {
      //do nothing
    }
    try {
      connectingArray.push(vm.displayIsland[row][col-1]);// 8
    }catch(err) {
      //do nothing
    }

    //check if land have neighbour of land
    if (connectingArray!==null && connectingArray.length>1){
      for (let i = 0;i<connectingArray.length;i++){
        if(connectingArray[i] === LAND){
          return true;
        }
      }
    }

    return false;
  }

  //
  function randomIntFromInterval(min,max)
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

}]);
