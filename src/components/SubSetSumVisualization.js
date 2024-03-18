import React, { useState } from 'react';
import {Button, Row, Col} from 'react-bootstrap';
// import { isSubsetSum } from '../algorithms/SubSetSumAlgorithm';
import SubSetComponent from '../algorithms/SubSetSumAlgorithm';

const SubSetSumVisualization = ({ onBack }) => {
    const [set, setSet] = useState([]);
    const [target, setTarget] = useState("");
    const [newSet, setNewSet] = useState([]);
    const [newTarget, setNewTarget] = useState("");

    const clearCanvas = () => {
        setSet([]);
        setTarget(null);
    };

    const handleCalculateSubsets = () => {
        setSet(newSet)
        setTarget(newTarget);
    };

    const handleChangeSet = (e) => {
        let result = [];
        e.target.value.replaceAll(" ", "").split(",")
            .forEach(x => {
                let num = parseInt(x);

                if(!isNaN(num))
                    result.push(num);
            });

        setNewSet(result);
    }

    const handleChangeTarget = (e) => {
        setNewTarget(e.target.value);
    }
    
    return (
        <div>
            <h1>Problema del Subconjunto (Subset Sum)</h1>
            <Row className='justify-content-center'>
            	<Col className='col-auto'>
                    <Button variant='light' onClick={onBack}>Regresar al Menú Principal</Button>
                </Col>
            	<Col className='col-auto'>
                    <Button variant="warning" onClick={() => alert("Instrucciones")}>Instrucciones</Button>
                </Col>
            	<Col className='col-auto'>
                    <Button variant='success' onClick={handleCalculateSubsets} >Calcular subconjuntos</Button>
                </Col>
            	<Col className='col-auto'>
                    <Button variant='danger' onClick={clearCanvas} >Limpiar Lienzo</Button>
                </Col>
            </Row>
            <Row className='justify-content-center mt-3'>
                <Col className='col-auto'>
                    <input placeholder='Set' onInput={handleChangeSet}></input>
                </Col>
                <Col className='col-auto'>
                    <input placeholder='Objetivo' onInput={handleChangeTarget}></input>
                </Col>
            </Row>
            <Row className='mt-4'>
                <SubSetComponent set={set} target={target}></SubSetComponent>
            </Row>
        </div>
    );
};

export default SubSetSumVisualization;
