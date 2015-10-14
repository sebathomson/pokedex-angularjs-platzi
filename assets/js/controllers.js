/**
* 
* Aquí se encuentran todos los controladores de la aplicación. 
*
* Es una muy buena práctica "dividir" los controladores de la lógica de la aplicación. 
*
* Solo hay que incluirlo dentro de las dependencias de la app.
* 
**/
(function () {

	/**
	* 
	* Inicialización del módulo de controladores.
	* 
	*/
	var pokemonControllers = angular.module('Pokedex.controllers', []);

	/**
	* 
	* pokemonControllers: 
	* 
	* Controlador que maneja el pokedex completo, por tipo y por habilidades.
	*/
	pokemonControllers.controller('PokedexController', [ '$scope', '$routeParams', 'pokemonService', function ($scope, $routeParams, pokemonService) {
		var type                  = $routeParams.type;
		var ability               = $routeParams.ability;
		$scope.pokedexDescription = 'All Pokemons';

		if (type) {
			$scope.pokedexDescription = "All " + type.toUpperCase() + "'s Pokemons";

			pokemonService.byType(type).then(function (data) {
				$scope.pokemons        = data
				$scope.pokemonGroupped = pokemonService.partition(data, 4);
			});
		} else if (ability) {
			$scope.pokedexDescription = "All Pokemons to have the " + ability.toUpperCase() + " Ability";

			pokemonService.byAbility(ability).then(function (data) {
				$scope.pokemons        = data
				$scope.pokemonGroupped = pokemonService.partition(data, 4);
			});
		} else {

			pokemonService.all().then( function (data) {
				$scope.pokemons        = data;
				$scope.pokemonGroupped = pokemonService.partition(data, 4);
			});

		}

	}]);

})();