from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .serializers import StockDataSerializer, UsersSerializer
from .models import StockData, Users
from .algorithm_testing import predict
# Create your views here.

class StockDataView(viewsets.ModelViewSet):
    serializer_class = StockDataSerializer
    queryset = StockData.objects.all()
    lookup_field = 'ticker'

    def retrieve(self, request, ticker, pk=None):
        instance = self.get_object()
        return Response(self.serializer_class(instance).data,
                        status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        user = request.user
        predictedData = predict(request.data)
        serializer = self.serializer_class(data=predictedData, context={'author': user})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def update(self, request, pk=None, *args, **kwargs):
    #     user = request.user
    #     instance = self.get_object()
    #     predictedData = predict(request.data)
    #     serializer = self.serializer_class(instance=instance,
    #                                         data=predictedData, # or request.data
    #                                         context={'author': user},
    #                                         partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserView(viewsets.ModelViewSet):
    serializer_class = UsersSerializer
    queryset = Users.objects.all()
    lookup_field = 'username'