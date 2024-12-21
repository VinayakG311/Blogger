from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.hashers import check_password
from .serializers import CommentSerializer,BlogSerializer,UserSerializer
from .models import Comments,User,Blog,Tag
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.exceptions import ObjectDoesNotExist
from django.utils.timezone import now

# Create your views here.

@api_view(['GET'])
def Get_Blogs(request): #Get All Blogs
    #Get All Blogs, along with the Comments related to them, and the Tags
    blogs = Blog.objects.prefetch_related('comments','Tags').all()
    return Response(BlogSerializer(blogs,many=True).data)

@api_view(['POST'])
def Post_Blogs(request): #Post a Blog by a logged in user
    #Extract All Tags from the POST Request
    tags=(request.POST.getlist("Tags[]"))
    
    user = User.objects.get(Name=request.data["Author"])
    blog_tags=[]
    #Create Tag if does not exist, else fetch the Tag
    for tag in tags:
        t,c=Tag.objects.get_or_create(Tag_Name=tag)
        blog_tags.append(t)
    #New Blog
    if(request.data["id"]=="-1"):
        new_blog = Blog.objects.create(
            Title=request.data["Title"],
            Description=request.data["Description"],
            Image=request.data["Image"],
            Creator=user,
        )
        new_blog.Tags.set(blog_tags)
        return HttpResponse("Successfully Created")
    #Existing Blog
    else:
        existing_blog = Blog.objects.get(id=request.data["id"])
        existing_blog.Title=request.data["Title"]
        existing_blog.Description=request.data["Description"]
  
        existing_blog.save()
        existing_blog.Tags.set(blog_tags)
        return HttpResponse("Successfully Updated")
    return HttpResponse("Success")

@api_view(['POST'])
def Create_User(request): #Create a User
    new_user = User.objects.create(
        Name=request.data["Name"])
    new_user.set_password(request.data["Password"])
    new_user.save()
    if new_user:
        return Response({"Name": request.data["Name"]}, status=status.HTTP_201_CREATED)
    return Response({},status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def Login_User(request): #Login an existing User
    
    Name =request.data["Name"]
    Password = request.data["Password"]
    if not Name or not Password: #If any required field is empty
        return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(Name=Name)
        
        if check_password(Password,user.password):  #Verify passwords with Django's tools
           
            return Response({'Name': user.Name }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def Post_Comments(request): #Post Comment by a logged in user
    Name=request.data["Name"]
    Description=request.data["Description"]
    BlogID = request.data["BlogId"]
    
    #Get the User who made the Comment, and the Blog it is made for 
    user = User.objects.get(Name=Name)
    blog = Blog.objects.get(id=BlogID)
    new_comment = Comments.objects.create(Creator=user,Blog=blog,Description=Description)
    return HttpResponse("Success")
        
    
    
@api_view(['DELETE'])
def Delete_Blogs(request,BlogId): #Delete Blog by the user who created it
    
    try:
        blog = Blog.objects.get(id=BlogId)
        blog.delete()
        return Response({"message": "Blog deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Blog.DoesNotExist:
        return Response({"error": "Blog not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def Get_User_Blogs(request,Name): #Get Blogs made by the user
    try:
        user = User.objects.get(Name=Name)
        blogs = Blog.objects.filter(Creator=user) #Filter the ones whose author was user
        return Response(BlogSerializer(blogs,many=True).data)
    except User.DoesNotExist:
        return Response({"error: User Does Not Exist"},status=status.HTTP_404_NOT_FOUND)
        