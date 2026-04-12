#from .models import User
from django import forms
from django.core import validators
from django.contrib.auth import password_validation
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
#from django.contrib.auth.models import User
from capsulers.models import User
from django.utils.translation import gettext_lazy as _
from django.utils.translation import gettext
from django.core import exceptions
from allauth.account.internal.flows.signup import base_signup_form_class
from allauth.account.internal.flows import manage_email
import allauth.account.internal.flows
from allauth.account.fields import EmailField
from allauth.account.fields import PasswordField
from allauth.utils import generate_unique_username, get_username_max_length, set_form_field_order
from allauth.account import app_settings
from allauth.account.adapter import get_adapter
from allauth.account.models import EmailAddress
from allauth.account.utils import setup_user_email
from allauth.account.utils import user_username
from allauth.account.utils import user_email
import uuid
import copy



class BaseUserSignupForm(base_signup_form_class()):
    """
    User signup form with email and username fields
    automatic generation of unique default username if that field is not required.
    """
    username = forms.CharField(
        label=_('username'),
        min_length=app_settings.USERNAME_MIN_LENGTH,
        widget = forms.TextInput(
            attrs={'placeholder': _('username'), 'autocomplete': 'username'}
        )

    )
    email = EmailField()

    def __init__(self, *args, **kwargs) -> None:
        self._signup_fields=self._get_signup_fields(kwargs)
        self._account_already_exists=False
        super().__init__(*args, **kwargs)
        #username_fields = self.fields['username']

        username_field = self.fields['username']
        username_field.max_length = get_username_max_length()
        username_field.widget.attrs["maxlength"] = str(username_field.max_length)


        username = self._signup_fields.get('username')
        if username:
            if username['required']:
                self.fields['username'].label = gettext('username')
                self.fields['username'].required = True
            else:
                self.fields['username'].label = gettext('username(optional)')
                self.fields['username'].required = False
                self.fields['username'].widget.is_required = False
        else:
            del self.fields['username']
            # self.fields['username'].generate = self.generate_username_unique()
        

        email = self._signup_fields.get('email')
        if email:
            if email['required']:
                self.fields['email'].label = gettext('email')
                self.fields['email'].required = True
            else:
                self.fields['email'].label = gettext('email')
                self.fields['email'].required = False
                self.fields['email'].widget.is_required = False
        else:
            del self.fields['email']

    def generate_username_unique(self):
        email = self.cleaned_data['email']
        email_name = email.split('@') 
        return f"{email_name}_{uuid.uuid().hex[:8]}"
    
    def _get_signup_fields(self, kwargs):
        """
        finds whether a signup field is required or not.
        enforces proper configuration of forms according to required fields.
        """
        signup_fields = copy.deepcopy(app_settings.SIGNUP_FIELDS)
        if "email_required" in kwargs:
            email=signup_fields.get('email')
            if not email:
                raise exceptions.ImproperlyConfigured(
                    "Email is required but not set as a field"
                )
            email['required']=kwargs.pop('email_required')
        if 'username_required' in kwargs:
            username=signup_fields.get('username')
            if not username:
                raise exceptions.ImproperlyConfigured(
                    "Username is required but not set as a field"
                )
            username['required']=kwargs.pop('username_required')
        return signup_fields
    
    def clean_username(self) -> str:
        username = self.cleaned_data['username']
        if not username and not self._signup_fields['username']['required']:
            return username
        username = get_adapter().clean_username(username)
        return username
    
    def _clean_email(self) -> str:
        value = self.cleaned_data['email'].lower()
        value = get_adapter().clean_email(value)
        if value:
            email = self.unique_email_verification(email)
            return value

    def unique_email_verification(self, value):
        email, self._account_already_exists = manage_email.email_already_exists(value)
        return value
    
    def custom_signup(self, request, user):
        return (request, user)
    
    def try_save(self, request):
        """
        prevent multiple creation of an existing email.
        """

        if not self._account_already_exists:
            user = self.save(request)
            resp = None
            
        else:
            email = self._signup_fields.get['email']
            phone=None
            if phone in self._signup_fields:
                phone = self.cleaned_data.get['phone']
            user = None
            resp = allauth.account.internal.flows.signup.PREVENT_ENUMERATION(request, email=email, phone=phone)
        return user, resp
    
    def save(self, request):
        email = self.cleaned_data.get("email")
        if self._account_already_exists:
            raise ValueError(email)
        adapter = get_adapter()
        user = adapter.new_user(request)
        adapter.save_user(request, user, self)
        self.custom_signup(request, user)
        # TODO: Move into adapter `save_user` ?
        setup_user_email(request, user, [EmailAddress(email=email)] if email else [])
        return user


class SignupForm(BaseUserSignupForm):
    def __init__(self, *args, **kwargs) -> None:
        self.by_passkey = kwargs.pop("by_passkey", False)
        super().__init__(*args, **kwargs)
        password1_field = self._signup_fields.get("password1")
        if not self.by_passkey and password1_field:
            self.fields["password1"] = PasswordField(
                label=_("Password"),
                autocomplete="new-password",
                help_text=password_validation.password_validators_help_text_html(),
                required=password1_field["required"],
            )
            if "password2" in self._signup_fields:
                self.fields["password2"] = PasswordField(
                    label=_("Password (again)"),
                    autocomplete="new-password",
                    required=password1_field["required"],
                )

        if hasattr(self, "field_order"):
            set_form_field_order(self, self.field_order)

        honeypot_field_name = app_settings.SIGNUP_FORM_HONEYPOT_FIELD
        if honeypot_field_name:
            self.fields[honeypot_field_name] = forms.CharField(
                required=False,
                label="",
                widget=forms.TextInput(
                    attrs={
                        "style": "position: absolute; right: -99999px;",
                        "tabindex": "-1",
                        "autocomplete": "nope",
                    }
                ),
            )

    def try_save(self, request):
        """
        override of parent class method that adds additional catching
        of a potential bot filling out the honeypot field and returns a
        'fake' email verification response if honeypot was filled out
        """
        honeypot_field_name = app_settings.SIGNUP_FORM_HONEYPOT_FIELD
        if honeypot_field_name:
            if self.cleaned_data[honeypot_field_name]:
                user = None
                adapter = get_adapter()
                # honeypot fields work best when you do not report to the bot
                # that anything went wrong. So we return a fake email verification
                # sent response but without creating a user
                resp = adapter.respond_email_verification_sent(request, None)
                return user, resp

        return super().try_save(request)

    def clean(self) -> dict:
        super().clean()

        # `password` cannot be of type `SetPasswordField`, as we don't
        # have a `User` yet. So, let's populate a dummy user to be used
        # for password validation.
        User = get_user_model()
        dummy_user = User()
        user_username(dummy_user, self.cleaned_data.get("username"))
        user_email(dummy_user, self.cleaned_data.get("email"))
        password = self.cleaned_data.get("password1")
        if password:
            try:
                get_adapter().clean_password(password, user=dummy_user)
            except forms.ValidationError as e:
                self.add_error("password1", e)

        if (
            "password2" in self._signup_fields
            and "password1" in self.cleaned_data
            and "password2" in self.cleaned_data
        ):
            if self.cleaned_data["password1"] != self.cleaned_data["password2"]:
                self.add_error(
                    "password2",
                    _("You must type the same password each time."),
                )
        return self.cleaned_data




#'username',
class CreateUserForm(SignupForm):
    class Meta:
        model = User
        fields = [ 'email', 'password1', 'password2']