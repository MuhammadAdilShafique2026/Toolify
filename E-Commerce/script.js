/* =========================================================
   ADIMARKAZ — PHASE 02
   SHOP JAVASCRIPT
   ========================================================= */


/* ================= ELEMENTS ================= */

const searchButton =
    document.getElementById("searchButton");

const searchArea =
    document.getElementById("searchArea");

const searchClose =
    document.getElementById("searchClose");

const searchInput =
    document.getElementById("searchInput");


const menuButton =
    document.getElementById("menuButton");

const mobileMenu =
    document.getElementById("mobileMenu");

const mobileMenuClose =
    document.getElementById("mobileMenuClose");


const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");


const productGrid =
    document.getElementById("productGrid");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");

const sortProducts =
    document.getElementById("sortProducts");


/* ================= CART ================= */

let cart =
    Number(
        localStorage.getItem(
            "adiMarkazCart"
        )
    ) || 0;


function updateCart() {

    if (cartCount) {

        cartCount.textContent =
            cart;

    }

}


updateCart();


/* ================= ADD TO CART ================= */

function setupCartButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-cart"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                cart++;

                localStorage.setItem(
                    "adiMarkazCart",
                    cart
                );

                updateCart();


                const oldText =
                    button.textContent;


                button.textContent =
                    "✓";


                button.style.background =
                    "#111";


                setTimeout(() => {

                    button.textContent =
                        oldText;

                    button.style.background =
                        "";

                }, 800);

            }
        );

    });

}


setupCartButtons();


/* ================= CART CLICK ================= */

if (cartButton) {

    cartButton.addEventListener(
        "click",
        () => {

            alert(
                `Your cart contains ${cart} item(s).`
            );

        }
    );

}


/* ================= WISHLIST ================= */

function setupWishlist() {

    const buttons =
        document.querySelectorAll(
            ".wishlist-button"
        );


    buttons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                button.classList.toggle(
                    "liked"
                );


                if (
                    button.classList.contains(
                        "liked"
                    )
                ) {

                    button.textContent =
                        "♥";

                } else {

                    button.textContent =
                        "♡";

                }

            }
        );

    });

}


setupWishlist();


/* ================= CATEGORY FILTER ================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-btn"
    );


let currentCategory =
    "all";


filterButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                (btn) => {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            currentCategory =
                button.dataset.category;


            filterProducts();

        }
    );

});


/* ================= SEARCH ================= */

let currentSearch =
    "";


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            currentSearch =
                searchInput.value
                    .toLowerCase()
                    .trim();


            filterProducts();

        }
    );

}


/* ================= FILTER PRODUCTS ================= */

function filterProducts() {

    const products =
        Array.from(
            document.querySelectorAll(
                ".shop-product"
            )
        );


    let visibleProducts = [];


    products.forEach((product) => {

        const category =
            product.dataset.category
                .toLowerCase();


        const title =
            product.querySelector("h3")
                .textContent
                .toLowerCase();


        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;


        const matchesSearch =
            title.includes(
                currentSearch
            ) ||
            category.includes(
                currentSearch
            );


        if (
            matchesCategory &&
            matchesSearch
        ) {

            product.style.display =
                "";

            visibleProducts.push(
                product
            );

        } else {

            product.style.display =
                "none";

        }

    });


    productCount.textContent =
        visibleProducts.length;


    if (
        visibleProducts.length === 0
    ) {

        noProducts.classList.add(
            "show"
        );

    } else {

        noProducts.classList.remove(
            "show"
        );

    }

}


/* ================= SORT ================= */

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        () => {

            const products =
                Array.from(
                    document.querySelectorAll(
                        ".shop-product"
                    )
                );


            const sort =
                sortProducts.value;


            if (sort === "low") {

                products.sort(
                    (a,b) =>
                        Number(
                            a.dataset.price
                        ) -
                        Number(
                            b.dataset.price
                        )
                );

            }


            if (sort === "high") {

                products.sort(
                    (a,b) =>
                        Number(
                            b.dataset.price
                        ) -
                        Number(
                            a.dataset.price
                        )
                );

            }


            if (sort === "rating") {

                products.sort(
                    (a,b) =>
                        Number(
                            b.dataset.rating
                        ) -
                        Number(
                            a.dataset.rating
                        )
                );

            }


            products.forEach(
                (product) => {

                    productGrid.appendChild(
                        product
                    );

                }
            );


            filterProducts();

        }
    );

}


/* ================= SEARCH OPEN ================= */

if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            searchArea.classList.add(
                "active"
            );

            searchInput.focus();

        }
    );

}


/* ================= SEARCH CLOSE ================= */

if (searchClose) {

    searchClose.addEventListener(
        "click",
        () => {

            searchArea.classList.remove(
                "active"
            );

            searchInput.value = "";

            currentSearch = "";

            filterProducts();

        }
    );

}


/* ================= MOBILE MENU ================= */

if (menuButton) {

    menuButton.addEventListener(
        "click",
        () => {

            mobileMenu.classList.add(
                "active"
            );

            document.body.style.overflow =
                "hidden";

        }
    );

}


function closeMobileMenu() {

    mobileMenu.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


if (mobileMenuClose) {

    mobileMenuClose.addEventListener(
        "click",
        closeMobileMenu
    );

}


document
    .querySelectorAll(
        ".mobile-menu a"
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


/* ================= START ================= */

filterProducts();

console.log(
    "🚀 AdiMarkaz Phase 02 loaded successfully!"
);
/* =========================================================
   PHASE 03 — PRODUCT DETAILS JAVASCRIPT
   ========================================================= */


/* ================= QUANTITY ================= */

const quantityElement =
    document.getElementById("quantity");

const increaseQuantity =
    document.getElementById(
        "increaseQuantity"
    );

const decreaseQuantity =
    document.getElementById(
        "decreaseQuantity"
    );


let quantity = 1;


if (increaseQuantity) {

    increaseQuantity.addEventListener(
        "click",
        () => {

            quantity++;

            quantityElement.textContent =
                quantity;

        }
    );

}


if (decreaseQuantity) {

    decreaseQuantity.addEventListener(
        "click",
        () => {

            if (quantity > 1) {

                quantity--;

                quantityElement.textContent =
                    quantity;

            }

        }
    );

}


/* ================= WISHLIST ================= */

const wishlistButton =
    document.getElementById(
        "wishlistButton"
    );


if (wishlistButton) {

    wishlistButton.addEventListener(
        "click",
        () => {

            wishlistButton.classList.toggle(
                "liked"
            );


            if (
                wishlistButton.classList.contains(
                    "liked"
                )
            ) {

                wishlistButton.textContent =
                    "♥";

            } else {

                wishlistButton.textContent =
                    "♡";

            }

        }
    );

}


/* ================= ADD TO CART ================= */

const addToCart =
    document.getElementById(
        "addToCart"
    );


if (addToCart) {

    addToCart.addEventListener(
        "click",
        () => {

            let cart =
                Number(
                    localStorage.getItem(
                        "adiMarkazCart"
                    )
                ) || 0;


            cart += quantity;


            localStorage.setItem(
                "adiMarkazCart",
                cart
            );


            if (cartCount) {

                cartCount.textContent =
                    cart;

            }


            const originalText =
                addToCart.innerHTML;


            addToCart.innerHTML =
                "✓ Added to Cart";


            addToCart.style.background =
                "#111";

            addToCart.style.color =
                "#fff";

            addToCart.style.borderColor =
                "#111";


            setTimeout(() => {

                addToCart.innerHTML =
                    originalText;

                addToCart.style.background =
                    "";

                addToCart.style.color =
                    "";

                addToCart.style.borderColor =
                    "";

            }, 1200);

        }
    );

}


/* ================= BUY NOW ================= */

const buyNow =
    document.getElementById(
        "buyNow"
    );


if (buyNow) {

    buyNow.addEventListener(
        "click",
        () => {

            let cart =
                Number(
                    localStorage.getItem(
                        "adiMarkazCart"
                    )
                ) || 0;


            cart += quantity;


            localStorage.setItem(
                "adiMarkazCart",
                cart
            );


            alert(
                "Product added! Checkout will be connected in a future phase."
            );

        }
    );

}


/* ================= PRODUCT TABS ================= */

const extraTabs =
    document.querySelectorAll(
        ".extra-tab"
    );

const extraContents =
    document.querySelectorAll(
        ".extra-content"
    );


extraTabs.forEach((tab) => {

    tab.addEventListener(
        "click",
        () => {

            const target =
                tab.dataset.tab;


            extraTabs.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            extraContents.forEach(
                (content) => {

                    content.classList.remove(
                        "active"
                    );

                }
            );


            tab.classList.add(
                "active"
            );


            const targetContent =
                document.getElementById(
                    target
                );


            if (targetContent) {

                targetContent.classList.add(
                    "active"
                );

            }

        }
    );

});


/* ================= THUMBNAILS ================= */

const thumbnails =
    document.querySelectorAll(
        ".thumbnail"
    );


const productEmoji =
    document.getElementById(
        "productEmoji"
    );


thumbnails.forEach((thumbnail) => {

    thumbnail.addEventListener(
        "click",
        () => {

            thumbnails.forEach(
                (item) => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            thumbnail.classList.add(
                "active"
            );


            if (productEmoji) {

                productEmoji.textContent =
                    thumbnail.textContent;

            }

        }
    );

});


console.log(
    "🛍️ AdiMarkaz Product Page loaded!"
);