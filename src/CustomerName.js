import React, { Component } from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'



class CustomerName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'test',
            email: 'vinomathish@gmail.com',
            phone: '8776544567',
            customerList: props.customerList,
            editId: undefined
        }
    }
    // HandleNameChange = (e) => {
    //     this.setState({ name: e.target.value });
    // }
    // HandleEmailChange = (e) => {
    //     this.setState({ email: e.target.value });
    // }
    // HandlePhoneChange = (e) => {
    //     this.setState({ phone: e.target.value });
    // }
    AddCustomer = () => {
        var customerdata = {
            id: this.state.customerList.length + 1,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        }
        this.setState({
            customerList: [...this.state.customerList, customerdata]
        });
    }

    EditCustomer = (id) => {

        var selectedCustomer = this.state.customerList.filter((customer) => customer.id == id);

        this.setState({
            name: selectedCustomer[0].name,
            email: selectedCustomer[0].email,
            phone: selectedCustomer[0].phone,
            editId: id
        });
    }

    UpdateCustomer = () => {

        let updatedCustomer = {
            id: this.state.editId,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        }

        let customerList = [...this.state.customerList];
        var selectedCustomerIndex = customerList.findIndex((customer) => customer.id == this.state.editId);
        // customerList.splice(selectedCustomerIndex, 1, updatedCustomer);
        customerList[selectedCustomerIndex] = updatedCustomer;
        this.setState({ customerList: customerList, editId: undefined });

    }

    RemoveCustomer = (id) => {
        let customerList = [...this.state.customerList];
        var selectedCustomerIndex = customerList.findIndex((customer) => customer.id == id);
        //if (selectedCustomerIndex === -1) return;
        customerList.splice(selectedCustomerIndex, 1);
        this.setState({ customerList });
    }

    render() {
        return (
            <div className="col-md-3">
                {
                    this.state.customerList.map(customer =>
                        <Panel bsStyle="info" key={customer.name} className="centeralign">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">
                                    {this.state.editId != customer.id ? customer.name : <input type='text' value={this.state.name}
                                        onChange={(e) => this.setState({ name: e.target.value })}>
                                    </input>}
                                </Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>
                                <p>{this.state.editId != customer.id ? customer.email : <input type='text' value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}>
                                </input>}
                                </p>
                                <p>{this.state.editId != customer.id ? customer.phone : <input type='text' value={this.state.phone}
                                    onChange={(e) => this.setState({ phone: e.target.value })}>
                                </input>}</p>
                                <p><Button bsStyle="info" onClick={() => this.setState({ selectedCustomer: customer.id })}>
                                    Click to View Details
                                </Button></p>
                                {this.state.editId == customer.id ?
                                    <div>
                                        <p><Button bsStyle="info" onClick={this.UpdateCustomer}>Update</Button></p>
                                    </div>
                                    : <p><Button onClick={() => this.EditCustomer(customer.id)}>Edit</Button></p>}
                                {/* <Button onClick={() => this.EditCustomer(customer.id)}>Edit</Button> */}
                                <Button onClick={() => this.RemoveCustomer(customer.id)}>Remove</Button>
                            </Panel.Body>
                        </Panel>)

                }
                <Panel className="centeralign" bsStyle="info">
                    <Panel.Heading>
                        <Panel.Title componentClass="h3">Add Field</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <p> <input type='text' value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}>
                        </input></p>
                        <p> <input type='email' value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}></input></p>
                        <p> <input type='text' value={this.state.phone} onChange={(e) => this.setState({ phone: e.target.value })}></input></p>
                        <p> <Button bsStyle="info" onClick={this.AddCustomer}>Add</Button></p>
                        <p> <Button bsStyle="info" onClick={this.UpdateCustomer}>Update</Button></p>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}
export default CustomerName;