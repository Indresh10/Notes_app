from django import forms


class LoginForm(forms.Form):
    Email = forms.EmailField(label="Em@il", widget=forms.EmailInput(
        attrs={'class': "form-control", 'placeholder': 'Email'}))
    Password = forms.CharField(
        label="Password", widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Password'}))


class RegisterForm(forms.Form):
    Email = forms.EmailField(label="Em@il", widget=forms.EmailInput(
        attrs={'class': "form-control", 'placeholder': 'Em@il'}))
    Password = forms.CharField(
        label="Password", widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Password', 'minlength': 8}))
    Conf_Password = forms.CharField(
        label="Confirm Password", widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirm Password'}))
