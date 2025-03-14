import React, { useState, useEffect, useCallback } from 'react';

// Bootstrap Imports
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import EntryCard from './EntryCard';

const sprites = [
    "front_default",
    "back_default",
    "front_shiny",
    "back_shiny",
]

const Party = ({ party, onRemove }) => {
    const [index, setIndex] = useState(0);

    const nextIndex = useCallback(() => {
        index === sprites.length - 1 ? setIndex(0) : setIndex(index + 1);
    }, [index])

    useEffect(() => {
        const interval = setInterval(() => {
            nextIndex();
        }, 5000);

        return () => {
            clearInterval(interval);
        }
    }, [nextIndex]);

    return (
        <>
            {party.length > 0 ? (
                <Row xs={1} sm={1} md={1} lg={2} xl={2} xxl={3} className="g-4 ">
                    {party.map((item, i) => (
                        <Col key={i}>
                            <EntryCard pokemon={item} sprite={sprites[index]} onRemove={onRemove} />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Container fluid className="no-pokemon-selected">
                    <div className='none-selected-text-wrapper rounded'>
                        <p className='p-4 m-0'>Select a Pokemon</p>
                    </div>
                </Container>
            )}


        </>
    );
}

export default Party;