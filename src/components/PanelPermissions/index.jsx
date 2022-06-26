import React, {useState, useEffect, useContext} from 'react';
import './style.css';
import { Row, Col } from 'react-bootstrap';

const PanelPermissions = props => {
	const [endpoints, setEndpoints] = useState([]);
    const [permissions, setPermissions] = useState([]);

    const togglePermission = (event)  => {
        if(permissions?.find(permission => permission === event.target.value)?.length > 0){
            setPermissions([...permissions?.filter(permission => permission !== event.target.value)]);
            props.selectedPermissions([...permissions.filter(permission => permission !== event.target.value)]);
        }else{
            setPermissions([...permissions, event.target.value]);
            props.selectedPermissions([...permissions, event.target.value]);
        }
        console.log(permissions);
    };

    const selectAllPermissionsEndpoint = (endpoint, e) => {
        setPermissions([...permissions, `${endpoint}-view`, `${endpoint}-create`, `${endpoint}-update`, `${endpoint}-delete`]);
        //setPermissions([...permissions, `${endpoint}-create`]);
        //setPermissions([...permissions, `${endpoint}-update`]);
        //setPermissions([...permissions, `${endpoint}-delete`]);
        props.selectedPermissions([...permissions, `${endpoint}-view`, `${endpoint}-create`, `${endpoint}-update`, `${endpoint}-delete`]);
        //props.selectedPermissions([...permissions, `${endpoint}-create`]);
        //props.selectedPermissions([...permissions, `${endpoint}-update`]);
        //props.selectedPermissions([...permissions, `${endpoint}-delete`]);
    }

    useEffect(() => {
        if(props.allPermissions !== ''){
            let endpointsTemp = [];
            props.allPermissions?.forEach(function(item, index){

                if (!endpointsTemp.includes(item.name.substr(0, item.name.lastIndexOf('-'))))
                    endpointsTemp.push(item.name.substr(0, item.name.lastIndexOf('-')));
            })
            setEndpoints(endpointsTemp);
        }
        if(props.initValues?.length !== undefined)
            setPermissions(props.initValues);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.allPermissions, props.initValues]);

    return (
        <div className="endpoints-premissions-input container border">
            <ul>
                {endpoints.map((endpoint, index) => (
                    <li key={index}>
                        <Row className="mb-2">
                            <Col sm="2">
                                <span>{endpoint}</span>
                            </Col>
                            <Col sm="2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={permissions?.includes(endpoints[index] + '-view')}
                                        value={endpoints[index] + '-view'}
                                        onClick={(event) => togglePermission(event)}
                                    />
                                    <label clasNames="form-check-label">Visualizar</label>
                                </div>
                            </Col>

                            <Col sm="2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={permissions?.includes(endpoints[index] + '-create')}
                                        value={endpoints[index] + '-create'}
                                        onClick={(event) => togglePermission(event)}
                                    />
                                    <label className="form-check-label">Registrar</label>
                                </div>
                            </Col>

                            <Col sm="2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={permissions?.includes(endpoints[index] + '-update')}
                                        value={endpoints[index] + '-update'}
                                        onClick={(event) => togglePermission(event)}
                                    />
                                    <label className="form-check-label">Editar</label>
                                </div>
                            </Col>

                            <Col sm="2">
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={permissions?.includes(endpoints[index] + '-delete')}
                                        value={endpoints[index] + '-delete'}
                                        onClick={(event) => togglePermission(event)}
                                    />
                                    <label className="form-check-label">Deletar</label>
                                </div>
                            </Col>

                            <Col sm="2">
                                <button type="button" className="btn btn-primary" onClick={(e) => selectAllPermissionsEndpoint(endpoints[index], e)}>Selecionar todos</button>
                            </Col>
                        </Row>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PanelPermissions;