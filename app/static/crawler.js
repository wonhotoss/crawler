angular.module( 'crawler', [] )
	.controller( 'DocListController', function( $scope, $http )
	{
		var docList = this;

		
		docList.query = function()
		{
			console.log( 'query' );

			var param = 
			{
				paramKey : 'paramValue'
			};

			var promise = $http( 
			{ 
				method : 'POST', 
				url: '/getdocs', 
				data : param
			} );

			promise.then( function successCallback( response )
			{
				console.log( response.data );
				console.log( response.data.toString() );
			} );
		};
	} )
	.config( [ '$httpProvider', function( $httpProvider )
	{
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	} ] );
