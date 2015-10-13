function getPokemons () {
	return $.ajax({
		url: 'assets/js/pokemons.json',
		type: 'GET',
		dataType: 'JSON',
		async: false
	})
	.done(function(json) {
		pokemons = json;
	}).responseJSON;
}

function partition(data, n) {
	return _.chain(data).groupBy(function (element, index) {
		return Math.floor(index / n);
	}).toArray().value();
}


(function () {

	var app = angular.module('Pokedex', [
		'Pokedex.filters'
		]);

	app.controller('PokemonController', [ '$scope', function ($scope) {

		$scope.pokemonGroups = partition( getPokemons(), 4 ) ;

		// console.log( $scope.pokemonGroups );

	}]);

})();