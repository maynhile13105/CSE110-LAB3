import React from 'react';

export const themes ={
    light:{
        fontColor: 'black',
        bodyBackground: 'lightgrey',
    },
    dark:{
        fontColor: 'white',
        bodyBackground: '#151d41',
    },
};
export const ThemeContext = React.createContext(themes.light);