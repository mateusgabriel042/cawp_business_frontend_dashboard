import React from 'react';
import { BiChevronsLeft, BiChevronsRight } from "react-icons/bi";
import './style.css';

const MAX_ITEMS = 9;
const MAX_LEFT = (MAX_ITEMS - 1) / 2;

const Pagination = ({qtdPages, offset, setOffset}) => {
	const current = offset;
	const pages = qtdPages;
	const first = Math.max(current - MAX_LEFT, 1);

	const onPageChange = (page) => {
		setOffset(page);
	}

	return (
		<>
			<ul className="pagination">
				<li>
					<button
						className="btn btn-dark"
						onClick={() => onPageChange(1)}
						disabled={current === 1}
					>Primeiro</button>
				</li>
				<li>
					<button
						className="btn btn-dark"
						onClick={() => onPageChange(current - 1)}
						disabled={current === 1}
					><BiChevronsLeft /></button>
				</li>
				{Array.from({length: Math.min(MAX_ITEMS, pages)})
					.map((_, index) => index + first)
					.map((page, index) => (
						page <= pages ?
							<li key={index}>
								<button
									className={page === current ? 'btn active' : 'btn btn-dark'}
									onClick={() => onPageChange(page)}>
										{page}
								</button>
							</li>
							: null
					))
				}
				<li>
					<button
						className="btn btn-dark"
						onClick={() => onPageChange(current + 1)}
						disabled={current === pages}
					><BiChevronsRight /></button>
				</li>
				<li>
					<button
						className="btn btn-dark"
						onClick={() => onPageChange(pages)}
						disabled={current === pages}
					>Último</button>
				</li>
			</ul>
		</>
	);
};

export default Pagination;