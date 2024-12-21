# Generated by Django 4.2.17 on 2024-12-20 17:54

import Server.models
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Title', models.CharField(max_length=60)),
                ('Description', models.TextField(max_length=100)),
                ('Image', models.ImageField(blank=True, null=True, upload_to=Server.models.upload_to)),
                ('Tags', models.CharField(max_length=60)),
                ('Likes', models.IntegerField(default=0)),
                ('Bookmarks', models.IntegerField(default=0)),
                ('Created_at', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('Name', models.CharField(max_length=255, unique=True)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Comments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Description', models.TextField(max_length=100)),
                ('Created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('Blog', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='Server.blog')),
                ('Creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='Server.user')),
            ],
        ),
        migrations.AddField(
            model_name='blog',
            name='Creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blogs', to='Server.user'),
        ),
    ]