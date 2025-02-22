import { displayError } from "./component/displayError.js";
const url =
  "https://blog.lifeofsea.de/wp-json/wp/v2/blogs?acf_format=standard&per_page=30";
const singleBlogPages = document.querySelector(".single-blog-pages");
const title = document.querySelector("title");

async function getPost() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    getPostDetail(data);
  } catch (error) {
    singleBlogPages.innerHTML = displayError(
      "An error occurred. Please try again"
    );
    singleBlogPages.classList.add("error");
  }
}

function getPostDetail(postUrl) {
  postUrl.forEach(function () {
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
    const postId = params.get("id");
    const post = postUrl.find(({ id }) => id == postId);
    title.innerHTML = `Blog | ${post.title.rendered}`;
    singleBlogPages.innerHTML = `<section class="banner">
                                    <div style= "background-image: url(${post.acf.featured_image})" class="bannerImage" alt = "${post.acf.alt}"></div>
                                     <div class="banner__content banner-single-page">
                                        <h1>${post.title.rendered}</h1>
                                        <div class="article_wrapper">
                                          <span class="article_author">${post.acf.author}</span>
                                          <span class="article_date">${post.acf.date}</span>
                                        </div>
                                    </div>
                                  </section>
                                <div class="detail_width">    
                                  <div class="detail-wrapper">
                                        <div class="detail_page_image left-side"><img alt = "${post.acf.alt_1}" src=${post.acf.image2} /></div>
                                        <p class="detail_blog first-detail-blog-p">${post.acf.content} ${post.acf.content}</p>
                                        <p class="detail_blog">${post.acf.content}${post.acf.content}</p>
                                        <div class="detail_page_image right-side"><img alt = "${post.acf.alt_2}" src=${post.acf.image3} /></div>
                                        <p class="detail_blog first-detail-blog-p">${post.acf.content}${post.acf.content}</p> 
                                        <p class="detail_blog">${post.acf.content}${post.acf.content}</p>   
                                    </div>
                                  </div>`;
  });
  createImageResize();
}

function createImageResize() {
  const singlePageImages = document.querySelectorAll(".detail_page_image img");
  const bigImage = document.querySelector(".big-size_image");
  singlePageImages.forEach((image) => {
    image.onclick = function () {
      const bigImageSrc = document.querySelector(".big-size_image img");
      bigImage.style.display = "block";
      bigImageSrc.src = image.getAttribute("src");
    };
  });
  window.addEventListener("mouseup", function (event) {
    const bigImageSrc = document.querySelector(".big-size_image img");
    if (event.target != bigImageSrc && event.target.parentNode != bigImageSrc) {
      bigImage.style.display = "none";
    }
  });
}

getPost();
