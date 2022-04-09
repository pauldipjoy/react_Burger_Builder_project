import React, { Component } from 'react';
import Burger from './Burger/Burger.js';
import Controls from './Controls/Controls.js';

export default class BurgerBuilder extends Component {

    state = {

        ingredients: [

            // {type:'salad', amount:1},
            // {type:'cheese', amount: 2},
            // {type:'meat', amount: 3},
            
            {type:'salad', amount: 0},
            {type:'cheese', amount: 0},
            {type:'meat', amount: 0},
            
        ]
    }


render(){

        return(
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients}/>
                <Controls />
            </div>
        );
    }



}