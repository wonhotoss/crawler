angular.module( 'crawler', ['ngSanitize'] )
	.controller( 'DocListController', function( $scope, $http )
	{
		var docList = this;

		docList.search = function()
		{
			IDs=[];
			
			console.log('search');
			searchPage=function(page,oncomplete)
			{
			
				searchURL='https://yasuldb.com/search_yasul.php?keyword='
					+ encodeURIComponent(docList.searchTerm)
					+ '&page=' + page;

 	

				var param=
				{
					args:[{URL:searchURL}]
				};
				var promise = $http(
				{
					method:'POST',
					url:'/getdocs',
					data:param
				} );
				promise.then( function successCallback( response )
				{
					var re=/search_yasul.php\?id=(\d+)/g;
					var articles = 0;
					while(match=re.exec(response.data[0]))
					{
						IDs.push(match[1]);
						articles++;
					}
					if(articles>0)
					{
						searchPage(++page,oncomplete);
					}
					else
					{
						oncomplete();
					}
				} );
			};
				
			searchPage(1,function()
			{
				IDs.sort();
				console.log( IDs );
				URLs=IDs.map( function( id ){
					return {
						URL:
						'https://yasuldb.com/./view/view.php?no='+id};
				} );

				promises = [];				

				for( var i = 0; i < URLs.length; ++i )
				{
					var eachPromise = function( URL )
					{
			
						promise = $http({
							method:'POST',
							url:'/getdocs',
							data:{args:[URL]}});
						promise.then( function successCallback(response) 
						{
							URL.result=response.data[0];
						});
						return promise;
					}( URLs[i] );
					promises.push(eachPromise);
				}

				console.log(promises);
				
				console.log(URLs);

				var completion = Promise.all(promises);
				completion.then(function(result)
				{
					content = document.getElementById('content');
					content.innerHTML= URLs.reduce(function(sum,elem)
					{
						return sum + elem.result;
					}, '');
					console.log(content.innerHTML); 
				});

			});

		};
	} )
	.config( [ '$httpProvider', function( $httpProvider )
	{
		console.log( 'config' );
		$httpProvider.defaults.xsrfCookieName = 'csrftoken';
		$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	} ] );
