import { Component } from "react";
import { getMovies } from "./services/fakeMovieServices";

class Movies extends Component {
	state = {
		movies: getMovies(),
	};

	handleDelete = (movieId) => {
		const movies = this.state.movies.filter((movie) => movie._id !== movieId);
		this.setState({ movies });
	};

	render() {
		const { movies } = this.state;

		return (
			<div>
				<p className="m-2">
					{movies.length !== 0
						? `Showing ${movies.length} movies in the database.`
						: "There are no movies in the database."}
				</p>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
						</tr>
					</thead>
					<tbody>
						{this.state.movies.map(
							({ _id, title, genre, numberInStock, dailyRentalRate }) => (
								<tr key={_id}>
									<td>{title}</td>
									<td>{genre.name}</td>
									<td>{numberInStock}</td>
									<td>{dailyRentalRate}</td>
									<td>
										<button
											onClick={() => this.handleDelete(_id)}
											className="btn btn-danger"
										>
											Delete
										</button>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Movies;
