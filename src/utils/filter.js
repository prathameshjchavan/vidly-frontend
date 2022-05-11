export default function filter(movies, item, valueProperty) {
	return item && item._id !== valueProperty
		? movies.filter((m) => m.genre._id === item._id)
		: movies;
}
