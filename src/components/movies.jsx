import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieServices";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/Pagination";
import Like from "./common/Like";
import paginate from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import filter from "../utils/filter";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
	};

	componentDidMount() {
		const genres = [{ name: "All Genres", _id: "all_genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres, selectedGenre: genres[0] });
	}

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

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	render() {
		let { length: count } = this.state.movies;
		const {
			currentPage,
			pageSize,
			movies: allMovies,
			genres,
			selectedGenre,
		} = this.state;

		if (!count) return <p>There are no movies in the database.</p>;

		const filtered = filter(allMovies, selectedGenre, "all_genres");

		const movies = paginate(filtered, currentPage, pageSize);

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup
						items={genres}
						selectedItem={selectedGenre}
						onItemSelect={this.handleGenreSelect}
					/>
				</div>
				<div className="col">
					<p>Showing {filtered.length} movies in the database.</p>
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
											<Like
												liked={liked}
												onClick={() => this.handleLike(_id)}
											/>
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
						itemsCount={filtered.length}
						pageSize={pageSize}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
