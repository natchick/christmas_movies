const baseUrl = 'http://localhost:8081';

// export const getMovies = () => {
//     return fetch(`${baseUrl}/movies`)
    
//     .then(response => {
//         return response.json();
//     })
// };

export const getMovies = () => {
   return fetch(`${baseUrl}/movies`,{
headers: {
    'Content-type': 'application/json; charset=UTF-8',
}, })
.then((response) => response.json())

}

