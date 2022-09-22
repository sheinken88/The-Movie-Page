let page = 1;

const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", () => {
  if (page < 1000) {
    page += 1;
    loadMovies();
  }
});

previousBtn.addEventListener("click", () => {
  if (page > 1) {
    page -= 1;
    loadMovies();
  }
});

const loadMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=a836767b9cc13ce5c4ff600a12dca56f&page=${page}`
    );
    if (response.status === 200) {
      var data = await response.json();

      let movies = "";

      data.results.forEach((movie) => {
        movies += `
        <div class="col-lg-2 col-md-3 col-sm-4 border">
          <figure class="figure">
            <img loading="lazy"
              src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
              class="figure-img img-fluid rounded mt-2"
              alt="..."
            />
            <figcaption class="figure-caption">
              ${movie.title}
            </figcaption>
            <div class="overview">
              ${movie.overview}
            </div>
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

  // access figures
  const figure = document.querySelectorAll(".figure");
  figure.forEach((fig) => {
    fig.addEventListener("click", () => {
      console.log(data);
    });
  });
};

loadMovies();
