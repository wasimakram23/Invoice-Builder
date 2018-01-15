import React,{Component} from 'react';
import './BillEntry.css';
import 'whatwg-fetch';
import Modal from 'react-modal';
import JsonTable  from 'ts-react-json-table'

//Modal Control Variables
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var data1;//Hold selected bill information from bill_info table
var data2;//Hold pproduct information from selected bill table
var data3;//Hold total amount of selected bill

class BillEntry extends Component{
 constructor(props){
  super(props);
  this.state={ 
    output:'',
    billName:'',
    billId:'',
    billFrom:'',
    billTo:'',
    contact:'',
    modalIsOpen: false
  };
  //Handlers for text field
  this.bnChange = this.bnChange.bind(this);
  this.bidChange= this.bidChange.bind(this);
  this.bfChange= this.bfChange.bind(this);
  this.btChange= this.btChange.bind(this);
  this.cnChange= this.cnChange.bind(this);
  //Handlers for button
  this.createinvoice = this.createinvoice.bind(this);
  this.openModal = this.openModal.bind(this);
  this.afterOpenModal = this.afterOpenModal.bind(this);
  this.closeModal = this.closeModal.bind(this);

}


openModal() {
     //Fetch bill information from bill_info by bill id
     var url1 ='/invoice/getBillInfo?bid='+this.state.billId; 
     fetch(url1)
     .then(response => response.json())
     .then(data => {
       console.log(data);
       data1 = data;
     });
    //fetch products data from billtable by bill id
    var url2 ='/invoice/getBillData?bid='+this.state.billId; 
    fetch(url2)
    .then(response => response.json())
    .then(data => {
     console.log(data);
     data2 = data;
   });
    //fetch total amount of a bill from billtable
    var url3 ='/invoice/getTotalAmount?bid='+this.state.billId; 
    fetch(url3)
    .then(response => response.json())
    .then(data => {
     console.log(data);
     data3 = data;
   });     
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  bnChange(event) {
    this.setState({billName: event.target.value});
  }
  bidChange(event) {
    this.setState({billId: event.target.value});
  }
  bfChange(event) {
    this.setState({billFrom: event.target.value});
  }
  btChange(event) {
    this.setState({billTo: event.target.value});
  }
  cnChange(event) {
    this.setState({contact: event.target.value});
  }

  //Insert bill information and create a bill table
  createinvoice(event) {
     //Insert bill information
     let content = {
       bid: this.state.billId,
       bname: this.state.billName,
       bfrom: this.state.billFrom,
       bto: this.state.billTo,
       cn: this.state.contact
     }
    //Call backend api
    fetch('/invoice/insertBillInfo', {
     method: 'post',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(content)
   })

     //create bill table 
     let content2 ={
      bid: this.state.billId
    }
    //Call backend api  
    fetch('/invoice/createbill', {
     method: 'post',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(content2)
   }) 
   alert('Insert Bill information');
   event.preventDefault();
}


render(){
 return (
   <div className="infocontainer">
   <table>
   <tr>
   <td>Bill Name</td>
   <td className="inputholder">
   <input className="Text" type="text" value={this.state.billName} onChange={this.bnChange}/>
   </td>
   </tr>
   <tr>
   <td>Bill ID</td>
   <td className="inputholder"><input className="Text" type="text" value={this.state.billId} onChange={this.bidChange}/></td>
   </tr>
   <tr>
   <td>Bill From</td>
   <td className="inputholder"><input className="Text" type="text" value={this.state.billFrom} onChange={this.bfChange}/></td>
   </tr>
   <tr>
   <td>Bill To</td>
   <td className="inputholder"><input className="Text" type="text" value={this.state.billTo} onChange={this.btChange}/></td>
   </tr>
   <tr>
   <td>Contact</td>
   <td className="inputholder"><input className="Text" type="text" value={this.state.contact} onChange={this.cnChange}/></td>
   </tr>
   <tr>
   <div><td><button className="create" onClick={this.openModal}>VIEW</button></td>
   <Modal
   isOpen={this.state.modalIsOpen}
   onAfterOpen={this.afterOpenModal}
   onRequestClose={this.closeModal}
   style={customStyles}
   contentLabel="Example Modal">
   <h2 ref={subtitle => this.subtitle = subtitle}>Invoice</h2>
   <br/>
   <button onClick={this.closeModal}>close</button>
   <div><JsonTable rows = {data3} /></div>
   <div><JsonTable rows = {data1} /></div>
   <div><JsonTable rows = {data2} /></div>
   </Modal></div>
   <td className="buttonholder"><button className="create" onClick={this.createinvoice}>CREATE</button></td>
   </tr>
   </table>
   </div>
   );
}
}

export default BillEntry;