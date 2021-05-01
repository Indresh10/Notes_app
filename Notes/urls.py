from django.urls import path
from Notes import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.signin, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.signout, name="logout"),
    path("forget-password", views.forget, name="forget"),
    path("continue", views.cont, name="continue"),
    path("home", views.home, name="home"),
    path("theme", views.theme, name="theme"),
    path("base_layout", views.base_layout, name="base"),
]
