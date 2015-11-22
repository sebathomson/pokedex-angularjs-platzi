/**
* 
* Aquí se encuentran todos las directivas de la aplicación. 
*
* Es una muy buena práctica "dividir" las directivas de la lógica de la aplicación. 
*
* Solo hay que incluirlo dentro de las dependencias de la app.
* 
**/
(function () {

	/**
	* 
	* Inicialización del módulo de directivas.
	* 
	*/
	var pokemonDirectives = angular.module('Pokedex.directives', []);


	/**
	* 
	* pokemonImage: 
	* directiva para mostrar la imagen de un pokemon en el listado
	*
	* En HTML se puede utilizar con <pokemon-image></pokemon-image>
	* 
	*/
	pokemonDirectives.directive('pokemonImage', function () {
		return {
			restrict: 'E',
			templateUrl: 'views/partials/pokemonImage.html'
		};
	});

})();