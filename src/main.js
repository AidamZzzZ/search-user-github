const cardInformationEl = document.querySelector(".card-information");
const containerError = document.querySelector(".container-error");
const searchButton = document.querySelector(".btn-search");
const userInput = document.querySelector(".input-user");

async function fetchData() {
	try {
		const user = document.querySelector(".input-user").value;
		const response = await fetch(`https://api.github.com/users/${user}`)
		const data = await response.json()

		const day = data.created_at.slice(8, 10)
		const month = data.created_at.slice(5, 7)
		const year = data.created_at.slice(0, 4)

		containerError.classList.add("filter")
		
		cardInformationEl.innerHTML = `
	      <div class="basic-info">
	        <img src="${data.avatar_url}" alt="user-profile">
	        <h2 class="name">${data.name}</h2>
	        <p class="user-link">@${data.login}<span></span> </p>
	      </div>
	      <p class="bio">${data.bio || "not bio"}</p>
	      <div class="follows">
	        <div class="container-follow">
	          <span>${data.public_repos}</span><p>repositories</p>
	        </div>

	        <div class="container-follow">
	          <span>${data.followers}</span><p>followers</p>
	        </div>
	        
	        <div class="container-follow">
	          <span>${data.following}</span><p>following</p>
	        </div>
	      </div>

	       <p class="joined">Ingreso en GitHub en ${day}/${month}/${year}</p>

		`
	} catch(e) {
		cardInformationEl.innerHTML = "";
		containerError.classList.remove("filter")
	}
}

searchButton.addEventListener("click", () => {
	fetchData()
})

userInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		fetchData();
	}	
})