from django.test import TestCase
from .models import User,Blog,Comments,Tag
# Create your tests here.


class UserCreateTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(Name='root', Password='root')   
    def test_user(self):
        new_user = User.objects.get(Name="root")
        self.assertEqual(self.user.Name,new_user.Name)
        self.assertEqual(self.user.password,new_user.password)
        
class BlogPostTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(Name='root', Password='root')   
        Blog.objects.create(
            Title="Lorem", 
            Description="Ipsum", 
            Creator=self.user
        )

    def test_blog_content(self):
        blog = Blog.objects.get(id=1)
        self.assertEqual(blog.Title, "Lorem")
        self.assertEqual(blog.Description, "Ipsum")
        self.assertEqual(blog.Creator.Name, "root")
        
class CommentPostTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(Name='root', Password='root')   
        self.blog = Blog.objects.create(
            Title="Lorem", 
            Description="Ipsum", 
            Creator=self.user
        )
        Comments.objects.create(
            Blog=self.blog,
            Creator=self.user,
            Description="Lorem Ipsum"
        )
    def test_comment_content(self):
        comment = Comments.objects.get(id=1)
        self.assertEqual(comment.Description, "Lorem Ipsum")
  

        