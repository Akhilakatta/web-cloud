var input = document.getElementById('input');
var title = document.getElementById('title')
var container = document.getElementById('container');

function getNews(event) {
	
	if (event.keyCode == 13) {

		var xhr = $.get("https://newsapi.org/v1/articles?source=" + input.value + "&title=" + title.value + "&apiKey=612c24355bc24dbcbb4b13496d772971");
		
			xhr.done(function(data) {
				
				for (var i = 0; i < 9; i++) {
					
					var articleImageHeight = Math.floor(Math.random() * 250) + 150;
					var articleContainer = document.createElement('DIV');
					var articleImageContainer = document.createElement('DIV');
					var articleImage = document.createElement('DIV');
					var articleTitle = document.createElement('a');
					var articleAuthor = document.createElement('p');
					var articleDescription = document.createElement('p');
					articleContainer.classList.add('article-container');
					articleImageContainer.classList.add('article-image-container');
					articleImageContainer.style.height = articleImageHeight + 'px';
					articleImage.classList.add('article-image');
					articleTitle.classList.add('article-title');
					articleAuthor.classList.add('article-author');
					articleDescription.classList.add('article-description');
					container.appendChild(articleContainer);
					articleContainer.appendChild(articleImageContainer);
					articleImageContainer.appendChild(articleImage);
					articleContainer.appendChild(articleTitle);
					articleContainer.appendChild(articleAuthor);
					articleContainer.appendChild(articleDescription);
					articleTitle.innerHTML = data.articles[i].title;
					articleTitle.setAttribute('href', data.articles[i].url);
					articleTitle.setAttribute('target', '_blank');
					
					if (data.articles[i].author != "null") {
						articleAuthor.innerHTML = data.articles[i].author;
					}
					
					articleImage.style.background = "url(" + data.articles[i].urlToImage + ") center center no-repeat";
					articleImage.style.backgroundSize = "cover";
					articleDescription.innerHTML = data.articles[i].description;
				}
				
			});

		input.value = "";
		title.value="";
		
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
		
	}
	
}

input.addEventListener('keyup', getNews);