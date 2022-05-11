import React, { Component } from "react";
import _ from "lodash";
import { getMovies } from "../services/fakeMovieServices";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/Pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/ListGroup";
import filter from "../utils/filter";
import MoviesTable from "./MoviesTable";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
		this.setState({ movies: getMovies(), genres, selectedGenre: genres[0] });
	}

	handleDelete = (movieId) => {
		const movies = this.state.movies.filter((movie) => movie._id !== movieId);
		this.setState({ movies });
	};

	getPagedData = () => {
		const {
			currentPage,
			pageSize,
			movies: allMovies,
			selectedGenre,
			sortColumn,
		} = this.state;

		const filtered = filter(allMovies, selectedGenre);
		const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
		const movies = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: movies };
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

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	render() {
		let { length: count } = this.state.movies;
		const { currentPage, pageSize, genres, selectedGenre, sortColumn } =
			this.state;

		if (!count) return <p>There are no movies in the database.</p>;

		const { totalCount, data: movies } = this.getPagedData();

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
					<p>Showing {totalCount} movies in the database.</p>
					<MoviesTable
						movies={movies}
						sortColumn={sortColumn}
						onLike={this.handleLike}
						onDelete={this.handleDelete}
						onSort={this.handleSort}
					/>
					<Pagination
						currentPage={currentPage}
						itemsCount={totalCount}
						pageSize={pageSize}
						onPageChange={this.handlePageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
