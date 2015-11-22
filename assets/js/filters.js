/**
* 
* Aquí se encuentran todos los filtros de la aplicación. 
*
* Es una muy buena práctica "dividir" filtros de la lógica de la aplicación. 
*
* Solo hay que incluirlo dentro de las dependencias de la app.
* 
**/
(function () {

	/**
	* 
	* Inicialización del módulo de filtros.
	* 
	*/
	var pokemonFilters = angular.module('Pokedex.filters', []);


	/**
	* 
	* normalize: 
	* filtro para quitar los caracteres extraños 
	* del nombre de los pokemons
	*
	* @uses filtro imageify
	* 
	*/
	pokemonFilters.filter('normalize', function () {
		return function (input) {
			if (!input) return "";

			input = input
			.replace('♀', 'f')
			.replace('♂', 'm')
			.replace(' ', '')
			.replace(/\W+/g, "");
			
			return input.toLowerCase();
		};
	})

	/**
	* 
	* imageify: 
	* filtro para obtener la imagen de un pokemon.
	* 
	* Utiliza el filtro normalize para el nombre de los pokemons.
	* 
	*/
	pokemonFilters.filter('imageify', ['$filter', function ($filter) {
		return function (input) {
			// Aún no logro entender porque hay veces en las que "input" llega undefined. 
			if (input == undefined) {
				return '';
			}
			var url = "assets/img/pokemons/" + $filter('normalize')(input) + ".jpg";
			return url;
		};
	}]);

	/**
	* 
	* labeltype: 
	* filtro para obtener el color del label por tipo.
	* 
	*/
	pokemonFilters.filter('colortype', ['$filter', function ($filter) {
		return function (input) {
			input = input.toLowerCase();

			if (input == 'water' || input == 'ice') {
				return 'info';
			};

			if (input == 'fire') {
				return 'danger';
			};

			if (input == 'psychic' || input == 'poison' || input == 'ghost') {
				return 'primary';
			};

			if (input == 'electric') {
				return 'warning';
			};

			if (input == 'bug' || input == 'grass' || input == 'poi') {
				return 'success';
			};

			return 'default';
		};
	}]);

})();