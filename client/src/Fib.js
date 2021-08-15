import React, { Component } from 'react';
import axios from 'axios'; 

class Fib extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMont() {
        this.fetchValues();
        this.fetchindexes();
    }

   async fetchValues () {
       const values = await axios.get('/api/values/current');
       this.state({values: values.data});
   }

   async fetchIndex () {
       const seenIndexes = await axios.get('/api/values/all');
       this.state({
           seenIndexes: seenIndexes.data
       })
   }

   handleSubmit = async (event) => {
       event.preventDefault();
       await axios.post('/api/values', {
           index: this.state.index
       })
       this.setState({index: ''});
   }

   renderSeenIndexes() {
       return this.state.seenIndexes.map(({number})=> number).join(', ');
   }

   renderValues() {
       const entires = [];
       for(let key in this.state.values) {
           entires.push(
             <div key = {key}>
                 For index {key} I Calculated {this.state.values[key]}
             </div>
           );
       };

       return entires;

   }

   render() {
       return (
           <div>
               <form onSubmit = {this.handleSubmit}>
                   <label>Enter your Index:</label>
                    <input
                    value = {this.state.index}
                    onChange = {event => this.setState({index: event.target.value})}
                    />
                    <button>Submit</button>
               </form>
               <h3>Index Seen</h3>
               {this.renderSeenIndexes()}
               <h3>Calculated values</h3>
               {this.renderValues()}
           </div>
       )
   }
}
export default Fib;