from django.urls import path
from django.contrib.auth.views import LogoutView
from . import views
from .views import *
from django.contrib.auth.views import LogoutView
from bson import ObjectId
from .views import authorize, callback

urlpatterns=[

     path('api/register/', views.RegistrationView.as_view(), name='register'),
     path('api/get-csrf-token/', get_csrf_token, name='get-csrf-token'),
      path('api/login/',views.CustomTokenObtainPairView.as_view(),name='login'),
      path('api/forgot-password/', forgot_password, name='forgot-password'),
    path('api/reset-password/<str:uidb64>/<str:token>/', reset_password, name='reset-password'),

      path('logout/',LogoutView.as_view(), name='logout'),
       path('api/documentation/', DocumentationListCreateView.as_view(), name='documentation-list-create'),
     path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
       path('api/google-login/', CustomGoogleLoginView.as_view(), name='google_login'),
         path('api/documentationfetch/', DocumentationListView.as_view(), name='documentation-list'),
          path('api/feedback/', FeedbackCreateView.as_view(), name='feedback-create'),
           path('api/feedbackfetch/', FeedbackListView.as_view(), name='feedback-list'),
           path('api/feedback/<str:feedback_id>/', DeleteFeedbackView.as_view(), name='delete_feedback'),
        
          path('api/get_task/<str:task_ids>/', clickup_task_view, name='clickup_task_view'),

         
           path('api/get_tasks_from_list_url/<path:list_url>/', get_tasks_from_list_url, name='get_tasks_from_list_url'),
           
          path('api/get_phase_sprint_names/<path:phase_url>/', get_phase_sprint_names, name='get_phase_sprint_names'),
         
    


         path('authorize/', authorize, name='authorize'),
    path('callback/', callback, name='callback'),
  
     path('api/documentationdelete/<int:pk>/', DocumentationDeleteView.as_view(), name='documentation-delete'),
         
  

]

    
    


 
   
   





