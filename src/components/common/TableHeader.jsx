import { Component } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

class TableHeader extends Component {
	raiseSort = (path) => {
		const { sortColumn, onSort } = this.props;

		if (sortColumn.path === path) {
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		} else {
			sortColumn.path = path;
			sortColumn.order = "asc";
		}

		onSort(sortColumn);
	};

	renderSortIcon = (column) => {
		const { sortColumn } = this.props;

		if (column.path !== sortColumn.path) return null;
		if (sortColumn.order === "asc") return <ArrowDropUpIcon />;
		return <ArrowDropDownIcon />;
	};

	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((column) => (
						<th
							className="clickable"
							key={column.path || column.key}
							onClick={() => this.raiseSort(column.path)}
						>
							{column.label} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
			</thead>
		);
	}
}

export default TableHeader;
