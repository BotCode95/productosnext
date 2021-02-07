import styled from '@emotion/styled'

export const  Formulario = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;

    fieldset {
        margin: 2rem 0;
        border: 1px solid var(--gris2);
        font-size: 2rem;
        padding: 2rem;
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display:flex;
    align-items:center;

    label {
        /* el primer numero indica si va a crecer el segundo si decrece y el tercero el width */
        flex: 0 0 150px; 
        font-size: 1.8rem;
    }
    input,
    textarea {
        flex: 1; /* toma el espacio restante del 150px*/
        padding: 1rem;
    }

    textarea {
        height: 400px;
    }
`;
export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align:center;
    text-transform: uppercase;
    color: white;
    font-size: 1.8rem;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;

    &:hover{
        cursor: pointer;
    }
    &:last-of-type {
        margin-bottom: 2rem;
    }
`;

export const TituloForm = styled.h1`
    text-align: center;
    margin-top: 5rem;
`;

export const Error = styled.p`
    background-color: red;
    color: #FFF;
    padding: 1rem;
    text-align:center;
    text-transform: uppercase;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    margin: 2rem 0;
`;