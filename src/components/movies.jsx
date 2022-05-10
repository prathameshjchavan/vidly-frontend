import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieServices";
import Pagination from "./common/Pagination";
import Like from "./common/Like";
import paginate from "../utils/paginate";

class Movies extends Component {
	state = {
		movies: getMovies(),
		pageSize: 4,
		currentPage: 1,
	};

	handleDelete = (movieId) => {
		const movies = this.state.movies.filter((movie) => movie._id !== movieId);
		this.setState({ movies });
	};

	handleLike = (movieId) => {
		let movies = _.cloneDeep(this.state.movies);
		movies = movies.map((movie) => {
			if (movieId === movie._id) movie.liked = !movie.liked;
			return movie;
		});
		this.setState({ movies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	render() {
		const { length: count } = this.state.movies;
		const { currentPage, pageSize, movies: allMovies } = this.state;

		if (!count) return <p>There are no movies in the database.</p>;

		const movies = paginate(allMovies, currentPage, pageSize);

		return (
			<React.Fragment>
				<p>Showing {count} movies in the database.</p>
				<table className="table">
					<thead>
						<tr>
							<th>Title</th>
							<th>Genre</th>
							<th>Stock</th>
							<th>Rate</th>
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{movies.map(
							({
								_id,
								title,
								genre,
								numberInStock,
								dailyRentalRate,
								liked,
							}) => (
								<tr key={_id}>
									<td>{title}</td>
									<td>{genre.name}</td>
									<td>{numberInStock}</td>
									<td>{dailyRentalRate}</td>
									<td>
										<Like liked={liked} onClick={() => this.handleLike(_id)} />
									</td>
									<td>
										<button
											onClick={() => this.handleDelete(_id)}
											className="btn btn-danger btn-sm"
										>
											Delete
										</button>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
				<Pagination
					currentPage={currentPage}
					itemsCount={count}
					pageSize={pageSize}
					onPageChange={this.handlePageChange}
				/>
			</React.Fragment>
		);
	}
}

export default Movies;
