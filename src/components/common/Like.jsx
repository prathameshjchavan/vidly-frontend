import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Like = ({ liked, onClick }) => {
	return (
		<div style={{ cursor: "pointer" }} onClick={onClick}>
			{liked ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
		</div>
	);
};

export default Like;
