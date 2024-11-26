
from django.contrib import admin
from django.urls import path, re_path
from djangoapp.views import *


urlpatterns = [
    path('', home, name='home'),  # Root path for serving the React app (index.html).
    path('recommend/', get_book_recommendations, name='recommend_books'),  # API endpoint.
    path('recommendations/', get_song_recommendations, name='recommendations'),
    re_path(r'^.*$', home, name='home'),  # Catch-all for any other frontend routes.
]
