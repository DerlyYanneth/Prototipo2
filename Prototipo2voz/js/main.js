// Se instancia el objeto Artyom para el reconocimiento de voz
var artyom = new Artyom();

// Se añade un evento al hacer clic en el elemento con el id "activar"
document.querySelector("#activar").addEventListener('click', function(){
    // Se reproduce un mensaje de voz para indicar que el reconocimiento de voz está activado
    artyom.say("¡Reconocimiento de voz activado! Di el nombre del Pokémon que quieres buscar.");
});

// Se agregan comandos al objeto Artyom para realizar búsquedas de Pokémon
artyom.addCommands({
    smart:true,
    indexes: ["* pokemon *", "buscar *"], // Se define el patrón de comandos que serán reconocidos
    action: function(i, wildcard){ // Se define la acción a realizar según el comando reconocido
        if(i == 0){ // Si el comando coincide con el primer patrón
            var nombrePokemon = wildcard.trim().toLowerCase(); // Se obtiene el nombre del Pokémon a partir del comando reconocido
            document.getElementById("txt-buscar").value = nombrePokemon; // Se establece el nombre del Pokémon en el campo de búsqueda
            buscarPokemon(nombrePokemon); // Se realiza la búsqueda del Pokémon
        } else if (i == 1) { // Si el comando coincide con el segundo patrón
            var nombrePokemon = wildcard.trim().toLowerCase(); // Se obtiene el nombre del Pokémon a partir del comando reconocido
            document.getElementById("txt-buscar").value = nombrePokemon; // Se establece el nombre del Pokémon en el campo de búsqueda
            buscarPokemon(nombrePokemon); // Se realiza la búsqueda del Pokémon
        }
    }
});

// Se inicializa Artyom con las configuraciones especificadas
artyom.initialize({
    lang:"es-ES", // Se especifica el idioma
    debug:true, // Se habilita el modo de depuración
    continuous: true, // Se habilita el reconocimiento continuo
    speed:1, // Se establece la velocidad de reconocimiento
    soundex: true // Se habilita el uso de SoundEx para mejorar la precisión del reconocimiento
});

// Función para buscar un Pokémon en la API
function buscarPokemon(nombre) {
    // Se realiza una solicitud GET a la API de Pokémon con el nombre del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(response => response.json()) // Se convierte la respuesta a formato JSON
        .then(data => { // Se maneja la respuesta JSON
            if(data.sprites && data.sprites.front_default) { // Si se encontró el Pokémon
                // Se muestra la imagen del Pokémon en el elemento con el id "imagen_pokemon"
                document.getElementById("imagen_pokemon").innerHTML = `<img src="${data.sprites.front_default}" alt="${nombre}">`;
            } else { // Si no se encontró el Pokémon
                // Se muestra un mensaje indicando que el Pokémon no fue encontrado en el elemento con el id "imagen_pokemon"
                document.getElementById("imagen_pokemon").innerHTML = "<p>Pokemon no encontrado</p>";
            }
        })
        .catch(error => { // Se maneja el error en caso de fallo en la solicitud
            console.log("Error:", error); // Se registra el error en la consola
            // Se muestra un mensaje de error en el elemento con el id "imagen_pokemon"
            document.getElementById("imagen_pokemon").innerHTML = "<p>Error al buscar el Pokémon</p>";
        });
}
