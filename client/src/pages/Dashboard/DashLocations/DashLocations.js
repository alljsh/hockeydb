import React, { Component } from 'react'
import { connect } from 'react-redux';

import { newLocation, getLocations, deleteLocation } from '../../../redux/actions/locationsActions';
import { Button } from '../../../components';
import ListItem from '../ListItem';

import { toggleModal } from '../../../redux/actions/misc';

export class DashGames extends Component {

    state = {
        isAddLocationVisible: false,
        name: '',
        address: '',
    }
    componentDidMount() {
        this.props.getLocations();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleLocationsSubmit = async e => {
        e.preventDefault();
        const { name, address } = this.state;
        if (!name || !address) {
        return alert('please enter a input');
        }
        const added = await this.props.newLocation({ name, address });

        if(!added){
        return alert('location not added')
        }
        return this.setState({isAddLocationVisible: false, name: '', address: ''})
    }

    toggleAddVisible = () => {
        this.setState({isAddLocationVisible: !this.state.isAddLocationVisible})
    }


    handleDeleteLocation = (item) => {
        this.props.toggleModal({
            isVisible: true,
            toBeDeleted: item,
            title: 'Delete Location',
            message: 'Are you sure you want to delete this location?',
            deleteAction: () => this.props.deleteLocation(item.id),
        }, 'delete');
    }

  render() {
    return (
      <div>

          <div className="dashboard-filter-header">
              <div>
                  <Button title="Add Location" onClick={this.toggleAddVisible}/>
              </div>
          </div>

          {this.state.isAddLocationVisible && (

              <form onSubmit={this.handleLocationsSubmit} className="dashboard-add-container">
                  <input type="text" onChange={this.handleChange} name="name" placeholder="Location name"/>
                  <input type="text" onChange={this.handleChange} name="address" placeholder="Location address"/>

                  <div className="dashboard-add-button-container">
                      <Button title="Save Location" success onClick={()=>{}}/>
                  </div>

              </form>

          )}


          <div className="dashboard-list-container">

              <div className="dashboard-list">

                  <div className="dashboard-list-item hide-mobile">
                      <div style={{display: 'flex'}}>

                          <p className="flex-three">Name</p>
                          <p className="flex-three">Address</p>
                          <p className="flex-one">Manage</p>


                      </div>
                  </div>

              {this.props.locations && this.props.locations.map(item => {

                  // console.log(item, 'befroe')
                  // item.date = dateFormat(item.start_date, 'MM/DD/YYYY');
                  // item.start_time = dateFormat(item.start_date, 'h:mm A')
                  // console.log(item, 'after')

                  return (

                      <ListItem key={item.id} item={item} sections={{'name': 'three', 'address': 'three'}} onClick={() => this.handleDeleteLocation(item)} />

                  )

              })}

              {/* <div className="dashboard-list-item"></div>
              <div className="dashboard-list-item"></div> */}


                  {/* <div>Name</div>
                  <div>Type</div>
                  <div>Manage/Edit</div> */}
              </div>

          </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
    console.log(state, "our state in dashNav!s");

    return {
        locations: state.locations.allLocations,
    };
};



const mapDispatchToProps = dispatch => ({
    newLocation: (name, address) => dispatch(newLocation(name, address)),
    getLocations: () => dispatch(getLocations()),
    toggleModal: (modalProps, modalType) => dispatch(toggleModal(modalProps, modalType)),
    deleteLocation: id => dispatch(deleteLocation(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashGames);



