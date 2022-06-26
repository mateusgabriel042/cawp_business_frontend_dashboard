import React, {useState, useContext} from 'react';
import { BiSearch } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap';
import { Can } from "react-access-level";
import { useHistory } from "react-router-dom";

const HeaderRole = () => {
    const history = useHistory();
    const [column, setColumn] = useState('name');
    const [value, setValue] = useState('');

    const changeColumn = (ev) => {
        setColumn(ev.target.value);
    }

    const changeValue = (ev) => {
        setValue(ev.target.value.trim());
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(value === '')
            history.push(`/dashboard/access-control/list`);
        else
            history.push(`/dashboard/access-control/search/${column}/${value}`);
    }

	return (
		<>
			<h2 className="title-endpoint">Controle de acesso</h2>

            <div className="row area-actions-crud">
                <div className="group-buttons">
                    <Can resource="acl" authority="acl-create">
                	   <Link to='/dashboard/access-control/register' className="btn bg-red first">Adicionar</Link>
                    </Can>

                    <Can resource="acl" authority="acl-view">
                        <Link to='/dashboard/access-control/list' className="btn bg-red last">Listar</Link>
                    </Can>
                </div>

                <Can resource="acl" authority="acl-create">
                    <Form onSubmit={onSubmit}>
                        <select className="form-select" name="column" onChange={(ev) => changeColumn(ev)}>
                            <option value="name">Nome</option>
                            <option value="slug">Slug</option>
                        </select>
                        <InputGroup className="mb-3 input-search">
                            <FormControl placeholder="Busque uma função" onChange={(ev) => changeValue(ev)} />
                            <Button className="btn bg-red" type="submit"><BiSearch /></Button>
                        </InputGroup>
    	            </Form>
                </Can>
            </div>
        </>
	);
};

export default HeaderRole;