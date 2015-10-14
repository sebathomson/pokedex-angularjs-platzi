/**
* 
* Aquí se encuentran todos los servicios de la aplicación. 
*
* Es una muy buena práctica "dividir" servicios de la lógica de la aplicación. 
*
* Solo hay que incluirlo dentro de las dependencias de la app.
* 
**/
(function () {

	/**
	* 
	* Inicialización del módulo de servicios.
	* 
	*/
	var pokemonServices = angular.module('Pokedex.services', []);

	/**
	* 
	* pokemonService: 
	* 
	* servicio que contiene diversas funciones utilizadas por la aplicación.
	* estos servicios con la conexión que tenemos con nuestro repo de pokemones.
	*
	*/
	pokemonServices.factory('pokemonService', [ '$http', '$q', '$filter', function ($http, $q, $filter) {

		/**
		* 
		* all:
		*
		* obtiene todos los pokemones de nuestro repo.
		* 
		*/
		function all() {
			var deferred = $q.defer();

			$http.get('assets/js/pokemons.json').success(function (data) {
				deferred.resolve(data);
			});

			return deferred.promise;
		}

		/**
		* 
		* partition:
		*
		* divide un array de datos (data) en grupos de 'n'.
		* 
		*/
		function partition(data, n) {
			return _.chain(data).groupBy(function (element, index) {
				return Math.floor(index / n);
			}).toArray().value();
		}


		return {
			all: all,
			partition: partition
		};

	}]);

})();