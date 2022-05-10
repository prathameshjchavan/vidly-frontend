import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
	items,
	textProperty = "name",
	valueProperty = "_id",
	selectedItem,
	onItemSelect,
}) => {
	return (
		<div className="list-group">
			{items.map((item) => (
				<button
					key={item[valueProperty]}
					onClick={() => onItemSelect(item)}
					className={`list-group-item ${selectedItem === item && "active"}`}
				>
					{item[textProperty]}
				</button>
			))}
		</div>
	);
};

ListGroup.propTypes = {
	items: PropTypes.array.isRequired,
	selectedItem: PropTypes.object,
	onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
