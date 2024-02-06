displayArray(0);

async function displayArray(index) {

    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach((button, i) => {
        if (i === index) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    const outputDiv = document.getElementById('output');
    const res = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await res.json();
    outputDiv.innerHTML = '';

    if (Array.isArray(data.categories)) {
        const Category = data.categories[index];
        
        if (Category && Array.isArray(Category.category_products)) {
            Category.category_products.forEach(products => {

                const product = {
                    title: products.title,
                    price: products.price,
                    vendor: products.vendor,
                    imageUrl: products.image,
                    originalPrice: products.compare_at_price,
                    badge: products.badge_text
                };

                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card');

                const imgDiv = document.createElement('div');
                const image = document.createElement('img');
                image.classList.add('image');
                image.src = product.imageUrl;
                image.alt = product.title;

                if (product.badge) {
                    const badge = document.createElement('p');
                    badge.textContent = `${product.badge}`;
                    badge.classList.add('badge');
                    imgDiv.appendChild(badge);
                }
                imgDiv.appendChild(image);
                const detailsDiv = document.createElement('div');
                detailsDiv.classList.add('details');

                const titleDiv = document.createElement('div');
                titleDiv.classList.add('title');
                const title = document.createElement('h3');
                if (product.title.length > 10)
                    product.title = product.title.substring(0, 10) + "..";
                title.textContent = `${product.title} · `;
                const vendor = document.createElement('h3');
                vendor.textContent = `${product.vendor}`;
                titleDiv.appendChild(title);
                titleDiv.appendChild(vendor);

                const priceDiv = document.createElement('div');
                priceDiv.classList.add('price');
                const curprice = document.createElement('h4');
                curprice.textContent = `Rs: ${product.price}`;
                const disprice = document.createElement('h4');
                disprice.textContent = `${product.originalPrice}`;
                disprice.classList.add('strike');
                const offer = document.createElement('h4');
                const curPrice = parseFloat(product.price);
                const originalPrice = parseFloat(product.originalPrice);
                const discountPercentage = ((originalPrice - curPrice) / originalPrice) * 100;
                const offerText = `${discountPercentage.toFixed(0)}% off`;
                offer.textContent = offerText;
                offer.classList.add('offer');
                priceDiv.appendChild(curprice);
                priceDiv.appendChild(disprice);
                priceDiv.appendChild(offer);

                const button = document.createElement('button');
                button.innerHTML = "Add to Cart";
                button.classList.add('btn');

                cardDiv.appendChild(imgDiv);

                detailsDiv.appendChild(titleDiv);
                detailsDiv.appendChild(priceDiv);
                detailsDiv.appendChild(button);

                cardDiv.appendChild(detailsDiv);

                outputDiv.appendChild(cardDiv);

            });
        } else {
            console.error('Men category or its products not found in data');
        }
    } else {
        console.error('Categories data is not an array');
    }
}
