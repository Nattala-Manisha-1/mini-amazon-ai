from rest_framework.decorators import api_view
from rest_framework.response import Response
from .product_data import products


@api_view(['GET'])
def get_products(request):
    category = request.GET.get("category")
    max_price = request.GET.get("maxPrice")

    filtered_products = products

    # Filter by category
    if category:
        filtered_products = [
            p for p in filtered_products if p["category"] == category
        ]

    # Filter by max price
    if max_price:
        try:
            max_price = int(max_price)
            filtered_products = [
                p for p in filtered_products if p["price"] <= max_price
            ]
        except ValueError:
            return Response({"error": "Invalid maxPrice value"}, status=400)

    return Response({"products": filtered_products})
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .llm_service import ask_llm
import json


@api_view(['POST'])
def ask_products(request):
    user_query = request.data.get("query")

    if not user_query:
        return Response(
            {"error": "Query is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # Call LLM
        llm_response = ask_llm(user_query, products)

        # Parse JSON returned by model
        parsed_response = json.loads(llm_response)

        return Response(parsed_response)

    except json.JSONDecodeError:
        return Response(
            {"error": "AI response format error"},
            status=status.HTTP_502_BAD_GATEWAY
        )

    except Exception as e:
        return Response(
        {"error": str(e)},
        status=status.HTTP_503_SERVICE_UNAVAILABLE
    )