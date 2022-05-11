export default function filter(movies, item) {
	return item && item._id !== ""
		? movies.filter((m) => m.genre._id === item._id)
		: movies;
}
