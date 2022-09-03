const cat_div_element = document.getElementById("cat-div");
const detail_count_element = document.getElementById("detail-count");
const detail_element = document.getElementById("detail");
const load_data = async (cat_id, news_id) => {
  try {
    const res =
      cat_id && news_id
        ? await fetch(
            `https://openapi.programming-hero.com/api/news/${news_id}`
          )
        : cat_id
        ? await fetch(
            `https://openapi.programming-hero.com/api/news/category/0${cat_id}`
          )
        : await fetch(
            "https://openapi.programming-hero.com/api/news/categories"
          );

    const data = await res.json();

    return data;
  } catch (er) {
    console.log(er);
  }
};

const display_catagories = async () => {
  const data = await load_data();
  const cat_obj_arr = data.data.news_category;

  cat_obj_arr.forEach((item) => {
    const cat_element = document.createElement("a");
    cat_element.classList.add(
      "text-gray-400",
      "font-semibold",
      "text-xl",
      "hover:text-primary",
      "hover:bg-indigo-100",
      "px-5",
      "py-2",
      "rounded-lg",
      "cursor-pointer",
      "block",
      "category"
    );
    cat_element.innerText = item.category_name;
    cat_element.setAttribute(
      "onclick",
      `display_all_data_of_cat(${item.category_id}, '${item.category_name}')`
    );

    cat_div_element.appendChild(cat_element);
  });
};

async function display_all_data_of_cat(cat_id, cat_name) {
  const loader = document.getElementById("loader");
  loader.classList.remove("hidden");
  loader.classList.add("block");

  const data = await load_data(cat_id);
  const data_obj_arr = data.data;

  data_obj_arr.sort((x, y) => y.total_view - x.total_view);

  const count_msg = data_obj_arr.length
    ? `${data_obj_arr.length} items found for category ${cat_name}`
    : `No items found for category ${cat_name}`;

  detail_count_element.innerText = count_msg;
  detail_element.innerHTML = "";
  data_obj_arr.forEach((item) => {
    const date = item.author.published_date
      ? new Date(item.author.published_date.split(" ")[0]).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        )
      : "No date available";
    const author_name =
      item.author.name == null ||
      item.author.name == undefined ||
      item.author.name == ""
        ? "No name available"
        : item.author.name;
    const view =
      item.total_view == null ||
      item.total_view == undefined ||
      item.total_view == ""
        ? "No views available"
        : item.total_view;
    const card_div = document.createElement("div");
    card_div.innerHTML = create_card_innerhtml(
      item.title,
      item.thumbnail_url,
      item.details,
      item.author.img,
      author_name,
      date,
      view,
      item._id,
      cat_id
    );
    card_div.classList.add(
      "card",
      "flex-col",
      "md:flex-row",
      "card-side",
      "bg-base-100",
      "shadow-xl",
      "p-5"
    );

    card_div.querySelector(".rating").children[
      Math.round(item.rating.number / 0.5)
    ].checked = true;
    loader.classList.remove("block");
    loader.classList.add("hidden");
    detail_element.appendChild(card_div);
  });
}

const load_modal_data = async (cat_id, news_id) => {
  const res_data = await load_data(cat_id, news_id);
  const data = res_data.data[0];
  const requested_modal = document.getElementById(`${news_id}_modal`);
  requested_modal
    .querySelector(".modal-img")
    .setAttribute("src", data.image_url);
  requested_modal.querySelector(".modal-detail").innerText = data.details;
  requested_modal.querySelector(".modal-title").innerText = data.title;
  requested_modal.querySelector(".views").innerText = data.total_view;
  requested_modal.querySelector(".trending").innerText = data.others_info
    .is_trending
    ? "Currently Trending"
    : "Not Trending";
  requested_modal.querySelector(".badge").innerText = data.rating.badge;

  requested_modal.querySelector(".author").innerText = data.author.name;
  requested_modal.querySelector(".modal-rating").innerText = data.rating.number;
  requested_modal
    .querySelector(".modal-author-img")
    .setAttribute("src", data.author.img);
};

display_catagories();

const create_card_innerhtml = (
  title,
  img,
  detail,
  author_img,
  author_name,
  date,
  view,
  news_id,
  cat_id
) => {
  const inner_html = `
  
          <figure >
            <img
              class="rounded-lg w-72"
              src="${img}"
              alt="Movie"
            />
          </figure>
          <div class="card-body px-2 md:px-20 ">
            <h2 class="card-title text-2xl font-bold mb-2">
              ${title}
            </h2>
            <p class="h-44 text-gray-500 font-base text-xl detail leading-normal text-elipsis overflow-hidden">
              ${detail}
            </p>
            <div class="flex-col gap-y-4 lg:flex-row card-actions justify-between text-lg items-center mt-4">
              <div class="flex justify-between gap-x-4 font-medium">
                <div class="avatar">
                  <div class="w-14 rounded-full">
                    <img src="${author_img}" />
                  </div>
                </div>
                <div>
                  ${author_name}
                  <p class="text-slate-500">${date}</p>
                </div>
              </div>
              <div
                class="card-actions justify-around font-medium text-slate-600"
              >
                <div><i class="fa-regular fa-eye"></i></div>
                <p>${view}</p>
              </div>
              <div class="rating rating-medium rating-half">
                <input type="checkbox" name="rating-10" class="rating-hidden" />
                <input
                disabled  
                type="checkbox"
               
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-1"
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-2"
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-1"
                  
                  
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-2"
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-1"
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-2"
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-1"
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-2"
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-1"
                />
                <input
                disabled  
                type="checkbox"
                  name="rating-10"
                  class="bg-slate-600 mask mask-star-2 mask-half-2"
                />
              </div>
              <div>
                <label for="${news_id}" class="btn btn-link text-2xl hover:no-underline" onclick="load_modal_data(${cat_id},'${news_id}')"
                  ><i class="fa-solid fa-arrow-right"></i
                ></label>
              </div>
            </div>
          </div>
          <!-- The button to open modal -->



<input type="checkbox" id="${news_id}" class="modal-toggle" />
<div class="modal" id="${news_id}_modal">
  <div class="modal-box w-11/12 max-w-5xl">
  <figure><img class="modal-img"></figure>
    <h3 class="font-bold text-2xl mt-10 modal-title"></h3>
    <p class="pt-4 modal-detail"></p>
    <p class="pb-4"><i class="stat-title">${date}</i></p>

    <div class="flex flex-col md:inline-grid stats shadow container">
  
  <div class="flex flex-col-reverse md:inline-grid stat px-2">
    
    <div class="stat-title">Total Views</div>
    <div class="stat-value text-primary views"></div>
   
  </div>
  
  <div class="flex flex-col-reverse md:inline-grid stat px-2">
    <div class="stat-figure text-accent">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
    </div>
    <div class="stat-title trending"></div>
    <div class="badge badge-accent"></div>
    
  </div>
  
  <div class="flex flex-col-reverse md:inline-grid stat px-2">
    <div class="stat-figure text-secondary">
      <div class="avatar">
        <div class="w-16 rounded-full">
          <img class="modal-author-img" />
        </div>
      </div>
    </div>
    <div class="stat-title">Rating:</div>
    <div class="stat-value modal-rating"></div>
    
    <div class="stat-title">Author: <span class="author"></span>
    </div>
   
  </div>
  
</div>


<h1 class="text-2xl font-bold text-accent ml-5 mt-10"> Rate This News</h1>

<div class="rating rating-lg rating-half ml-5  ">
  <input type="checkbox" name="rating-10" class="rating-hidden" />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-1" />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-2 " />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-1"  />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-2" />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-1" />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-2" />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-1" />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-2" />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-1" />
  <input type="checkbox" name="rating-10" class="bg-yellow-500 mask mask-star-2 mask-half-2" />
</div>




    <div class="modal-action">
      <label for="${news_id}" class="btn">Close</label>
      
    </div>
  </div>
</div>
      
  `;
  return inner_html;
};
