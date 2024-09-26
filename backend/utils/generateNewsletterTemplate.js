const cheerio = require("cheerio");

const generateNewsletterEmailTemplate = (
  products,
  activeCoupons,
  blogPosts,
  unsubscribeLink
) => {
  const productRows =
    Array.isArray(products) && products.length > 0
      ? products
          .map(
            (product) => `
        <div class="product-card">
          <img src="${
            product.image && product.image.length
              ? product.image[0]
              : "default-image.jpg"
          }" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${
            product.description.length > 100
              ? product.description.substring(0, 100) + "..."
              : product.description
          }</p>
          <p><strong>Price:</strong> &#x20A6;${product.price}</p>
        </div>`
          )
          .join("")
      : ""; 

  const couponSection =
    activeCoupons && activeCoupons.discount
      ? `
        <div class="coupon-section">
          <h3>Special Offer!</h3>
          <p>Use the coupon code <strong>${activeCoupons.name}</strong> for a ${activeCoupons.discount}% discount!</p>
        </div>
      `
      : "";

  const blogRows =
    Array.isArray(blogPosts) && blogPosts.length > 0
      ? blogPosts
          .map(
            (post) => `
        <div class="blog-card">
          <img src="${post.photo}" alt="${post.title}" class="blog-image" />
          <h3>${post.title}</h3>
          <p>${
            stripHtmlTags(post.textDescription).substring(0, 100) + "..."
          }</p>
          <a href=${process.env.FRONTEND_URL}/blog/${
              post._id
            }>Read More</a>
        </div>`
          )
          .join("")
      : "";

  return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              background-color: #f4f4f4;
              padding: 20px;
            }
            .container {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
              max-width: 800px;
              margin: 0 auto;
            }
            h2 {
              color: #2c3e50;
            }
            .products-container, .blogs-container {
              display: flex;
              flex-wrap: wrap;
              gap: 20px;
              margin-bottom: 30px;
            }
            .product-card, .blog-card {
              background-color: #fafafa;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              flex-basis: calc(33.333% - 20px);
            }
            img {
              width: 100px;
            }
            .product-card h3, .blog-card h3 {
              color: #333;
              font-size: 18px;
            }
            .product-card p, .blog-card p {
              margin: 10px 0;
              font-size: 14px;
            }
            .read-more-link {
              display: inline-block;
              color: #007bff;
              text-decoration: none;
              margin-top: 10px;
            }
            .read-more-link:hover {
              text-decoration: underline;
            }
            .coupon-section {
              background-color: #e6ffe6;
              border: 1px solid #00a000;
              padding: 20px;
              margin-bottom: 30px;
              text-align: center;
            }
            .unsubscribe {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #888;
            }
            .unsubscribe a {
              color: #007bff;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
             <h2>Latest ${productRows ? "Products" : ""} ${
    couponSection ? "Promo" : ""
  } ${blogRows ? "News" : ""}</h2>
            ${
              productRows
                ? `
              <h3>New Products</h3>
              <div class="products-container">
                ${productRows}
              </div>
            `
                : ""
            }
            ${couponSection}
           ${
             blogRows
               ? `<h3>Latest Blog Posts</h3>
            <div class="blogs-container">
              ${blogRows}
            </div>`
               : ""
           }
            <div>
              <h3>Installation & Maintenance Services</h3>
              <p>At Tebtechnology Ltd, we offer professional installation and maintenance services for both solar inverters and CCTV systems. Our team of certified engineers ensures that your system is set up for optimal performance, delivering reliable power solutions and enhanced security.</p>
              <p><b>Our Services Include:</b></p>
              <ul>
                <li><strong>Solar Inverter Installation:</strong> We handle everything from initial site inspection to full setup, ensuring your system operates efficiently.</li>
                <li><strong>CCTV Installation:</strong> Protect your home or business with our expert CCTV system installations.</li>
                <li><strong>Ongoing Maintenance:</strong> To keep your systems in top condition, we offer regular maintenance and checks, ensuring everything works smoothly over time.</li>
              </ul>
              <p>If you need assistance or would like to schedule an installation or maintenance service, our team is just a call or click away. <span>+2347061818588</span></p>
            </div>
            <div class="unsubscribe">
              <p>If you no longer wish to receive these emails, <a href="${unsubscribeLink}">unsubscribe here</a>.</p>
            </div>
          </div>
        </body>
      </html>
    `;
};

// Helper function to strip HTML tags from text
const stripHtmlTags = (html) => {
  const $ = cheerio.load(html);
  return $.text();
};

module.exports = generateNewsletterEmailTemplate;
