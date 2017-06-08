from django.shortcuts import render
from django.http import JsonResponse
import json
import logging

logger = logging.getLogger( __name__ )

# Create your views here.
def index( request ):
	logger.error( 'error log' )
	return render( request, 'index.html', {} )

def getDocs( request ):	
	logger.error( request.body )
	decoded = json.loads( request.body.decode( 'utf-8' ) )
	logger.error( decoded )
	return JsonResponse( decoded )

