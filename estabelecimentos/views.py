from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Estabelecimento 
from .serializers import *

import json
import urllib.request as req
import urllib.parse as uparse
import math

bingMapsKey = "AlBkQpWuPja8Hes_4z80XeoklgmJNyBeZwpKFRvY9WCFnU0orbWxA__FkEUvB2zG"

def coordinates_from_address(address):
        
        encoded = uparse.quote(address, safe='')

        locationURL = "http://dev.virtualearth.net/REST/V1/Locations?countryRegion=Brazil&addressLine=" + encoded + "&key=" + bingMapsKey

        r1 = req.Request(locationURL)
        r2 = req.urlopen(r1)
        textr2 = r2.read().decode(encoding="utf-8")
        r3 = json.loads(textr2)

        lat = r3["resourceSets"][0]["resources"][0]["point"]["coordinates"][0]
        longit = r3["resourceSets"][0]["resources"][0]["point"]["coordinates"][1]

        return (lat,longit)

def distance_between_addresses(address1, address2):

        lat1,longit1 = coordinates_from_address(address1)

        lat2,longit2 = coordinates_from_address(address2)

        distUrl = "https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?origins=" + str(lat1) + "," + str(longit1) + "&destinations=" + str(lat2) + "," + str(longit2) + "&travelMode=driving&key=" + bingMapsKey

        r1 = req.Request(distUrl)
        r2 = req.urlopen(r1)
        textr2 = r2.read().decode(encoding="utf-8")
        r3 = json.loads(textr2)

        dist = r3["resourceSets"][0]["resources"][0]["results"][0]["travelDistance"]

        return dist

def closest_calc(e,f):

        source = e.endereco

        mindist = math.inf
        closest = e

        for g in f:

            destination = g.endereco
            dist = distance_between_addresses(source, destination)

            if (dist < mindist) and (dist > 0):
                      closest = g
                      mindist = dist

        return closest        

def estabelecimentos_array_of_closest(pk):

        estabelecimentos = Estabelecimento.objects.all()

        estabelecimentos_copy = []

        for e in estabelecimentos:
              estabelecimentos_copy.append(e) 

        estabelecimento = Estabelecimento.objects.get(pk=pk)

        arrayofclosest = []

        quant = 2

        for i in range(quant):

             closest = closest_calc(estabelecimento,estabelecimentos_copy)
              
             arrayofclosest.append(closest)
             estabelecimentos_copy.remove(closest)

        return arrayofclosest

@api_view(['GET'])
def estabelecimentos_near(request, pk):
        
        data = []
        nextPage = 1
        previousPage = 1
        estabelecimentos = estabelecimentos_array_of_closest(pk)

        page = request.GET.get('page', 1)
        paginator = Paginator(estabelecimentos, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = EstabelecimentoSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/estabelecimentosnear/' + pk + '?page=' + str(nextPage), 'prevlink': '/api/estabelecimentosnear/' + pk + '?page=' + str(previousPage)})
        
        

@api_view(['GET', 'POST'])
def estabelecimentos_list(request):
    
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        estabelecimentos = Estabelecimento.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(estabelecimentos, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = EstabelecimentoSerializer(data,context={'request': request} ,many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/api/estabelecimentos/?page=' + str(nextPage), 'prevlink': '/api/estabelecimentos/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = EstabelecimentoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def estabelecimentos_detail(request, pk):

    try:
        estabelecimento = Estabelecimento.objects.get(pk=pk)
    except Estabelecimento.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EstabelecimentoSerializer(estabelecimento,context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EstabelecimentoSerializer(estabelecimento, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        estabelecimento.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
