const cat_div_element = document.getElementById("cat-div");
const detail_count_element = document.getElementById("detail-count");
const detail_element = document.getElementById("detail");
const load_data = async (cat_id) => {
  try {
    const res = cat_id
      ? await fetch(
          `https://openapi.programming-hero.com/api/news/category/0${cat_id}`
        )
      : await fetch("https://openapi.programming-hero.com/api/news/categories");

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
  const data = await load_data(cat_id);
  const data_obj_arr = data.data;
  console.log(data_obj_arr);
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
      view
    );
    detail_element.appendChild(card_div);
    console.log(item.rating.number);
    console.log(item.rating.number / 0.5);
    card_div.querySelector(".rating").children[
      Math.round(item.rating.number / 0.5)
    ].checked = true;
  });

  console.log();
}

display_catagories();

const create_card_innerhtml = (
  title,
  img,
  detail,
  author_img,
  author_name,
  date,
  view
) => {
  const inner_html = `
  <div class="card card-side bg-base-100 shadow-xl p-5">
          <figure >
            <img
              class="rounded-lg w-72"
              src="${img}"
              alt="Movie"
            />
          </figure>
          <div class="card-body px-20 ">
            <h2 class="card-title text-2xl font-bold mb-2">
              ${title}
            </h2>
            <p class="h-44 text-gray-500 font-base text-xl detail leading-normal text-elipsis overflow-hidden">
              ${detail}
            </p>
            <div class="card-actions justify-between text-lg items-center mt-4">
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
                <a class="btn btn-link text-2xl hover:no-underline"
                  ><i class="fa-solid fa-arrow-right"></i
                ></a>
              </div>
            </div>
          </div>
        </div>
  `;
  return inner_html;
};
