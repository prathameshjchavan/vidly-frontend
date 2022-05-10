import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, itemsCount, pageSize, onPageChange }) => {
	const pagesCount = Math.ceil(itemsCount / pageSize);
	if (pagesCount === 1) return null;
	const pages = _.range(1, pagesCount + 1);

	return (
		<nav>
			<ul className="pagination">
				{pages.map((page) => (
					<li
						key={page}
						className={`page-item ${currentPage === page && "active"}`}
					>
						<button className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
