const baseUrl = 'http://localhost:8081';

// export const getMovies = () => {
//     return fetch(`${baseUrl}/movies`)

//     .then(response => {
//         return response.json();
//     })
// };

export const getMovies = () => {
    return fetch(`${baseUrl}/movies`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())

}

export const addMovie = (movieData) => {
    return fetch(`${baseUrl}/movies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error adding movie:', error);
            throw error; // Re-throw the error to propagate it to the calling code
        });
};
