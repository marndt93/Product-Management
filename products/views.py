from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import Products
from django.core import serializers
import operator
from django.db.models import Q
from functools import reduce
import os
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponse
from django.urls import reverse


def index(request):
    with open(os.path.join(settings.BASE_DIR, 'build', 'index.html')) as file:
        return HttpResponse(file.read())


@csrf_exempt
def product(request):
    if "GET" == request.method:
        return get_products(request)
    elif "POST" == request.method:
        return add_product(request)
    return JsonResponse({'success':'false','errormessage': 'Unknown request method'}, status=400)


def add_product(request):
    product = json.loads(request.body)
    p = Products.objects.create(
        product_id=product['product_id'],
        description = product['description'],
        datetime = product['datetime'],
        longitude = product['longitude'],
        latitude = product['latitude'],
        elevation = product['elevation']
    )
    p.save()
    payload = serializeProduct(p)
    return JsonResponse({'success':'true','payload': payload}, status=200)

def get_products(request):
    products = Products.objects.all()
    start_date = request.GET.get('startdate')
    end_date = request.GET.get('enddate')

    if start_date and end_date:
        products = products.filter(datetime__range=[start_date, end_date])

    product_id = request.GET.get('product_id')
    if product_id:
        products = products.filter(product_id=product_id)

    format = request.GET.get('format', 'json')
    if format == 'json':
        payload = []
        for product in products:
            payload.append(serializeProduct(product))
    elif format == 'tsv':
        payload = 'id	description	datetime	longitude	latitude	elevation\n'
        for product in products:
            payload += str(product.product_id) + '   ' + \
                product.description + ' '+\
                str(product.datetime) + '    '+\
                str(product.longitude) + '   '+\
                str(product.latitude) + '    '+\
                str(product.elevation) +'\n'
        return HttpResponse({payload})
    else:
        return JsonResponse({'success':'false','errormessage': 'Unknown export format'}, status=400)

    return JsonResponse({'success':'true','payload': payload}, status=200)

def serializeProduct(djangoProduct):
    return {
        'id': djangoProduct.id,
        'product_id': djangoProduct.product_id,
        'description': djangoProduct.description,
        'datetime': djangoProduct.datetime,
        'longitude': djangoProduct.longitude,
        'latitude': djangoProduct.latitude,
        'elevation': djangoProduct.elevation
    }

@csrf_exempt
def product_with_id(request, id):
    if "PUT" == request.method:
        return update_product(request, id)
    elif "DELETE" == request.method:
        return delete_product(id)
    return JsonResponse({'success':'false','errormessage': 'Unknown request method'}, status=400)

def delete_product(id):
    Products.objects.get(id=id).delete()
    return JsonResponse({'success':'true'}, status=200)

def update_product(request, id):
    product = json.loads(request.body)
    p = Products.objects.get(id=id)
    p.product_id = product.get('product_id')
    p.description = product.get('description')
    p.datetime = product.get('datetime')
    p.longitude = product.get('longitude')
    p.latitude = product.get('latitude')
    p.elevation = product.get('elevation')
    p.save()
    payload = serializeProduct(p)
    return JsonResponse({'success':'true','payload': payload}, status=200)

@csrf_exempt
def load(request):
    if "POST" == request.method:
        return load_products(request)
    return JsonResponse({'success':'false','errormessage': 'Unknown request method'}, status=400)

def load_products(request):
    csv_file = request.FILES["csv_file"]
    file_data = csv_file.read().decode("utf-8")
    lines = file_data.split("\n")
    #lines.readLine()
    for line in lines:
        print(line)
        if 'id	description	datetime	longitude	latitude	elevation' not in line:
            fields = line.split("\t")

            p = Products.objects.create(
                product_id=fields[0],
                description=fields[1],
                datetime=fields[2],
                longitude=fields[3],
                latitude=fields[4],
                elevation=fields[5]
            )
            p.save()
    return HttpResponseRedirect('views.index')
