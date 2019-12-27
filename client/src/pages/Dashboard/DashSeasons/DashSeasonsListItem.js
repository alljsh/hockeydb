import React, { Component } from 'react';
import PropTypes from 'prop-types';



class DashSeasonsListItem extends Component {

    state = {
        isEditing: false,
        name: '',
        type: ''
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        const { onClick, item, sections, onEdit } = this.props;
        // console.log(item, 'item!')

        const sectionKeys = Object.keys(sections);
        return ( 
            <div className="dashboard-list-item">

                <div className="hide-desktop">
                    <div>
                        {item.name} - helo
                    </div>
                    <div>
                        {item.type}
                    </div>

                    {/* <div onClick={()=>this.setState({isEditing: !this.state.isEditing})}>{'<edit>'}</div> */}
                    <div onClick={onEdit}>{'<edit>'}</div>


                </div>

               <div className="hide-mobile">

                    <div style={{display: 'flex', justifyContent: 'space-between'}} >

                  

                        {sectionKeys.map(section => {
                            
                            return !this.state.isEditing ? (
                                <p key={section} className={`flex-${sections[section]}`}>{item[section]} {item.is_active && section === sectionKeys[0] && '- (current)'}</p>
                            ) : (
                                <input key={section} className={`flex-${sections[section]}`} type="text" onChange={this.handleChange} name={`${sections[section]}`} defaultValue={item[section]}/>
                            )
                        })}

            
                        <div className="flex-one hide-mobile">
                            {/* <span onClick={()=> {this.setState({isEditing: !this.state.isEditing})}}>{  this.state.isEditing ? '<save>' : '<edit>'}</span> */}
                            <span onClick={onEdit}>{'<edit>'}</span>
                            
                            {/* <span onClick={() => this.props.deleteSeason(item.id)}>{'<delete>'}</span> */}

                            {this.state.isEditing ? ( 
                            <span onClick={()=> {this.setState({isEditing: !this.state.isEditing})}}>{'<cancel>'}</span>

                            ):
                            
                            <span onClick={onClick}>{'<delete>'}</span>
                            }
                        
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

DashSeasonsListItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    sections: PropTypes.object.isRequired
}

export default DashSeasonsListItem;