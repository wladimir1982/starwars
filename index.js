let btn = document.querySelector('#btn');


function getInfo() {
    let apiUrl = 'https://swapi.co/api/films/';

    axios.get(apiUrl).then(response => {
        updateInfo(response.data.results);
    })
        .catch(e => console.log('there was an error'));
}

function updateInfo(results) {
    btn.removeEventListener('click', getInfo);
    let ul = document.createElement('ul');
    document.getElementById('info').appendChild(ul);

    for (let i = 0; i <= results.length; i++) {

        let li = document.createElement('li');
        li.id = "item";
        let episodeId = document.createElement('p');
        let name = document.createElement('h2');
        let desc = document.createElement('p');
        let director = document.createElement('p');
        let date = document.createElement('p');
        let span = document.createElement('span');

        li.appendChild(episodeId);
        li.appendChild(name);
        li.appendChild(desc);
        li.appendChild(director);
        li.appendChild(date);

        episodeId.innerHTML = `<span>episode number:</span> ${results[i].episode_id}`;
        name.innerHTML = `<span>name:</span> ${results[i].title}`;
        desc.innerHTML = `<span>description:</span> ${results[i].opening_crawl.replace(/[\n\r]/g, '')}`;
        director.innerHTML = `<span>director:</span> ${results[i].director}`;
        date.innerHTML = `<span>year of issue:</span> ${parseFloat(results[i].created)}`;

        ul.appendChild(li);
        li.addEventListener('click', showCharacter);

        function showCharacter() {
            // li.removeEventListener('click', showCharacter);
            let characterUrl = 'https://swapi.co/api/people/';

            axios.get(characterUrl).then(response => {
                updateCharacters(response.data);
            }).catch(e => console.log('there was an error'));
        }

        function updateCharacters(data) {
            let char = data.results;
            let items = document.getElementsByTagName('li');
            for (let j = 0; j < char.length; j++) {
                let modal = document.getElementById('myModal');
                let heroes = document.createElement('p');
                document.getElementById('modal-content').appendChild(heroes);

                let close = document.getElementsByClassName("close")[0];

                li.addEventListener('click', function showInfo(e) {
                    modal.style.display = "block";
                    heroes.innerHTML = `<span>name:</span> ${char[j].name}, <span>gender:</span> ${char[j].gender}`;
                });
                close.addEventListener('click', function del() {
                    modal.style.display = "none";
                    heroes = ' ';
                });
                window.addEventListener('click', function () {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                });
            }
        }
    }
}

btn.addEventListener('click', getInfo);
