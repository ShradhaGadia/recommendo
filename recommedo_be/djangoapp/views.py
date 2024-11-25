
from django.shortcuts import render
from django.http import JsonResponse
from djangoapp.rec_book import get_recommendations


def home(request):
    return render(request,'index.html')


def get_book_recommendations(request):
    try:
        book_title = request.GET.get('book_title')
        genre = request.GET.get('genre')

        if not book_title or not genre:
            return JsonResponse({"error": "Missing book title or genre"}, status=400)

        recommendations = get_recommendations(book_title, genre)

        # Ensure recommendations is a valid list or dict
        if isinstance(recommendations, dict) and "error" in recommendations:
            return JsonResponse(recommendations, status=404)

        return JsonResponse(recommendations, safe=False)

    except Exception as e:
        # Log the error and return a proper JSON error
        print(f"Error: {e}")
        return JsonResponse({"error": "An unexpected error occurred"}, status=500)

    

