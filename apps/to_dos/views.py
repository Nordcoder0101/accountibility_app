from django.shortcuts import render, redirect
from .models import User
from django.contrib import messages

def index(request):
    return render(request, 'to_dos/landing.html')

def view_profile(request):
    return render(request, 'to_dos/profile.html')

def image(request):
    if request.method == "POST":
        
        logged_in_user = User.objects.get(id=request.session['logged_in_user_id'])
        logged_in_user.image=request.POST["image"]
        logged_in_user.save()
        print(logged_in_user)
        return redirect('/home')