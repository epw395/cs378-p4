import React, { useState, useEffect } from 'react';

// Bootstrap React Imports
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsSearch } from "react-icons/bs";

// Other Imports
import pokeball from '../assets/poke-ball.png';

function MainNavbar({handleQuery}) {
    const ITEM_COUNT = 16;
    const [item, setItem] = useState(null);

    const handleChange = (event) => {
        handleQuery(event.target.value.toLowerCase());
    }

    useEffect(() => {

        setInterval(function () {
            const url = 'https://pokeapi.co/api/v2/item/' + randomItem();

            fetch(url)
            .then(response => response.json())
            .then(json => {
                setItem(json);
            })
            .catch(error => console.error(error));
        }, 7500);

    }, []);

    function randomItem() {
        return Math.floor(Math.random() * ITEM_COUNT) + 1;
    }

    return (
        <Navbar className="d-flex justify-content-between align-items-center">
            <Container fluid>
                <Navbar.Brand href="#" className="d-flex d-row m-0 p-0 align-items-center">
                    <img
                        alt=""
                        src={item ? item.sprites.default === null ? pokeball : item.sprites.default : pokeball}
                        width="35"
                        height="35"
                        className=""
                    />{' '}
                    <h1 className="m-0">Pokedex</h1>
                </Navbar.Brand>
                <Form className="ms-2" inline onChange={handleChange}>
                    <InputGroup>
                        <InputGroup.Text>
                            < BsSearch />
                        </InputGroup.Text>
                        <Form.Control
                            type="text"
                            placeholder="Ex. Pikachu, 42, etc."
                            className=" mr-sm-2"
                        />
                    </InputGroup>
                </Form>
            </Container>
        </Navbar>
    );
}

export default MainNavbar;