import React, { Component, useState } from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import CustomerDetails from './CustomerDetails'
import axios from 'axios'
import CustomerName from './CustomerName';
import AddCustomers from './AddCustomers'

class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomerId: 2,
      //editId: undefined,
      selectedCustomer: {},
      customerList: [],
      //customerList : customerList
      isedit: false,
      emptyalert: '',
      filtervalue: ''
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Customer Data from json
  getCustomerData() {
    axios.get('assets/samplejson/customerlist.json').then(response => {
      this.setState({
        customerList: response.data,
        selectedCustomer: response.data[0]
      })
    })
  };

  ShowCustomer = (id) => {
    this.setState({
      selectedCustomer: this.state.customerList[id],
      isedit: false
    });
  }

  RemoveShowedCustomer = (id) => {
    var customerList = [...this.state.customerList];
    var removeCustomer = customerList.findIndex((customer) => customer.id == id);
    customerList.splice(removeCustomer, 1);
    this.setState({ customerList: customerList });
  }

  updateCustomer = (updatedCustomer) => {
    debugger
    var customerList = [...this.state.customerList];
    var selectedCustomerIndex = customerList.findIndex((customer, index) => index.id == updatedCustomer.id);
    customerList[selectedCustomerIndex] = updatedCustomer;
    this.setState({ customerList });
  }
  AddnewParent = (addcustomer) => {


    this.setState({ customerList: [...this.state.customerList, addcustomer] });
  }
  removeNewCustomer = (id) => {
    var customerList = [...this.state.customerList];
    var removeCustomer1 = customerList.findIndex((customer) => customer.id == id);
    customerList.splice(removeCustomer1, 1);
    this.setState({ customerList: customerList });
  }
  filterArray = (e) => {
    this.setState({ filtervalue: e.target.value });
  }
  render() {

    // filter json

    if (!this.state.customerList)
      return (<p>Loading data</p>)
    return (<div className="addmargin">

      <div className='col-md-3'>

        <p className='search-customer'><input type='text' name='filter' placeholder='Search Customer' value={this.state.filtervalue}
          onChange={this.filterArray} /></p>
        {this.state.customerList.filter((customer) => {
          if (this.state.filtervalue == '') {
            return customer;
          }
          else if (customer.name.toLowerCase().includes(this.state.filtervalue.toLowerCase()) || 
          customer.email.toLowerCase().includes(this.state.filtervalue.toLowerCase()) || 
          customer.phone.toLowerCase().includes(this.state.filtervalue.toLowerCase())) {
            return customer;
          }
        })
          .map((customer, index) => {
            return (

              <React.Fragment>

                <Panel bsStyle="info" key={customer.name} className="centeralign">
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">{customer.name}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <p>{customer.email}</p>
                    <p>{customer.phone}</p>
                    <Button bsStyle="info" onClick={() => this.ShowCustomer(index)}>
                      Click to View Details
                    </Button>
                    <Button onClick={() => this.RemoveShowedCustomer(customer.id)}>Remove</Button>

                  </Panel.Body>
                </Panel>

              </React.Fragment>

            )
          })
        }
        {/* {this.state.customerList.map((customer,index) =>
          <React.Fragment>
         
            <Panel bsStyle="info" key={customer.name} className="centeralign">
              <Panel.Heading>
                <Panel.Title componentClass="h3">{customer.name}</Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                <p>{customer.email}</p>
                <p>{customer.phone}</p>
                <Button bsStyle="info" onClick={() => this.ShowCustomer(index)}>
                  Click to View Details
                </Button>
                <Button onClick={() => this.RemoveShowedCustomer(customer.id)}>Remove</Button>

              </Panel.Body>
            </Panel>

          </React.Fragment>)
        } */}
      </div>
      <CustomerDetails selectedCustomer={this.state.selectedCustomer}
        customerList={this.state.customerList} selectedCustomerId={this.state.selectedCustomerId}
        updateCustomer={this.updateCustomer} removeNewCustomer={this.removeNewCustomer}></CustomerDetails>

      <AddCustomers emptyalert={this.state.emptyalert} customerList={this.state.customerList} AddnewParent={this.AddnewParent}></AddCustomers>

      {/* <CustomerName selectedCustomer={this.state.selectedCustomer} customerList={this.state.customerList.data}/> */}

      {/* <div className='col-md-3'>
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.state.customerList.data[this.state.selectedCustomer - 1].name}</Panel.Title>
        </Panel.Heading>
      </div> */}
      {/* <EditInp /> */}
    </div>)
  }

}

// const EditInp = () => {
//   const [DefVal, SetVal] = useState('null');
//   return (
//     <div className='form'>
//       <input type='text' value={DefVal} onChange={(e) => SetVal(e.target.value)}></input>
//     </div>
//   );
// }
export default Customers;