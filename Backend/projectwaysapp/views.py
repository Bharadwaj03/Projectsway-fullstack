from django.shortcuts import render
from django.http import JsonResponse,response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.middleware.csrf import get_token
import re
from django.http import JsonResponse
import requests
import requests
import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Documentation
from .serializers import DocumentationSerializer
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from bson import ObjectId
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
import requests
from django.http import JsonResponse
from django.http import HttpResponse
from django.shortcuts import redirect
import requests
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from clickupython import client
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
import requests
import time
from django.views import View
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404   
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import AuthenticationFailed

from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.contrib.auth import login, authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend  
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from .serializers import UserLoginSerializer 
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
import json
import requests
from django.http import JsonResponse
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import update_session_auth_hash
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_str 
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.db import IntegrityError
from .models import Project

import json
from rest_framework.decorators import api_view, permission_classes
import json
from django.db import IntegrityError
import requests
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import JSONParser
from .models import Project
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from rest_framework.authtoken.models import Token
from .models import Documentation

from rest_framework import generics
#


##User Registration

class RegistrationView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
       
        error_messages = []

        # Password validation meet my criteria
        if not re.match(r'^(?=.*[A-Z])', password):
            error_messages.append('Password must contain at least one capital letter.')
        if not re.match(r'^(?=.*\d)', password):
            error_messages.append('Password must contain at least one number.')
        if not re.match(r'^(?=.*[@#$!%*?&])', password):
            error_messages.append('Password must contain at least one special character.')
        if not re.match(r'^[\w\d@#$!%*?&]{8,}$', password):
            error_messages.append('Password must be at least 8 characters long.')

        # Email validation 
        if not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            error_messages.append('Invalid email format. Please enter a valid email.')


        # Check if the email is from the allowed domain techjays
        if not email.endswith('@techjays.com'):
          error_messages.append( "Only users with techjays.com email addresses are allowed to register.")

        # Check if the email is unique
        if User.objects.filter(email=email).first():
            return JsonResponse({"error": "Email is already in use"}, status=400)

        if error_messages:
            return JsonResponse({"error": error_messages}, status=400)

        # Create the user account
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()
        print('done')
        return JsonResponse({"msg":"done"},status=200)
    



## Csrf Token
def get_csrf_token(request):
    # Get the CSRF token
    csrf_token = get_token(request)
    print(csrf_token)
    return JsonResponse({'csrfToken': csrf_token})





# Creating Email For Custom Authentication Using Emailid

User = get_user_model()
class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=email)
            hashed_password_db = user.password 

            if user.check_password(password):
                 print(f"User authentication successful for email: {email}")
                 print(f"Hashed password:{hashed_password_db}")
                 return user
            else:
                print(f"Password mismatch for email: {email}")
                print(f"Password entered: {password}")
                print(f"Hashed Password from DB: {user.password}")
                print(f"Hashed Password from Login Attempt: {make_password(password)}")

        except User.DoesNotExist:
            return None



## User Login
class CustomTokenObtainPairView(APIView):
    def post(self, request):
        # Validate the user login data using the serializer
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")

            # Ensure that email is provided
            if not email:
                return Response({"msg": "Email is not specified."}, status=status.HTTP_400_BAD_REQUEST)

            # Authenticate the user
            user = authenticate(request, email=email, password=password, backend='django.contrib.auth.backends.ModelBackend')
            
            if user is not None:
                # Log in the user
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')

                # Generate or retrieve the auth token for the user
                token, created = Token.objects.get_or_create(user=user)
                print('User Authenticated:', request.user.is_authenticated)
                print('User:', request.user)

                # Return the token, username, and email in the response
                return Response({
                    'token': token.key,
                    'username': user.username,
                    'email': user.email,
                }, status=status.HTTP_200_OK)

            else:
                try:
                    # Check if the user with the provided email exists
                    User.objects.get(email=email)
                except User.DoesNotExist:
                    return JsonResponse({"msg": "Email does not exist."}, status=status.HTTP_400_BAD_REQUEST)
                
                # Return an unauthorized response for incorrect password
                return JsonResponse({"msg": "Password is incorrect."}, status=status.HTTP_401_UNAUTHORIZED)

        else:
            # Return validation errors if the serializer data is invalid
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        








# Password reset

@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        try:
           # Decode JSON data from the request body
            data = json.loads(request.body)
            email = data.get('email')
            print("email",email)
            user = User.objects.filter(email=email).first()

            if user:
                # Generate token for password reset one time token
                token = default_token_generator.make_token(user)

                # Construct reset password link
                uid = urlsafe_base64_encode(str(user.pk).encode())
                reset_link = f"http://localhost:3000/reset-password/{uid}/{token}/"

                # Send email with reset link
                send_mail(
                    'Password Reset',
                    f'Click the following link to reset your password: {reset_link}',
                    'hkc3392@gmail.com',
                    [email],
                    fail_silently=False,
                )
                ## Give the response to frontend
                return JsonResponse({'success': True, 'message': 'Password reset email sent.'})
            else:
                return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON data in the request.'}, status=400)

    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)




@csrf_exempt
def reset_password(request, uidb64, token):
    if request.method == 'POST':
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if default_token_generator.check_token(user, token):
                # Reset the user's password
                body_unicode = request.body.decode('utf-8')
                body = json.loads(body_unicode)
                new_password = body.get('new_password')

                  # Password Meet my criteria
                if len(new_password) < 8:
                    return JsonResponse({'success': False, 'message': 'Password must be at least 8 characters long.'}, status=400)

                if not any(char.isdigit() for char in new_password):
                    return JsonResponse({'success': False, 'message': 'Password must contain at least one digit.'}, status=400)

                if not any(char.isupper() for char in new_password):
                    return JsonResponse({'success': False, 'message': 'Password must contain at least one uppercase letter.'}, status=400)

                user.set_password(new_password)
                user.save()
                updated_user = User.objects.get(pk=uid)
                updated_password = updated_user.password
                print(f"Hashed Password After Save: {updated_password}")
                update_session_auth_hash(request, user)  

             
                user.backend = 'django.contrib.auth.backends.ModelBackend'

                
                login(request, user)

                

                return JsonResponse({'success': True, 'message': 'Password reset successfully.'})
            else:
                return JsonResponse({'success': False, 'message': 'Invalid token.'}, status=400)

        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'User not found.'}, status=404)

    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)












## Documentation
    
class DocumentationListCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print('Request comes for documentation creation')
        
        try:
            received_token = request.META.get('HTTP_AUTHORIZATION', '').split('Bearer ')[1]
            print('Received Headers:', received_token)

            try:
                token_obj = Token.objects.get(key=received_token)
                user = token_obj.user.id
            except ObjectDoesNotExist:
                raise AuthenticationFailed('Invalid token or user not found')

            description = request.data.get('description')
            template_link = request.data.get('templateLink')
            attachment = request.data.get('attachment')

            print('User:', user)
            print('Description:', description)
            print('Template Link:', template_link)
            print('Attachment:', attachment)

            documentation = Documentation.objects.create(
                user_id=user,
                description=description,
                template_link=template_link,
                attachment=attachment,
            )

            response_data = {
                'message': 'Documentation created successfully',
                'document_id': documentation.id,
                'user_name': token_obj.user.username,
            }
            print('Response Data:', response_data)

            return Response(response_data, status=status.HTTP_201_CREATED)

        except AuthenticationFailed as auth_error:
            print('Authentication Error:', auth_error)
            return Response({'error': str(auth_error)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print('Internal Server Error:', str(e))
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)









## Google Authentication

@method_decorator(csrf_exempt, name='dispatch')
class CustomGoogleLoginView(APIView):
    def post(self, request):
        google_access_token = request.data.get('tokenId')  

        # TODO: 
       

       
        user_email = "googleuser@example.com"
        user_name = "Google User"
        generated_or_retrieved_token = "google_access_token"

        # Log in the user (customize this based on your application's requirements)
        user, created = User.objects.get_or_create(email=user_email, defaults={'username': user_name})
        login(request, user, backend='django.contrib.auth.backends.ModelBackend')

        # Generate or retrieve the auth token for the user, for the logged user needed the tokem
        token, created = Token.objects.get_or_create(user=user)

        print("token",token)

        # Customize the response as needed and give it to frontend Note check in the frontend console it
        return Response({
            'msg': 'Google login successful',
            'email': user_email,
            'username': user_name,
            'token': token.key,
        }, status=status.HTTP_200_OK)



## Documentation Fetching
    



class DocumentationListView(APIView):
    def get(self, request, *args, **kwargs):
        try:
            documentation_data = Documentation.objects.all()
            serializer = DocumentationSerializer(documentation_data, many=True)
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



#Feedback


import json

class CustomJSONEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

        
class FeedbackCreateView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print('Request comes for feedback creation')
        
        try:
            received_token = request.META.get('HTTP_AUTHORIZATION', '').split('Bearer ')[1]
            print('Received Headers:', received_token)

            try:
                token_obj = Token.objects.get(key=received_token)
                user = token_obj.user.id
            except ObjectDoesNotExist:
                raise AuthenticationFailed('Invalid token or user not found')

            description = request.data.get('description')
            attachment = request.data.get('attachment')
            priority = request.data.get('priority')
            location = request.data.get('location')

            print('User:', user)
            print('Description:', description)
            print('Attachment:', attachment)
            print('Priority:', priority)
            print('Location:', location)

            feedback = Feedback.objects.create(
                 
                user_id=user,
                description=description,
                attachment=attachment,
                priority=priority,
                location=location,
            )

          

           

            response_data = {
                'message': 'Feedback created successfully',
                'id':feedback.id,
                
                'user_name': token_obj.user.username,
            }
            print('Response Data:', response_data)

            json_response = json.dumps(response_data, cls=CustomJSONEncoder)
            return Response(json_response, status=status.HTTP_201_CREATED)

            # return Response(response_data, status=status.HTTP_201_CREATED)

        except AuthenticationFailed as auth_error:
            print('Authentication Error:', auth_error)
            return Response({'error': str(auth_error)}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print('Internal Server Error:', str(e))
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        








## Feedback Fetch
        

class FeedbackListView(APIView):
   
    def get(self, request, *args, **kwargs):
        try:
          
            queryset = Feedback.objects.all()

            # Get the 'sort' query parameter from the request
            sort_option = request.query_params.get('sort', None)

            
            if sort_option == 'age':
              
                queryset = queryset.order_by('date')

            serializer = FeedbackSerializer(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




## Delete Feedback




@method_decorator(csrf_exempt, name='dispatch')
class DeleteFeedbackView(View):
    http_method_names = ['post']

    def post(self, request, feedback_id):
        try:
            feedback = get_object_or_404(Feedback, id=feedback_id)
            feedback.delete()
            return JsonResponse({'message': f'Feedback with id {feedback_id} deleted successfully.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        

class DocumentationDeleteView(APIView):
    def delete(self, request, pk, format=None):
        try:
            documentation = Documentation.objects.get(pk=pk)
            documentation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Documentation.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)       





        
## Click up fetching the data from there



def fetch_clickup_task(access_token, task_ids):
    access_token = '88837891_d3a01f8424aaa53bee8374ce4c5b83698caca1d724d9af5c0d9ef1753129651a'
    task_data_list = []

    for task_id in task_ids:
        url = f'https://api.clickup.com/api/v2/task/{task_id}'
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            task_data = response.json()
            task_data_list.append(task_data)
        else:
            print(f"Error: {response.status_code} - {response.text}")

    return task_data_list

def clickup_task_view(request, task_ids):
    access_token = '88837891_d3a01f8424aaa53bee8374ce4c5b83698caca1d724d9af5c0d9ef1753129651a'
    task_ids_list = task_ids.split('/')
    task_data_list = fetch_clickup_task(access_token, task_ids_list)
    for task_data in task_data_list:
        print(task_data)


    return JsonResponse(task_data_list, safe=False)








## Listing
    

def get_tasks_from_list_url(request, list_url):
    access_token = '88837891_d3a01f8424aaa53bee8374ce4c5b83698caca1d724d9af5c0d9ef1753129651a'  

    headers = {
        'Authorization': f'Bearer {access_token}',   ###  Access token is needed instead of any ohter token
        'Content-Type': 'application/json'
    }

    try:
      
        list_id = list_url.split('/')[-1]

    
        tasks_url = f'https://api.clickup.com/api/v2/list/{list_id}/task'
        response = requests.get(tasks_url, headers=headers)
        tasks = response.json()['tasks']

        return HttpResponse(json.dumps(tasks), content_type='application/json')

    except requests.exceptions.RequestException as e:
        return HttpResponse(json.dumps({'error': str(e)}), status=500, content_type='application/json')







### oauth Token
    
## Give the req to click up to get authoriation
def authorize(request):
    client_id = 'NQY7SRSH28OZ7RGNVONMLSO2OW5MTYKW'
    redirect_uri = 'http://localhost:8000/callback/'  
    authorization_url = f'https://app.clickup.com/api?client_id={client_id}&response_type=code&redirect_uri={redirect_uri}'
    return redirect(authorization_url)

def callback(request):
    client_id = 'NQY7SRSH28OZ7RGNVONMLSO2OW5MTYKW'
    client_secret = '7SMI4CAWBW3CSWODA41682FOJK28FK73C9RGVN5DV72L4DRWS6PDTQVSV11UMBKY'
    redirect_uri = 'http://localhost:8000/callback/' 
    token_url = 'https://api.clickup.com/api/v2/oauth/token'

    code = request.GET.get('code')

 
    payload = {
        'code': code,
        'client_id': client_id,
        'client_secret': client_secret,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code',
    }

    response = requests.post(token_url, data=payload)

    if response.status_code == 200:
       
        access_token = response.json().get('access_token')
        request.session['clickup_access_token'] = access_token
        print("accesstoken",access_token)
       

        return HttpResponse('Authorization successful!')
    else:
        
        return HttpResponse('Authorization failed!')








## Name of the Space
    

def get_phase_sprint_names(request, phase_url):
    access_token = '88837891_d3a01f8424aaa53bee8374ce4c5b83698caca1d724d9af5c0d9ef1753129651a'
    
    # Extract phase ID from the provided URL and create the URL
    phase_id = phase_url.split('/')[-1]

    # Fetch the phase details
    phase_api_url = f'https://api.clickup.com/api/v2/list/{phase_id}'
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }

    phase_response = requests.get(phase_api_url, headers=headers)

    print("API Response Status Code:", phase_response.status_code)  # Add this line for debugging

    if phase_response.ok:
        try:
            phase_data = phase_response.json()
            print("Phase Data:", phase_data) 
            sprint_name = phase_data.get('name')
            print("sprint_name", sprint_name)

           
            folder_info = phase_data.get('folder')
            phase_name = folder_info.get('name') if folder_info else phase_name
            print("Phase Name:", phase_name)

           
            return JsonResponse({"phase_name": phase_name, "sprint_name": sprint_name}, safe=False)

        except Exception as e:
            print("Error processing API response:", str(e))
            return JsonResponse({'error': 'Error processing API response'},)
    else:
        print("Error fetching phase details. Response text:", phase_response.text)
        return JsonResponse({'error': 'Error fetching phase details'},)
