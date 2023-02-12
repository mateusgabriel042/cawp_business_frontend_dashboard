import React, {useState, useEffect, useContext} from 'react';
import HeaderMain from '../../HeaderMain/index.jsx';
import './style.css';

const List = () => {

	return (

		<>
			<div className="area-crud">
				<HeaderMain />
				
				<div className='section-crud'>
					lista de hoteis
				</div>
			</div>
		</>
	);
};

export default List;