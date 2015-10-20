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
	* PokedexController: 
	* 
	* Controlador que maneja el pokedex completo, por tipo, por habilidades y el buscador.
	*/
	pokemonControllers.controller('PokedexController', [ '$scope', '$routeParams', 'pokemonService', function ($scope, $routeParams, pokemonService) {
		var type                  = $routeParams.type;
		var ability               = $routeParams.ability;
		$scope.pokedexDescription = 'All Pokemons';

		if (type) {
			$scope.pokedexDescription = "All Pokemons to have the " + type.toUpperCase() + " Type";

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

		$scope.filterByQuery = function (keyEvent) {
			if (keyEvent.which === 13) {
				$scope.pokedexDescription = "All Pokemons to have the '" + $scope.query + "' keyword";

				pokemonService.byQuery($scope.query).then(function (data) {
					$scope.pokemons        = data;
					$scope.pokemonGroupped = pokemonService.partition(data, 4);
				});
			}
		}

	}]);

	/**
	* 
	* PokemonController: 
	* 
	* Controlador que maneja el la vista de los pokemones.
	*/
	pokemonControllers.controller('PokemonController', [ '$scope', '$routeParams', 'pokemonService', function ($scope, $routeParams, pokemonService) {
		var name                  = $routeParams.name;

		pokemonService.byName(name).then(function (data) {
			$scope.pokemon            = data;
			$scope.pokedexDescription = data.name;
		});
	}]);

})();