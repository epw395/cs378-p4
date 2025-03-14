import React, { useState, useEffect } from 'react';

// Bootstrap Imports
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

// Other Imports
import { motion } from "framer-motion";
import TypeList from "./Types";
import default_sprite from '../assets/default-pokemon-sprite.png';

const ListEntry = ({ name, show, onShow, onAdd}) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon/' + name)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));
    }, [name]);

    const formatID = (num) => {
        const paddedNum = "#" + String(num).padStart(4, '0');
        return paddedNum;
    }

    return (
        <>
            {data &&
                <ListGroup.Item className="list-entry" as="li" action onClick={() => onAdd(data)}>
                    <Row>
                        <Col xs="auto" className="d-flex">
                            <motion.img
                                alt={name + " sprite"}
                                src={data ? data.sprites.front_default !== null ? data.sprites.front_default : default_sprite : default_sprite}
                                width="40"
                                height="40"
                                className="d-inline-block align-self-center"
                                whileHover={{
                                    transform: "translateY(2px)",
                                    transition: { repeat: Infinity, duration: 0.3, ease: "easeInOut" },
                                }}

                            />{' '}
                        </Col>
                        <Col xs="auto" className="d-flex flex-column justify-content-center">
                            <p className="pokemon-index m-0">{formatID(data ? data.id : 0)}</p>
                        </Col>
                        <Col xs={4} className="d-flex flex-column justify-content-center">
                            <p className="pokemon-name m-0">{name.charAt(0).toUpperCase() + String(name).slice(1)}</p>
                        </Col>
                        <Col xs className="d-flex flex-sm-row align-items-center justify-content-sm-start ms-1">
                            {data &&
                                <TypeList types={data.types} />
                            }
                        </Col>
                    </Row>
                </ListGroup.Item>
            }
        </>
    );
};

export default ListEntry;