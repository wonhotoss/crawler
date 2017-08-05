from django.shortcuts import render
from django.http import JsonResponse
import json
import logging
from django.views.decorators.csrf import ensure_csrf_cookie
import urllib

logger = logging.getLogger( __name__ )

# Create your views here.
def index( request ):
	logger.error( 'error log' )
	return render( request, 'index.html', {} )

@ensure_csrf_cookie
def getDocs( request ):	
	logger.error( request.body )
	decoded = json.loads( request.body.decode( 'utf-8' ) )
	docs = []
	for arg in decoded['args']:
		opener = urllib.request.build_opener()
		opener.addheaders=[('User-agent','Mozilla/5.0')]
		logger.error(arg['URL'])
		with opener.open( arg['URL'] ) as f:
			docs.append(f.read().decode('utf-8'))
	return JsonResponse( docs, safe=False )

