from django.db import models
from django.utils.timezone import now
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
import os
from django.utils.crypto import get_random_string

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

def upload_to(instance, filename):
    base, ext = os.path.splitext(filename)
    random_str = get_random_string(8) 
    return os.path.join('blog_images/', f'{random_str}{ext}')

# Create your models here.

#Base User: Provides inbuilt Django functionality for an User such as Auth, Password-Hash, etc.
class UserManager(BaseUserManager):
    

    def create_user(self, Name, Password):
        if not Name:
            raise ValueError("The Username field is required.")
        user = self.model(Name=Name)
        user.set_password(Password)  
        user.save(using=self._db)
        return user


#User: User accessing the website
class User(AbstractBaseUser):
    
    Name = models.CharField(max_length=255, unique=True)
    Following = models.ManyToManyField('self', symmetrical=False, related_name='Followers', blank=True )
    Liked_Blogs = models.ManyToManyField('Blog', related_name='liked_by', blank=True)
    Bookmarked_Blogs = models.ManyToManyField('Blog', related_name='bookmarked_by', blank=True)

    objects = UserManager()

    USERNAME_FIELD = "Name"  
    REQUIRED_FIELDS = []  

    def __str__(self):
        return self.Name

#Tag: Tags created related to Blogs
class Tag(models.Model):
    Tag_Name = models.CharField(max_length=50,unique=True)
    def __str__(self):
        return self.Tag_Name
   
   
#Blog: Created by a User.  
class Blog(models.Model):
    
    #Reference the User who created the Blog
    Creator = models.ForeignKey("User",related_name="blogs",on_delete=models.CASCADE)
    Title = models.CharField(max_length=60)
    Description=models.TextField(max_length=100) 
    Image = models.ImageField(upload_to=upload_to, null=True, blank=True)
    
    #Each Blog can have multiple tags. Each Tag can be used by multiple blogs.
    Tags = models.ManyToManyField('Tag', related_name='Tags', blank=True)
    
    Likes = models.IntegerField(default=0)
    Bookmarks = models.IntegerField(default=0)
    Created_at = models.DateTimeField(default=now)
    def __str__(self):
        return f"Posted by {self.Creator.Name} at time {self.Created_at}"
#Comment: Created by a User for a particular Blog
class Comments(models.Model):
    #Reference the User who created the Comment
    Creator = models.ForeignKey("User",related_name="comments",on_delete=models.CASCADE)
    
    #Reference the Blog under which the Comment was created
    Blog = models.ForeignKey("Blog",related_name="comments",on_delete=models.CASCADE)
    Description=models.TextField(max_length=100) 
    Created_at = models.DateTimeField(default=now)
    def __str__(self):
        return f"Commented by {self.Creator.Name} at time {self.Created_at}"
            
        
        
    