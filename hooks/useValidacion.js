import React, {useState, useEffect} from 'react'

const useValidacion = (stateInicial, validar, fnValidacion) => {

    const [values, setValues] = useState(stateInicial);
    const [error, setError] = useState({});
    const [submitForm, setSubmitForm] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const errores= Object.keys(error).length > 0;
            if(!errores) {
                fnValidacion();
            }

            // const noErrores= Object.keys(error).length === 0;
            // if(noErrores) {
            //     fnValidacion();
            // }
        }
        setSubmitForm(false);
    }, [error])

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(values);
        setError(erroresValidacion);
        setSubmitForm(true);
    }
    return {
        values,
        error,
        submitForm,
        handleSubmit,
        handleChange
    }
}

export default useValidacion
