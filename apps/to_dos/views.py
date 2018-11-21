from django.shortcuts import render, redirect
from .models import User
from django.contrib import messages
import bcrypt
from apps.to_dos.models import Agreement
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt



def index(request):
  
    all_agreements_by_current_user = Agreement.objects.filter(created_by=request.session['logged_in_user_id'])
    for a in all_agreements_by_current_user:
      print(a.__dict__)

    context = {
      'all_agreements': all_agreements_by_current_user
    }

    return render(request, 'to_dos/landing.html', context)

def render_due_date(request):
    return render(request, 'to_dos/render_due_date.html')

def view_profile(request):
    context = {
        'user':User.objects.get(id=request.session['logged_in_user_id']),
        'agreements': Agreement.objects.all()
    }
    return render(request, 'to_dos/profile.html',context)

def edit_profile(request):
    
    context = {
        'user':User.objects.get(id=request.session['logged_in_user_id'])  
    }
    return render(request, 'to_dos/profile_edit.html',context)

def profile_update(request):
    user=User.objects.get(id=request.session['logged_in_user_id'])
    if request.method == "POST":
        errors = User.objects.edit_validation(request.POST)
        response = {}
        if len(errors) > 0:
            for k, v in errors.items():
                response[k] = v
            return JsonResponse(response)
        else:
            user.first_name = request.POST['first_name']
            user.last_name = request.POST['last_name']
            user.email = request.POST['email']
            return JsonResponse({'success': 'Profile successfully updated!'})


def add_agreement(request):
    if request.method == "POST":

        
        
        desc_of_agreement = request.POST['description']
        frequency_of_agreement = request.POST['frequency']
        
        is_longterm = False
        due_date = None
        if frequency_of_agreement == "long_term":
            is_longterm = True
        if is_longterm == True:
            due_date = request.POST['due_date']
        
        errors = Agreement.objects.agreement_validation(request.POST)
        response = {}
        if len(errors) > 0:
            for k, v in errors.items():
                response[k] = v
            return JsonResponse(response)

        current_user = User.objects.get(id=request.session['logged_in_user_id'])

        new_agreement = Agreement.objects.create(
            description=desc_of_agreement, frequency_of_agreement=frequency_of_agreement, is_longterm = is_longterm, due_date = due_date, created_by = current_user)
        print("NEW AGREEMENT CREATED")

        return JsonResponse({'success': "yes"})

def render_agreement(request):
    return render(request, 'to_dos/profile_form.html')

@csrf_exempt
def delete_agreement(request, id):
    if request.method == "POST":
        agreement_to_delete = Agreement.objects.get(id = id)
        agreement_to_delete.delete()

        return JsonResponse({"success": "yes"})

@csrf_exempt
def toggle_complete(request, id):
    if request.method == "POST":
        agreement_to_update = Agreement.objects.get(id=id)
        agreement_to_update.is_completed = True
        agreement_to_update.save()
        all_agreements = Agreement.objects.all()
        # for a in all_agreements:
        #     print(a.is_completed)
        print(agreement_to_update.is_completed)

        return JsonResponse({'success': 'yes'})


@csrf_exempt
def toggle_not_complete(request, id):
    if request.method == "POST":
        agreement_to_update = Agreement.objects.get(id=id)
        agreement_to_update.is_completed = False
        agreement_to_update.save()
        print(agreement_to_update.is_completed)

        return JsonResponse({'success': 'yes'})
