(function () {

	var app = angular.module('Pokedex', [
		'ngRoute',
		'Pokedex.filters',
		'Pokedex.controllers',
		'Pokedex.services'
		]);

	/**
	* 
	* Inicialización del módulo de servicios.
	*
	* @see  https://docs.angularjs.org/guide/module
	*
	* Configuration blocks:
	* 
	* Get executed during the provider registrations and configuration phase. 
	* Only providers and constants can be injected into configuration blocks. 
	* This is to prevent accidental instantiation of services before they have been fully configured.
	* 
	*/
	app.config(['$routeProvider', function ($routeProvider) {

		/**
		* Ruta '/': Cuando la ruta sea el home, se mostrará la vista de pokedex.
		*/
		$routeProvider.when('/', {
			templateUrl: 'views/list.html',
			controller: 'PokedexController'
		});

		/**
		* Ruta '/type/:type': Ruta para ver el pokedex de un tipo de pokemon
		*/
		$routeProvider.when('/type/:type', {
			templateUrl: 'views/list.html',
			controller: 'PokedexController'
		});

		/**
		* Ruta '/ability/:ability': Ruta para ver el pokedex de un tipo de pokemon
		*/
		$routeProvider.when('/ability/:ability', {
			templateUrl: 'views/list.html',
			controller: 'PokedexController'
		});

		/**
		* Ruta '/pokemon/:name': Ruta para ver el pokemon
		*/
		$routeProvider.when('/pokemon/:name', {
			templateUrl: 'views/pokemon.html',
			controller: 'PokemonController'
		});

		/**
		* Para todas las demás rutas, redirigir a la del home
		*/
		$routeProvider.otherwise({
			redirectTo: '/'
		});

	}]);

})();