import json
from django.shortcuts import render
import pyrebase
from Notes.forms import LoginForm, RegisterForm
from Notes.models import User
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from django.contrib.auth.decorators import login_required
# Create your views here.
config = {"data": "Use your own firebase config"}
firebase = pyrebase.initialize_app(config)
fauth = firebase.auth()


def index(request):
    if request.user.is_authenticated:
        return HttpResponseRedirect(reverse('home'))
    else:
        return render(request, "Notes/index.html")


def base_layout(request):
    return render(request, "Notes/layout.html")


def signin(request):
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["Email"]
            passwd = form.cleaned_data["Password"]
            try:
                fuser = fauth.sign_in_with_email_and_password(
                    email=email, password=passwd)
                verify = fauth.get_account_info(
                    fuser["idToken"]).get('users')[0].get('emailVerified')
                if verify == False:
                    messages.error(request, "Please verify Email first")
                    return render(request, "Notes/login.html", {
                        "forms": form,
                        "active1": "active"
                    })
                user = User.objects.get(email=email)
                user.verified = verify
                if user.reset == True:
                    user.set_password(passwd)
                    user.reset = False
                user.save()
                user = authenticate(username=user.username, password=passwd)
                login(request, user)
                return HttpResponseRedirect(reverse("home"))
            except Exception as e:
                messages.error(request, "Invalid Credentials")
                return render(request, "Notes/login.html", {
                    "forms": form,
                    "active1": "active"
                })
        else:
            return render(request, "Notes/login.html", {
                "forms": form,
                "active1": "active"
            })
    else:
        return render(request, "Notes/login.html", {
            "forms": LoginForm(),
            "active1": "active"
        })


def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["Email"]
            uname = email[:email.find("@")]
            passwd = form.cleaned_data["Password"]
            conf_pass = form.cleaned_data["Conf_Password"]
            if passwd != conf_pass:
                messages.error(request, "Passwords Doesn't match")
                return render(request, "Notes/register.html", {
                    "forms": form,
                    "active2": "active"
                })
            try:
                user = User.objects.create_user(
                    username=uname, email=email, password=passwd, photoURL="/static/Notes/user.png")
                user.save()
                fuser = fauth.create_user_with_email_and_password(
                    email, passwd)
                fauth.send_email_verification(fuser["idToken"])
                messages.success(
                    request, "An Email is sent to your Email address please verify it to continue login")
                return HttpResponseRedirect(reverse("login"))
            except:
                messages.error(request, "Email Already Exists")
                return render(request, "Notes/register.html", {
                    "forms": form,
                    "active2": "active"
                })
        else:
            return render(request, "Notes/register.html", {
                "forms": form,
                "active2": "active"
            })
    else:
        return render(request, "Notes/register.html", {
            "forms": RegisterForm(),
            "active2": "active"
        })


def signout(request):
    logout(request)
    messages.success(request, "Logout Successful")
    return HttpResponseRedirect(reverse('index'))


def forget(request):
    if request.method == "POST":
        email = request.POST.get("Email", "")
        try:
            user = User.objects.get(email=email)
            user.reset = True
            user.save()
        except User.DoesNotExist:
            messages.error(request, "This email is not registered with us")
            return render(request, "Notes/forget.html")
        fauth.send_password_reset_email(email=email)
        messages.info(request, "Reset link is sent to your email")
        return HttpResponseRedirect(reverse('login'))
    else:
        return render(request, "Notes/forget.html")


def cont(request):
    if request.method == "POST":
        data = request.POST.get("details", "")
        datadict = json.loads(data)
        email = datadict["email"]
        uname = datadict["displayName"]
        verify = datadict["emailVerified"]
        photourl = datadict["photoURL"]
        try:
            user = User.objects.get(email=email)
            user.verified = verify
            user.photoURL = photourl
            user.username = uname
            user.save()
        except User.DoesNotExist:
            user = User.objects.create_user(
                username=uname, email=email, password="", verified=verify, photoURL=photourl)
            user.save()
        user = authenticate(username=user.username, password="")
        login(request, user)
        return HttpResponseRedirect(reverse("home"))
    else:
        return render(request, "Notes/continue.html")


@login_required
def home(request):
    i = 8
    size = []
    while(i <= 72):
        size.append(i)
        if(i >= 12 and i < 28):
            i += 2
        elif(i == 28):
            i += 8
        elif(i == 36):
            i += 12
        elif(i == 48):
            i += 24
        else:
            i += 1
    return render(request, "Notes/home.html", {
        "sizes": size,
    })


@login_required
def theme(request):
    try:
        user = User.objects.get(pk=request.user.pk)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=400)
    if(request.method == "GET"):
        return JsonResponse({"theme": user.themeid}, status=200)
    else:
        data = json.loads(request.body)
        theme = data.get("theme", 0)

        user.themeid = theme
        user.save()
        return JsonResponse({"msg": "Theme setted", "theme": theme}, status=200)
