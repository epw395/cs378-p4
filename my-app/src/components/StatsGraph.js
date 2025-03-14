import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const stat_labels = ['hp', 'attack', 'defense', 'sp. atk', 'sp. def', 'speed'];

const Graph = ({ party }) => {

    const buildSeries = () => {
        const series = party.map((pokemon) => {
            const stats = pokemon.stats.map((stat) => (stat.base_stat));
            const type = pokemon.types[0].type.name;
            return { 
                data: [stats[0], stats[1], stats[2], stats[3], stats[4], stats[5]], 
                label: pokemon.name, 
                color: "var(--type-color-" + type + ")", 
            };
        });
        return series;
    }

    const series = buildSeries();
    const xAxisLabels = stat_labels;

    return (
        <>
            {party.length > 0 &&
                <BarChart
                    series={series}
                    height={290}
                    xAxis={[{ data: xAxisLabels, scaleType: 'band' }]}
                    margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
            }
        </>
    );
};



export default Graph;