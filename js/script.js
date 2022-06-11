class AlbumsAndPhotos{
	constructor(el) {
		this.list = [];
		this.el = el;
	}

	async get(url) {
		let response = await fetch(url);
		if (response.ok) {
			let json = await response.json();
			this.list = [];
			json.map((el) => {
				this.list.push(el);
			});
			this.render(this.list)
		} else {
			console.log("Ошибка HTTP: " + response.status);
		}
	}

	render(list = []) {
		let lis = '';
		for (let el of list) {
			if (!el) {
				return
			}
			lis += `<li class="${el.albumId ? 'photos-list-item' : 'albums-list-item'}" data-id="${el.id}">${el.albumId ? `<img src="${el.thumbnailUrl}" alt="${el.title}">` : `${el.title}`}</li>`;
		}
		this.el.innerHTML = lis;
	}
}

const albumsList = document.querySelector('.albums-list');
const albums = new AlbumsAndPhotos(albumsList); 

albums.get('https://jsonplaceholder.typicode.com/albums')

const photosList = document.querySelector('.photos-list');
const photos = new AlbumsAndPhotos(photosList);

photos.get('https://jsonplaceholder.typicode.com/photos?albumId=1');

albumsList.addEventListener('click', (event) => {
	if (event.target.classList.contains('albums-list-item')) {
		photos.get(`https://jsonplaceholder.typicode.com/photos?albumId=${event.target.getAttribute('data-id')}`)
	}
});