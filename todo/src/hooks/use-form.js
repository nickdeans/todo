import { useState } from 'react';

export default function useForm(callback) {
    const [item, setItem] = useState({});
    const handleInputChange = e => {
        setItem({...item, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        e.target.reset();
        callback(item);
        setItem({});
    };

    return[
        handleInputChange,
        handleSubmit
    ]
};

