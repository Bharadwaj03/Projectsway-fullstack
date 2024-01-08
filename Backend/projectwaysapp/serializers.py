from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Documentation

class RegistrationSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

class UserLoginSerializer(serializers.Serializer):

    email = serializers.CharField(required=True)
    password = serializers.CharField(required=True)




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class DocumentationSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Documentation
        fields = '__all__'

from .models import Feedback
id = serializers.IntegerField(source='_id', read_only=True) 

class FeedbackSerializer(serializers.ModelSerializer):
 


    class Meta:
        model = Feedback
        fields = ['id', 'user', 'description', 'attachment', 'priority', 'location', 'date']
