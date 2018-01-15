import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import appendReactDOM from 'append-react-dom';
import './dataentry.css';
import Itementry from './itementry';
import 'whatwg-fetch';

class dataentry extends Component{
 constructor(props){
  super(props);
  this.state={ 
    output:'',
    bid:''
  };
  this.bidChange = this.bidChange.bind(this);
  this.additem = this.additem.bind(this);
}

//bill id text field handler
bidChange(event) {
  this.setState({bid: event.target.value});
}

//add product list
additem(event){
    var id = this.state.bid; 
    let el = document.querySelector('.itemholder');
    appendReactDOM(Itementry, el, {
      bid :id
    });
}

render(){
 return (
  <div className="dataentry">
  <table>
  <tr>
  <td className="Header"><input required placeholder="BILL ID" className="tablein" type="text" value={this.state.bid} onChange={this.bidChange}/></td>
  <td className="Header"><button className="adder" onClick={this.additem}>+</button></td>
  <td className="Header">P_Id</td>
  <td className="Header">P_Name</td>
  <td className="Header">P_Quan</td>
  <td className="Header">P_Price</td>
  <td className="Header">Insert</td>
  <td className="Header">Delete</td>
  <td className="Header">Update</td>
  </tr>
  </table>
  <div class="itemholder">
  <div><Itementry bid={this.state.bid}/></div>
  <div><Itementry bid={this.state.bid}/></div>
  </div>
  </div>
  );
}

}

export default dataentry;