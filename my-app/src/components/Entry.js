import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactHowler from 'react-howler'

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiVolumeUpFill } from "react-icons/ri";
import TypeList from "./Types";
import pokeball from "../assets/poke-ball.png";

const sprites = [
    "front_default",
    "back_default",
    "front_shiny",
    "back_shiny",
]

const EntryModal = ({ pokemon, show, onHide }) => {
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const cryRef = useRef(null);
    const cry_url = pokemon.cries.latest;

    const nextIndex = useCallback(() => {
        index === sprites.length - 1 ? setIndex(0) : setIndex(index + 1);
    }, [index])

    const species_url = pokemon.species.url;

    useEffect(() => {
        const interval = setInterval(() => {
            nextIndex();
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, [nextIndex]);

    useEffect(() => {

        fetch(species_url)
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => console.error(error));

    }, [data, species_url, cry_url, playing]);

    const type = pokemon.types[0].type.name;

    const styleBackground = `
        .header-type-${type} { background-color: var(--type-color-${type})}
        .border-type-${type} { border: 2px solid var(--type-color-${type})}`

    const formatID = (num) => {
        const paddedNum = "#" + String(num).padStart(4, '0');
        return paddedNum;
    }

    const genStats = () => {

    }

    return (
        <>
            <style>
                {styleBackground}
            </style>
            <Modal centered className="entry-modal" show={show} onHide={onHide}>
                <Modal.Header closeButton className={"py-1 header-type-" + type}>
                    <ReactHowler
                        src={cry_url}
                        playing={playing}
                        onEnd={() => { setPlaying(false) }}
                        ref={cryRef}
                        volume={0.5}
                    />
                    <Button className="entry-cry rounded-circle" onClick={() => setPlaying(true)}>
                        <RiVolumeUpFill size={20} />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mx-2">
                        <Col className="entry-sprite d-flex flex-column justify-content-center align-items-center">
                            <img alt={pokemon.name + " " + sprites[index]} src={pokemon.sprites[sprites[index]]}></img>
                        </Col>
                        <Col className="entry-info">
                            <Row className="entry-title me-0 rounded">
                                <Row className={"entry-index ms-0 d-flex align-items-center justify-content-start header-type-" + type}>
                                    <Col xs={2} className="p-0"><img alt="Pokeball Sprite" src={pokeball}></img></Col>
                                    <Col xs className="p-0 ms-1">{formatID(pokemon.id)}</Col>
                                </Row>
                                <Row className="entry-name">
                                    <Col xs={2} ></Col>
                                    <Col xs className="p-0 ms-1">{pokemon.name.charAt(0).toUpperCase() + String(pokemon.name).slice(1)}</Col>
                                </Row>
                            </Row>
                            <Row className="entry-other d-flex flex-nowrap my-2">
                                <Col className="entry-stats me-1">
                                    {pokemon.stats.map((stat, index) => {
                                        return <Row key={index} className="entry-stat d-flex flex-nowrap justify-content-between">
                                            <Col xs="auto">{stat.stat.name.toUpperCase()}</Col>
                                            <Col xs="auto">{stat.base_stat}</Col>
                                        </Row>
                                    })}
                                </Col>
                                <Col xs className="m-0 p-0">
                                    <Row className="entry-types d-flex flex-column"><TypeList types={pokemon.types} /></Row>
                                    <Row className="entry-dimensions m-0 rounded">
                                        <Row className="entry-ht m-0">
                                            {"HT: " + pokemon.height}
                                        </Row>
                                        <Row className="entry-wt m-0">
                                            {"WT: " + pokemon.weight}
                                        </Row>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={"entry-description rounded m-1 border-type-" + type}>
                        <p className="m-0">{data ? data.flavor_text_entries.find(item => item.language.name === 'en').flavor_text : "Loading description..."}</p>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EntryModal;