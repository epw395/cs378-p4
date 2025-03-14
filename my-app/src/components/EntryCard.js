import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactHowler from 'react-howler'

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiVolumeUpFill } from "react-icons/ri";
import TypeList from "./Types";
import pokeball from "../assets/poke-ball.png";
import { BsCardChecklist } from 'react-icons/bs';
import CloseButton from 'react-bootstrap/CloseButton';

import default_sprite from '../assets/default-pokemon-sprite.png';

const sprites = [
    "front_default",
    "back_default",
    "front_shiny",
    "back_shiny",
]

const EntryCard = ({ pokemon, sprite, onRemove }) => {
    const [data, setData] = useState(null);
    const [playing, setPlaying] = useState(false);
    const cryRef = useRef(null);
    const cry_url = pokemon.cries.latest;

    const species_url = pokemon.species.url;

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

    const isRealValue = (obj) => {
        return obj && obj !== 'null' && obj !== 'undefined';
    }

    return (
        <>
            <style>
                {styleBackground}
            </style>
            <ReactHowler
                src={cry_url}
                playing={playing}
                onEnd={() => { setPlaying(false) }}
                ref={cryRef}
                volume={0.5}
            />
            <Card className="entry-modal">
                <Card.Header className={"d-flex flex-row justify-content-between align-items-center py-1 header-type-" + type}>
                    <Button className="entry-cry rounded-circle" onClick={() => setPlaying(true)}>
                        <RiVolumeUpFill size={20} />
                    </Button>
                    <CloseButton onClick={() => onRemove(pokemon)} />
                </Card.Header>
                <Card.Body>
                    <Row className="mx-2 d-flex flex-wrap">
                        <Col xl={4} className="entry-sprite d-flex flex-column justify-content-center align-items-center">
                            <img alt={pokemon.name + " " + sprite} src={isRealValue(pokemon.sprites[sprite]) ? pokemon.sprites[sprite] : default_sprite}></img>
                        </Col>
                        <Col xl={8} className="entry-info">
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
                                <Col xs className="entry-stats me-1">
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
                </Card.Body>
            </Card>
        </>
    );
};

export default EntryCard;