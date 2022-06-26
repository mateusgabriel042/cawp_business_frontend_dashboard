import React, {useState, useEffect} from 'react';
import './style.css';
import { BiXCircle } from "react-icons/bi";

const InputTags = props => {
	const [tags, setTags] = useState([]);
	const addTags = event => {
        if (event.key === "," && event.target.value !== "") {
            setTags([...tags, event.target.value.replace(/,/g, "").replace(/\./g, "")]);
            props.selectedTags([...tags, event.target.value.replace(/,/g, "").replace(/\./g, "")]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
	    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
        props.selectedTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
	};

    useEffect(() => {
        if(props.initValues !== ''){
            let tagsTemp = [];
            props.initValues?.forEach(function(item, index){
                tagsTemp.push(item)
            })
            setTags(tagsTemp);
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.initValues]);

    return (
        <div className="tags-input">
            <ul>
                {tags.map((tag, index) => (
                    <li key={index}>
                        <span>{tag}</span>
                        <i onClick={() => removeTags(index)}><BiXCircle /></i>
                    </li>
                ))}
            </ul>
            <input
                className="form-control"
                type="text"
			    onKeyUp={event => addTags(event)}
			    placeholder={`Pressione , para adicionar ${props.placeholder}`}
            />
        </div>
    );
};

export default InputTags;