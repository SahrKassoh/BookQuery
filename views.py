from rest_framework.views import APIView
from book_api.models import Books
from book_api.serializers import BookSerializer
from rest_framework.response import Response
from rest_framework import status


class BookList(APIView):
    def get(self, request):
        books = Books.objects.all()  # Complex Data to get all objects
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)


class BookCreate(APIView):
    def post(self, request):
        serializer = BookSerializer(
            data=request.data)  # Serialize from JSON to complex data, user gives us info in JSON
        if serializer.is_valid():  # Check user input to make sure it is valid
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class Book(APIView):
    def get_book_by_pk(self, pk):
        try:
            book = Books.objects.get(pk=pk)
            return book
        except Books.DoesNotExist:
            return None

    def get(self, request, pk):
        book = self.get_book_by_pk(pk)
        if book is not None:
            serializer = BookSerializer(book)
            return Response(serializer.data)
        return Response({'error': 'Book does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        book = self.get_book_by_pk(pk)
        if book is not None:
            serializer = BookSerializer(book, data=request.data)  # Use request data to update the book
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Book does not exist'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        book = self.get_book_by_pk(pk)
        if book is not None:
            book.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'Book does not exist'}, status=status.HTTP_404_NOT_FOUND)
