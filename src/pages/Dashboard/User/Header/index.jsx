import React, {useState, useContext} from 'react';
import { BiSearch } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { Can } from "react-access-level";
import { useHistory } from "react-router-dom";

const Header = () => {
    const history = useHistory();
    const [column, setColumn] = useState('name');
    const [columns, setColumns] = useState([
        {value: 'name', label: 'Nome'},
        {value: 'email', label: 'Email'},
    ]);

    const [value, setValue] = useState('');
    const [endpoint, setEndpoint] = useState('user');
    const [roleEndpoint, setRoleEndpoint] = useState('user');

    const changeColumn = (ev) => {
        setColumn(ev.target.value);
    }

    const changeValue = (ev) => {
        setValue(ev.target.value.trim());
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(value === '')
            history.push(`/dashboard/${endpoint}/list`);
        else
            history.push(`/dashboard/${endpoint}/search/${column}/${value}`);
    }

	return (
		<>
			<h2 className="title-endpoint">Usuários</h2>

            <div className="row area-actions-crud">
                <div className="group-buttons">
                    <Can resource={roleEndpoint} authority={`${roleEndpoint}-create`}>
                    	<Link to={`/dashboard/${endpoint}/register`} className="btn bg-red first">Adicionar</Link>
                    </Can>

                    <Can resource={roleEndpoint} authority={`${roleEndpoint}-view`}>
                        <Link to={`/dashboard/${endpoint}/list`} className="btn bg-red last">Listar</Link>
                    </Can>
                </div>

                <Can resource={roleEndpoint} authority={`${roleEndpoint}-view`}>
                    <Form onSubmit={onSubmit}>
                        <select className="form-select" name="column" onChange={(ev) => changeColumn(ev)}>
                            {columns?.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                        <InputGroup className="mb-3 input-search">
                            <FormControl placeholder="Buscar" onChange={(ev) => changeValue(ev)} />
                            <Button className="btn bg-red" type="submit"><BiSearch /></Button>
                        </InputGroup>
    	            </Form>
                </Can>
            </div>
        </>
	);
};

export default Header;