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

		var normalize = $filter('normalize');

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
		* byType:
		*
		* obtiene todos los pokemones que sean del typo = type.
		* 
		*/
		function byType(type) {
			type         = normalize(type);
			var deferred = $q.defer();

			all().then(function (data) {

				// .filter: sirve para realizar un filter a los datos.
				// es de la librería undescore
				var results = data.filter(function (pokemon) {
					return pokemon.type.some(function (t) {
						return normalize(t) === type;
					});
				});

				deferred.resolve(results);
			});

			return deferred.promise;
		}

		/**
		* 
		* byAbility:
		*
		* obtiene todos los pokemones que posean la habilidad = ability.
		* 
		*/
		function byAbility(ability) {
			ability         = normalize(ability);
			var deferred = $q.defer();

			all().then(function (data) {

				// .filter: sirve para realizar un filter a los datos.
				// es de la librería undescore
				var results = data.filter(function (pokemon) {
					return pokemon.abilities.some(function (t) {
						return normalize(t) === ability;
					});
				});

				deferred.resolve(results);
			});

			return deferred.promise;
		}

		/**
		* 
		* byQuery:
		*
		* obtiene todos los pokemones que coinciden con la búsqueda.
		* 
		*/
		function byQuery(query) {
			query        = normalize(query);
			var deferred = $q.defer();

			all().then(function (data) {
				var results = data.filter(function (pokemon) {
					return normalize(pokemon.name).indexOf(query) > -1;
				});

				deferred.resolve(results);

			});

			return deferred.promise;
		}

		/**
		* 
		* byName:
		*
		* obtiene los datos del pokemon.
		* 
		*/
		function byName(name) {
			name = normalize(name);
			var deferred = $q.defer();

			all().then(function (data) {
				var results = data.filter(function (pokemon) {
					return normalize(pokemon.name) === name;
				});

				if (results.length > 0) {
					deferred.resolve(results[0]);
				} else {
					deferred.reject();
				}
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
			all:       all,
			byType:    byType,
			byAbility: byAbility,
			byQuery:   byQuery,
			byName:    byName,
			partition: partition
		};

	}]);

})();