import React, {useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { BiTachometer, BiGroup, BiMenu, BiLock, BiUser } from "react-icons/bi";
import { RiUserStarLine } from "react-icons/ri";
import { BsMegaphone } from "react-icons/bs";
import { AiOutlineAlert } from "react-icons/ai";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { Can, or } from "react-access-level";
import './style.css';

const Sidebar = () => {
	const [toggleNav, setToggleNav] = useState(true);

	const toggleSidebar = () => {
		const sidebarElement = document.getElementById('sidebar');
		const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
		const lbsLinkSidebar = document.getElementsByClassName('lb-link-sidebar');
		const logoSidebar = document.getElementById('logo-sidebar');
		const logotipo = document.getElementById('logotipo');
		
		if(toggleNav){
			sidebarElement.style.width = '70px';
			logoSidebar.style.display = 'none';
			logotipo.style.display = 'block';
			for(let i = 0; i < lbsLinkSidebar.length; i++){
				lbsLinkSidebar[i].style.display = 'none';
			}
			setToggleNav(false);
		}else {
			sidebarElement.style.width = '300px';
			setTimeout(function(){
				logoSidebar.style.display = 'block';
				logotipo.style.display = 'none';
				for(let i = 0; i < lbsLinkSidebar.length; i++){
					lbsLinkSidebar[i].style.display = 'block';
				}
			}, 300);
			
			setToggleNav(true);
		}
	}


	return (
		<>
			<div className="sidebar" id="sidebar">
				<div className="header-sidebar">
					<a href="/dashboard" className="text-decoration-none">
						<img className="logo-sidebar" id="logo-sidebar" src={`${process.env.PUBLIC_URL}/logos/logo_main_sm.png`} alt="logo" />
						<img className="logotipo" id="logotipo" src={`${process.env.PUBLIC_URL}/logos/logotipo_sm.png`} alt="logo" />
					</a>
				</div>

				{/*<button type="button" className="btn-toggle-sidebar" id="btn-toggle-sidebar" onClick={toggleSidebar}><BiMenu size="20px" /></button>*/}

				<div className="area-links">
					<div className="btn-toggle-sidebar">
						<button type="button" id="btn-toggle-sidebar" onClick={toggleSidebar}>
		            		<BiMenu size="25px" /><label className="lb-link-sidebar">Expandir</label>
		            	</button>
			        </div>

					<Can match={or("dashboard:dashboard-view", "dashboard:dashboard-delete", "dashboard:dashboard-update", "dashboard:dashboard-create")}>
			            <NavLink exact to="/dashboard" activeClassName="activeClicked">
			            	<BiTachometer size="25px" /><label className="lb-link-sidebar">Dashboard</label>
			            </NavLink>
		            </Can>

		            <Can match={or("user:user-view", "user:user-delete", "user:user-update", "user:user-create")}>
			            <NavLink to="/dashboard/user/list" activeClassName="activeClicked">
			            	<BiGroup size="25px" /><label className="lb-link-sidebar">Usuários</label>
			            </NavLink>
		            </Can>

		            <Can match={or("user-service:user-service-view", "user-service:user-service-delete", "user-service:user-service-update", "user-service:user-service-create")}>
			            <NavLink to="/dashboard/user-service/list" activeClassName="activeClicked">
			            	<RiUserStarLine size="25px" /><label className="lb-link-sidebar">Usuários de serviço</label>
			            </NavLink>
		            </Can>

		            <Can match={or("family:family-view", "family:family-delete", "family:family-update", "family:family-create")}>
			            <NavLink to="/dashboard/family/list" activeClassName="activeClicked">
			            	<MdFamilyRestroom size="25px" /><label className="lb-link-sidebar">Famílias</label>
			            </NavLink>
		            </Can>

		            <Can match={or("external-institution:external-institution-view", "external-institution:external-institution-delete", "external-institution:external-institution-update", "external-institution:external-institution-create")}>
			            <NavLink to="/dashboard/external-institution/list" activeClassName="activeClicked">
			            	<FaRegBuilding size="25px" /><label className="lb-link-sidebar">Instituições externas</label>
			            </NavLink>
		            </Can>

		            <Can match={or("place-service:place-service-view", "place-service:place-service-delete", "place-service:place-service-update", "place-service:place-service-create")}>
			            <NavLink to="/dashboard/place-service/list" activeClassName="activeClicked">
			            	<MdOutlineMapsHomeWork size="25px" /><label className="lb-link-sidebar">Locais de serviço</label>
			            </NavLink>
		            </Can>

		            <Can match={or("occurrence:occurrence-view", "occurrence:occurrence-delete", "occurrence:occurrence-update", "occurrence:occurrence-create")}>
			            <NavLink to="/dashboard/occurrence/list" activeClassName="activeClicked">
			            	<AiOutlineAlert size="25px" /><label className="lb-link-sidebar">Ocorrências</label>
			            </NavLink>
		            </Can>

		            <Can match={or("complaint:complaint-view", "complaint:complaint-delete", "complaint:complaint-update", "complaint:complaint-create")}>
			            <NavLink to="/dashboard/complaint/list" activeClassName="activeClicked">
			            	<BsMegaphone size="25px" /><label className="lb-link-sidebar">Denúncias</label>
			            </NavLink>
		            </Can>

		            <Can match={or("acl:acl-view", "acl:acl-delete", "acl:acl-update", "acl:acl-create")}>
			            <NavLink to="/dashboard/access-control/list" activeClassName="activeClicked">
			            	<BiLock size="25px" /><label className="lb-link-sidebar">Controle de acesso</label>
			            </NavLink>
		            </Can>

		            <NavLink to="/dashboard/profile/view" activeClassName="activeClicked">
		            	<BiUser size="25px" /><label className="lb-link-sidebar">Meu perfil</label>
		            </NavLink>
				</div>
			</div>
		</>
	);
};

export default Sidebar;