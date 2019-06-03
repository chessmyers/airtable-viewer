export const searchMovies = (movies, searchTerm) => {
    return movies.filter((movie) => {
        return (movie.fields["SD Title"] && movie.fields["SD Title"].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
            || (movie.fields["Título"] && movie.fields["Título"].toLowerCase().indexOf(searchTerm.toLowerCase()) > 1)
            || (movie.fields.Nationality && movie.fields.Nationality[0].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
            || (movie.fields.Cast && movie.fields.Cast.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
            || (movie.fields.Director && movie.fields.Director.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
            || (movie.fields["SREF#"] && movie.fields["SREF#"].toString().indexOf(searchTerm.toLowerCase()) > -1)
            || (movie.fields["Genre"] && movie.fields["Genre"].join().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
    })
};