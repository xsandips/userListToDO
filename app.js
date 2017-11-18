var app = angular.module('app', ['ngRoute']);
app.config(function($routeProvider) {
	$routeProvider
		.when('/todo/:userId', {
			templateUrl: 'todo.html',
			controller:'todoCtrl'
		})
		.when('/', {
			templateUrl: 'userList.html',
			controller:'userCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});
app.controller('userCtrl', function($scope,$http) {
    $http.get('https://jsonplaceholder.typicode.com/users').then(function(response){
	  $scope.userDetails= response.data;
	});
});

app.controller('todoCtrl', function($scope,$http,$routeParams) {
    $scope.userId = $routeParams.userId;
    $scope.data = {};
    $http.get('https://jsonplaceholder.typicode.com/todos?userId='+$scope.userId ).then(function(response){
  	  $scope.todoList= response.data;
  	  var maxId = Math.max.apply(Math,$scope.todoList.map(function(item){return item.id;}));
  	  $scope.data.id = maxId+1;
  	});
    
    $scope.savetodo = function(data){
    	alert(data.title);
    }
});