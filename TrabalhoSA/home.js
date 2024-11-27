const filmes = [
    { id: 1, titulo: "A Vida de Madam C.J. Walker", genero: "Biografia", duracao: "45min", link: "./filmes/madam-cj-walker.html" },
    { id: 2, titulo: "The Circle EUA", genero: "Reality Show", duracao: "50min", link: "./filmes/the-circle-eua.html" },
    { id: 3, titulo: "Que Mal Eu Fiz a Deus?", genero: "Comédia", duracao: "1h 40min", link: "./filmes/que-mal-eu-fiz.html" },
    { id: 4, titulo: "Toy Boy", genero: "Suspense", duracao: "1h", link: "./filmes/toy-boy.html" },
    { id: 5, titulo: "100 Humanos", genero: "Documentário", duracao: "45min", link: "./filmes/100-humanos.html" },
];

function searchMovies() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsDiv = document.getElementById('search-results');
    
    const resultados = filmes.filter(filme => 
        filme.titulo.toLowerCase().includes(query) ||
        filme.genero.toLowerCase().includes(query)
    );

    if (query === "") {
        resultsDiv.style.display = "none";
        return;
    } else {
        resultsDiv.style.display = "block";
    }

    resultsDiv.innerHTML = "";

    if (resultados.length === 0) {
        resultsDiv.innerHTML = "<div>Nenhum filme encontrado.</div>";
        return;
    }

    resultados.forEach(filme => {
        const div = document.createElement('div');
        div.textContent = filme.titulo;

        div.onclick = function() {
            window.location.href = filme.link;
        };

        resultsDiv.appendChild(div);
    });
}
