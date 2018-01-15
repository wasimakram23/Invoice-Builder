import React,{Component} from 'react';
import './itementry.css';
import 'whatwg-fetch';

class itementry extends Component{
 constructor(props){
  super(props);
  this.state={ 
    output:'',
    pname:'',
    pid:'',
    pquan:'',
    pprice:'',
  };
    //text fields handler
    this.pidChange= this.pidChange.bind(this);
    this.pnameChange= this.pnameChange.bind(this);
    this.pquanChange= this.pquanChange.bind(this);
    this.ppriceChange= this.ppriceChange.bind(this);
    
    //data manupulation handlers
    this.insertdata = this.insertdata.bind(this);
    this.deletedata = this.deletedata.bind(this);
    this.updatedata = this.updatedata.bind(this);

  }

  pidChange(event) {
    this.setState({pid: event.target.value});
  }
  pnameChange(event) {
    this.setState({pname: event.target.value});
  }
  pquanChange(event) {
    this.setState({pquan: event.target.value});
  }
  ppriceChange(event) {
    this.setState({pprice: event.target.value});
  }

  insertdata(event) {
    //Insert product data into bill table
    let content = {
     bid: this.props.bid,
     pid: this.state.pid,
     pname: this.state.pname,
     pquan: this.state.pquan,
     pprice: this.state.pprice
   }
   fetch('/invoice/insertBillData', {
     method: 'post',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(content)
   })  
  alert('Insert product data');
  event.preventDefault(); 
}

deletedata(event) {
        //delete product data from bill table
        let content = {
         bid: this.props.bid,
         pid: this.state.pid
       }

       fetch('/invoice/deleteProductData', {
         method: 'post',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(content)
       })
       alert('Deleting a product');
       event.preventDefault(); 
    }

updatedata(event) {
    //update product data into bill table
    let content = {
     bid: this.props.bid,
     pid: this.state.pid,
     pname: this.state.pname,
     pquan: this.state.pquan,
     pprice: this.state.pprice
   }

   fetch('/invoice/updateSingleProductData', {
     method: 'post',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(content)
   })
   alert('Updating a product');
   event.preventDefault();
}

render(){
 return (
  <div className="itementry">
  <table>
  <tr>
  <td className="Header"></td>
  <td className="Header"></td>
  <td className="Header"><input required className="tablein" type="text" value={this.state.pid} onChange={this.pidChange}/></td>
  <td className="Header"><input required className="tablein" type="text" value={this.state.pname} onChange={this.pnameChange}/></td>
  <td className="Header"><input required className="tablein" type="text" value={this.state.pquan} onChange={this.pquanChange}/></td>
  <td className="Header"><input required className="tablein" type="text" value={this.state.pprice} onChange={this.ppriceChange}/></td>
  <td className="Header"><button className="adder" onClick={this.insertdata}>++</button></td>
  <td className="Header"><button className="adder" onClick={this.deletedata}>-</button></td>
  <td className="Header"><button className="adder" onClick={this.updatedata}>+</button></td>
  </tr>
  </table>
  </div>
  );
}
}

export default itementry;