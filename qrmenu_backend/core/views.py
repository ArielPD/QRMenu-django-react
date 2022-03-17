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
