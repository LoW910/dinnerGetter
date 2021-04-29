import React, {useEffect} from 'react';
import M from 'materialize-css';
import $ from "jquery";


// $(document).load(function(){
//     $('.collapsible').collapsible();
//   });



function RecipesSaved() {

    M.AutoInit();

    return (
        <div className="row">
            <div className="col s10 offset-s1 card blue-grey darken-1">
                

                <ul className="collapsible card-content">
                    <li>
                        <div className="collapsible-header"><i className="material-icons">filter_drama</i>First</div>
                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                    </li>
                    <li>
                        <div className="collapsible-header"><i className="material-icons">smoking_rooms</i>Second</div>
                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                    </li>
                    <li>
                        <div className="collapsible-header"><i className="material-icons">whatshot</i>Third</div>
                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                    </li>

                    <li>
                        <div className="collapsible-header"><i className="material-icons">ac_unit</i>Fourth</div>
                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                    </li>
                    <li>
                        <div className="collapsible-header"><i className="material-icons">airport_shuttle</i>Fifth</div>
                        <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                    </li>
                    <li>
                        <div className=""><i className="material-icons">sentiment_neutral</i>Sixth</div>
                        <div className=""><span className="white-text">MOTHERF*******</span></div>
                    </li>
                </ul>

            </div>
        </div>
    )
}

export default RecipesSaved
