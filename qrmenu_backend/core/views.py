from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from . import models, serializers

# Create your views here.
class PlaceList(generics.ListCreateAPIView):
    serializer_class = serializers.PlaceSerializer
    
    def get_queryset(self):
        return models.Place.objects.filter(owner_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

@api_view(['GET'])
def getPlaceList(request):
    places = models.Place.objects.all()
    serializer = serializers.PlaceSerializer(places, many=True)
    return Response(serializer.data)  


class PlaceDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.PlaceDetailSerializer
    queryset = models.Place.objects.all()

class CategoryList(generics.CreateAPIView):
    serializer_class = serializers.CategorySerializer

class CategoryDetail(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.CategorySerializer
    queryset = models.Category.objects.all()

class MenuItemList(generics.CreateAPIView):
    serializer_class = serializers.MenuItemSerializer

class MenuItemDetail(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = serializers.MenuItemSerializer
    queryset = models.MenuItem.objects.all()

