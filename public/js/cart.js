// Update quantity cart
const inputsQuantity = document.querySelectorAll("input[name='quantity']");

if(inputsQuantity.length > 0) {
    inputsQuantity.forEach(input => {
        input.addEventListener("change", (e) => {
            const productId = input.getAttribute("product-id");
            const quantity = e.target.value;

            // console.log(productId);
            // console.log(quantity);
            
            window.location.href =  `/cart/update/${productId}/${quantity}`
        });
    });
};



// End Update quantity cart