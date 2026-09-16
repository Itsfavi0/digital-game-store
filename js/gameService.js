let gamesPromise = null;

export function getGames() {
    if (!gamesPromise) {
        gamesPromise = fetch('juegos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue válida');
                }
                return response.json();
            })
            .catch(error => {
                console.error("Error al cargar juegos.json:", error);
                // Reset promise on error so subsequent calls might retry
                gamesPromise = null;
                throw error;
            });
    }
    return gamesPromise;
}
