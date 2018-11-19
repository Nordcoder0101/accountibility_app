from django.shortcuts import render

def index(request):
    # return render(request, )
    pass

def view_profile(request):
    return render(request, 'to_dos/profile.html')