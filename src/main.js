document.addEventListener("DOMContentLoaded", function() {

	const cardInformationEl = document.querySelector(".card-information");
	const containerError = document.querySelector(".container-error");
	const errorMesageEl = document.querySelector(".error-message");
	const searchButton = document.querySelector(".btn-search");
	const userInput = document.querySelector(".input-user");

	async function fetchData() {
		try {
			const user = document.querySelector(".input-user").value;
			const response = await fetch(`https://api.github.com/users/${user}`);
			const data = await response.json();

			const day = data.created_at.slice(8, 10);
			const month = data.created_at.slice(5, 7);
			const year = data.created_at.slice(0, 4);

			containerError.classList.add("filter");
			cardInformationEl.classList.remove("filter");
			
			cardInformationEl.innerHTML = `
		      <div class="basic-info">
		        <img src="${data.avatar_url}" alt="user-profile">
		        <div>
			        <h2 class="name">${data.name}</h2>
			        <p class="user-link"><a href="${data.html_url}" target="_blank"><span>@${data.login}</span></a> <i class="fa-solid fa-arrow-up-right-from-square"></i></p>
		      	</div>
		      </div>
		      <p class="bio">${data.bio || "not bio"}</p>
		      <div class="follows">
		        <div class="container-follow">
		          <p><i class="fa-solid fa-user"></i><span>${data.public_repos}</span>repositories</p>
		        </div>

		        <div class="container-follow">
		          <p><i class="fa-solid fa-users"></i><span>${data.followers}</span>followers</p>
		        </div>
		        
		        <div class="container-follow">
		          <p><i class="fa-solid fa-users"></i><span>${data.following}</span>following</p>
		        </div>
		      </div>

		       <p class="joined">Ingreso en GitHub en ${day}/${month}/${year}</p>

			`;
		} catch(e) {
			cardInformationEl.innerHTML = "";
			cardInformationEl.classList.add("filter")
			containerError.classList.remove("filter")
			userInput.value === ""
				? errorMesageEl.textContent = "Porfavor ingrese un usuario de GitHub"
				: errorMesageEl.textContent = "Usuario no encontrado. Por favor verifique el nombre de usuario y vuelva a intentarlo.";
		};
	};

	searchButton.addEventListener("click", () => {
		fetchData();
	});

	userInput.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			fetchData();
		};	
	});
});