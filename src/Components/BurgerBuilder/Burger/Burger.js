import React from 'react';
import Ingredient from '../Ingredient/Ingredient.js';
import './Burger.css';


const Burger = props => {

    let ingredientArr = props.ingredients.map(item => {

        let amountArr = [...Array(item.amount).keys()];
        
            //console.log(amountArr);
            
        return amountArr.map( _ => {

            return <Ingredient 

            type={item.type}
            key={Math.random()} />

        })
})

    .reduce((arr , element) => {


        // console.log(arr);
        // console.log(element);
        
    return arr.concat(element); 

},[]);


// in case all amount are 0 call-
    if(ingredientArr.length === 0) {
        ingredientArr = <p>Please add some ingredients!</p>
    }

    // console.log( ingredientArr);

    

    return(

        <div className="Burger">

            <Ingredient type="bread-top" />
            {ingredientArr}
            <Ingredient type="bread-bottom" />

        </div>
    )
}

export default Burger;