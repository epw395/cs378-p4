import React from 'react';

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';


const TypeList = ({ types }) => {
    return (
        <Row className="m-0 p-0">
            {types.map(type => (
                <TypePill key={type.id} type={type.type}></TypePill>
            ))}
        </Row>
    );
};

const TypePill = ({ key, type }) => {

    const styleBackground = `.type-${type.name} { background-color: var(--type-color-${type.name})}`

    return (
        <>
            <style>
                {styleBackground}
            </style>
            <Col key={key} xs="auto" sm className={"m-1 type type-" + type.name}>{type.name.toUpperCase()}</Col>
        </>
    );
};

export default TypeList;