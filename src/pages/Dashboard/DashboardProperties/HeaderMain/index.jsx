import React, {useState, useEffect, useContext} from 'react';
import { BiBuildingHouse, BiHotel } from "react-icons/bi";
import { GiGroundSprout } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { MdOutlineEmojiObjects } from "react-icons/md";



import { Can, or } from "react-access-level";
import { Link } from 'react-router-dom';
import './style.css';

const HeaderMain = () => {

	return (

		<>
			<Can match={or("dashboard:dashboard-view", "dashboard:dashboard-delete", "dashboard:dashboard-update", "dashboard:dashboard-create")}>
				<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
					<div class="btn-group mr-2" role="group" aria-label="First group">
						<Link to='/dashboard/properties/house/list' className="btn btn-secondary">
							<BiBuildingHouse size="25px" /><label className="lb-link-sidebar mx-2">Casas</label>
						</Link>
						<Link to='/dashboard/properties/hotel/list' className="btn btn-secondary">
							<BiHotel size="25px" /><label className="lb-link-sidebar mx-2">Hoteis</label>
						</Link>
						<Link to='/dashboard/properties/house/list' className="btn btn-secondary">
							<AiFillCar size="25px" /><label className="lb-link-sidebar mx-2">Altomoveis</label>
						</Link>
						<Link to='/dashboard/properties/house/list' className="btn btn-secondary">
							<MdOutlineEmojiObjects size="25px" /><label className="lb-link-sidebar mx-2">Objetos festiveis</label>
						</Link>
						<Link to='/dashboard/properties/house/list' className="btn btn-secondary">
							<GiGroundSprout size="25px" /><label className="lb-link-sidebar mx-2">Terrenos</label>
						</Link>
					</div>
				</div>

	            
            </Can>
		</>
	);
};

export default HeaderMain;