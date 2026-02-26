import json
import re


def ask_llm(user_query, products):
    query = user_query.lower()
    matching_ids = []

    prices = [product["price"] for product in products]
    min_price = min(prices)
    max_price = max(prices)

    # Extract price if exists
    numbers = re.findall(r"\d+", query)
    user_price = int(numbers[0]) if numbers else None

    for product in products:
        match = False

        # 🔵 Match product name
        if query in product["name"].lower():
            match = True

        # 🔵 Match category
        if query in product["category"].lower():
            match = True

        # 🔵 Match description
        if query in product["description"].lower():
            match = True

        # 🔵 Match tags
        for tag in product["tags"]:
            if query in tag.lower():
                match = True

        # 🔵 Price logic
        if user_price:
            if min_price <= user_price <= max_price:
                if product["price"] <= user_price:
                    match = True
            else:
                return json.dumps({
                    "productIds": [],
                    "summary": f"Products are available only between ₹{min_price} and ₹{max_price}."
                })

        if match:
            matching_ids.append(product["id"])

    if not matching_ids:
        return json.dumps({
            "productIds": [],
            "summary": "No products available matching your query."
        })

    return json.dumps({
        "productIds": list(set(matching_ids)),
        "summary": "Products selected based on your query."
    })