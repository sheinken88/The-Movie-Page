const API_KEY = `api_key=a836767b9cc13ce5c4ff600a12dca56f`;
const BASE_URL = `https://api.themoviedb.org/3/`;
const popularityURL =
  BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

const popularBtn = document.getElementById("popular");

popularBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${popularityURL}`);
    if (response.status === 200) {
      const data = await response.json();

      let movies = "";

      data.results.forEach((movie) => {
        movies += `
            <div class="col-lg-2 col-md-3 col-sm-4 border">
              <figure class="figure">
                <img
                  src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
                  class="figure-img img-fluid rounded mt-2"
                  alt="..."
                />
                <figcaption class="figure-caption">
                  ${movie.title}
                </figcaption>
              </figure>
            </div>`;
      });

      document.querySelector(".row").innerHTML = movies;
    } else if (response.status === 401) {
      console.log("Wrong API key");
    } else if (response.status === 404) {
      console.log("Movie you look for doesn´t exist");
    } else {
      console.log("Unexpected error occurred");
    }
  } catch (error) {
    console.log(error);
  }
});
