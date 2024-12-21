from django.contrib import admin

# Register your models here.
from .models import Comments,Blog,User,Tag


#Registering Comments,Blog,User,Tag Models 
admin.site.register(Comments)
admin.site.register(Blog)
admin.site.register(User)
admin.site.register(Tag)

