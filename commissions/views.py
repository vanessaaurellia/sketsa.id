from django.http import Http404, HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.template import RequestContext
from django.urls import reverse
from .models import User, Commissions
import json
from google.oauth2 import id_token
from google.auth.transport import requests

CLIENT_ID = "270310736867-293go8kupbs2hrntgetmj6fk46eil41c.apps.googleusercontent.com"

# Create your views here.
def index(request):
    return HttpResponse(render(request, 'index.html'))

def login(request):
    if request.method == "POST":
        data = json.loads(request.body) 
        token = data['aud']
        try:
            # Check if the token is valid from client
            idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        except:
            return HttpResponse("Unallowed")
            
        new_user, created = User.objects.get_or_create(
            username=str(idinfo['sub']),
            first_name=idinfo['given_name'],
            last_name=idinfo['family_name'],
            email=idinfo['email']
        )
        if created: 
            new_user.save()
            return HttpResponseRedirect(reverse('register')) 
        else:   
            request.session['username'] = new_user.username
            request.session['first_name'] = new_user.first_name
            return HttpResponseRedirect(reverse('user-dashboard'))
        
    elif request.method == "GET":
        string1 = "Hi"
        print("GETTING LOGIN")
        return HttpResponse(render(request, 'login.html'))
    

def register(request):
    return HttpResponse(render(request, 'register.html'))

def user_dashboard(request):
    if request.method == "GET":
        commissions_list = Commissions.objects.order_by('-id_commissions')[:4]
        for commissions in commissions_list:
            print(commissions.commissions_name)
            print(commissions.main_image)
        content = {
            'commissions_list': commissions_list
        }
        return render(request, 'user-dashboard.html', context=content)
    
def commissions(request, commissions_id):
    try:
        commissions = Commissions.objects.get(id_commissions=commissions_id)
        print(commissions)
        # From commissions object, get the seller object
        seller = commissions.seller
    except:
        raise Http404("Commissions does not exist")
    
    print(commissions.get_price())
    data = {
        'commissions': commissions,
        'seller': seller
    }
    return render(request, 'commissions-detail.html', data)