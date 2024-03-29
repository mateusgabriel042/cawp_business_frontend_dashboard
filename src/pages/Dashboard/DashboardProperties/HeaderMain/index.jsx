import React from 'react';
import { BiBuildingHouse, BiHotel } from "react-icons/bi";
import { AiFillCar } from "react-icons/ai";
import { MdOutlineEmojiObjects } from "react-icons/md";
import { Can, or } from "react-access-level";
import { Link } from 'react-router-dom';
import './style.css';

const HeaderMain = () => {
	return (
		<>
			<Can match={or("dashboard:dashboard-view", "dashboard:dashboard-delete", "dashboard:dashboard-update", "dashboard:dashboard-create")}>
				<div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
					<div className="btn-group mr-2" role="group" aria-label="First group">
						<Link to='/dashboard/properties/house/list' className="btn btn-secondary">
							<BiBuildingHouse size="25px" /><label className="lb-link-sidebar mx-2">Casas</label>
						</Link>
						<Link to='/dashboard/properties/hotel/list' className="btn btn-secondary">
							<BiHotel size="25px" /><label className="lb-link-sidebar mx-2">Hoteis</label>
						</Link>
						<Link to='/dashboard/properties/vehicle/list' className="btn btn-secondary">
							<AiFillCar size="25px" /><label className="lb-link-sidebar mx-2">Veículos</label>
						</Link>
						<Link to='/dashboard/properties/utensil/list' className="btn btn-secondary">
							<MdOutlineEmojiObjects size="25px" /><label className="lb-link-sidebar mx-2">Utensílios</label>
						</Link>
					</div>
				</div>

	            
            </Can>
		</>
	);
};

export default HeaderMain;