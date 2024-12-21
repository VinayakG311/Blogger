
from rest_framework import serializers
from .models import Comments,Blog,User,Tag

#Serialize the Tags
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'Tag_Name']  

#Serialize the Comment
class CommentSerializer(serializers.ModelSerializer):
    
    #Extract the Name of Creator of the Comment
    Author = serializers.CharField(source='Creator.Name', read_only=True)
    
    class Meta:
        model=Comments
        fields= ["id","Author","Description","Created_at"]

#Serialize the Blog
class BlogSerializer(serializers.ModelSerializer):
    #Extract the Name of Creator of the Blog
    Author = serializers.CharField(source='Creator.Name', read_only=True)
    
    #Extract the Comments related to this Blog
    comments = CommentSerializer(many=True, read_only=True)
    
    #Extract the Tags related to this Blog
    Tags = TagSerializer(many=True)
    
    class Meta:
        model=Blog
        fields = ["id", "Title", "Description", "Image", "Tags", "Likes", "Bookmarks", "comments", "Author"]

#Serialize the User
class UserSerializer(serializers.ModelSerializer):
    #Extract the Comments made by User
    comments = CommentSerializer(many=True, read_only=True)
    
    #Extract the Blogs posted by User
    blogs = BlogSerializer(many=True, read_only=True)
    class Meta:
        model=User
        fields = ["id","Username"]
