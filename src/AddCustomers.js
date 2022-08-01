import React, { Component } from "react";
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'

class AddCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            errormsg: { name: '', email: '', phone: '' }
        }
    }

    AddNewCustomer = (e) => {
        e.preventDefault();
        var addcustomer = {
            id: this.props.customerList.length + 1,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        }
        var dotposition=addcustomer.email.lastIndexOf(".");  
        var atposition = addcustomer.email.indexOf('@');
        if (addcustomer.name == '' || addcustomer.email == '' || addcustomer.phone == '') {
            this.setState({
                errormsg: {
                    name: addcustomer.name == '' ? 'enter name' : '',
                    email: addcustomer.email == '' ? 'enter email' : '',
                    phone: addcustomer.phone == '' ? 'enter phone' : ''
                }
            });
            // return false;
        }
        else {
            if(!addcustomer.name.match('e'))
            {
                this.setState({
                    errormsg: {name: 'enter valid name'}
                })
            }
            if (isNaN(addcustomer.phone) || addcustomer.phone.length < 6 || addcustomer.phone.length > 10 ) {
                this.setState({ errormsg: { phone: 'enter valid phone' } });
            }
            else if (atposition < 0 || atposition > dotposition + 2)   {
                this.setState({ errormsg: { email: 'Enter valid email' } })
            }
            else {
                this.setState({
                    errormsg: {
                        name: '',
                        email: '',
                        phone: ''
                    }
                });
                this.props.AddnewParent(addcustomer);
            }
        }
        //   if(addcustomer.name == '' && addcustomer.email == '')
        //   {
        //     this.setState({errormsg : { name:'enter name', email : 'enter email', phone : '' }});
        //     return false;
        //   }
        //   if(addcustomer.email == '')
        //   {
        //     this.setState({errormsg : { name:'', email : 'enter email', phone : '' }});
        //     return false;
        //   }
        //   if(addcustomer.phone == '')
        //   {
        //     this.setState({errormsg : { name:'', email : '', phone : 'enter Phone' }});
        //     return false;
        //   }

    }

    render() {
        return (
            <div className="col-md-3">
                <Panel bsStyle="info" className="centeralign">
                    <Panel.Heading>Type Input Here</Panel.Heading>
                    <Panel.Body>
                        <p> <input type='text' value={this.state.name} placeholder='Type Name Here' onChange={(e) => this.setState({ name: e.target.value })} /></p>
                        <p className="error">{this.state.errormsg.name}</p>
                        <p > <input type='text' value={this.state.email} placeholder='Type Email Here' onChange={(e) => this.setState({ email: e.target.value })} /></p>
                        <p className="error">{this.state.errormsg.email}</p>
                        <p><input type='text' value={this.state.phone} placeholder='Type Number Here' onChange={(e) => this.setState({ phone: e.target.value })} /></p>
                        <p className="error">{this.state.errormsg.phone}</p>
                        <p> <Button bsStyle="info" onClick={this.AddNewCustomer}>AddCustomers</Button></p>

                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}
export default AddCustomers;