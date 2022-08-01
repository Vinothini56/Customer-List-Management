import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'
import Button from 'react-bootstrap/lib/Button'

//This Component is a child Component of Customers Component
export default class CustomerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedCustomer: props.selectedCustomer,
      // selectedCustomerId: 2,
      isedit: false,
      name: '',
      email: '',
      phone: ''
    }
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    // this.getCustomerDetails(this.props.val ? this.props.val : 1)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    // if (this.props.val !== prevProps.val) {
    //   this.getCustomerDetails(this.props.val)
    // }

    if (prevProps.selectedCustomer !== this.props.selectedCustomer) {
      this.setState({ selectedCustomer: this.props.selectedCustomer });
    }
  }

  //Function to Load the customerdetails data from json.
  // getCustomerDetails(id) {
  //   axios.get('assets/samplejson/customer' + id + '.json').then(response => {
  //     this.setState({ customerDetails: response })
  //   })
  // };
  // ShowCustomer = (id) => {

  //   this.setState({
  //     selectedCustomer: this.props.customerList[id - 1],
  //     isedit: false
  //   });

  // }

  EditShowedCustomer = (id) => {
    var selectedCustomerDetails = this.props.customerList.filter((customer) => customer.id == id);
    this.setState({
      name: selectedCustomerDetails[0].name,
      email: selectedCustomerDetails[0].email,
      phone: selectedCustomerDetails[0].phone,
      selectedCustomerId: id,
      isedit: true
    });
  }

  UpdateShowedCustomer = () => {
    var updateShowedcustomer = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      //id: this.state.selectedCustomerId
    }

    this.setState({ isedit: false, selectedCustomer: updateShowedcustomer });
    this.props.updateCustomer(updateShowedcustomer);
  }
RemoveParentDetails = (id) => { 
  this.setState({selectedCustomer : ''});
  this.props.removeNewCustomer(id);
}
  render() {
    // if (!this.state.customerDetails)
    //   return (<p>Loading Data</p>)
    return (
      <div className="col-md-6">
        {/* <CustomerDetails val={this.state.selectedCustomer} /> */}
        {this.state.selectedCustomer ? <Panel bsStyle="info" key={this.state.selectedCustomer.name} className="centeralign">
          <Panel.Heading>
            <Panel.Title componentClass="h3">{this.state.isedit ? <input type='text' value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}>
            </input> : this.state.selectedCustomer.name}</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            <p>{this.state.isedit ? <input type='text' value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}>
            </input> : this.state.selectedCustomer.email}</p>
            <p>{this.state.isedit ? <input type='text' value={this.state.phone}
              onChange={(e) => this.setState({ phone: e.target.value })}>
            </input> : this.state.selectedCustomer.phone}</p>
            {this.state.isedit ? <Button onClick={this.UpdateShowedCustomer}>Update</Button>
              : <Button onClick={() => this.EditShowedCustomer(this.state.selectedCustomer.id)}>Edit</Button>}
            <Button onClick={() => this.RemoveParentDetails(this.state.selectedCustomer.id)}>Remove</Button>

          </Panel.Body>
        </Panel> : <React.Fragment></React.Fragment>}

      </div>
    )
  }
}
