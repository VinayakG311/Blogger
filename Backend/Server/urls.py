from django.urls import path
from . import views

urlpatterns = [
    path('blogs/',views.Get_Blogs),                                     #Get All Blogs
    path("blogs_post/",views.Post_Blogs),                               #Post a Blog (by authenticated User)
    path("register/",views.Create_User),                                #Register an User
    path("login/",views.Login_User),                                    #Login the User
    path("comments_post/",views.Post_Comments),                         #Post a Comment (by authenticated User)
    path("blogs_delete/<int:BlogId>/delete/",views.Delete_Blogs),       #Delete a Blog (only by Creator)
    path("blogs_user/<str:Name>/get/",views.Get_User_Blogs)             #Get All Blogs by User
    
]
