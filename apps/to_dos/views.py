from django.shortcuts import render, redirect
from apps.login_and_registration.models import User
from apps.to_dos.models import Agreement


def index(request):
    # comment
    return render(request, 'to_dos/landing.html')
    

def view_profile(request):
    return render(request, 'to_dos/profile.html')

def add_profile(request):
    if request.method == "POST":
        desc_of_agreement = request.POST['description']
        frequency_of_agreement = request.POST['frequency']
        is_longterm = False
        due_date = None
        if frequency_of_agreement == "long_term":
            is_longterm = True
        if is_longterm == True:
            due_date = request.POST['due_date']

        current_user = User.objects.get(id=request.session['logged_in_user_id'])

        new_agreement = Agreement.objects.create(
            description=desc_of_agreement, frequency_of_agreement=frequency_of_agreement, is_longterm = is_longterm, due_date = due_date, created_by = current_user)
        print("NEW AGREEMENT CREATED")

        return redirect('/home')

def render_agreement(request):
    return render(request, 'to_dos/profile_form.html')