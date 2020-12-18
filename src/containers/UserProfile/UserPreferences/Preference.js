import React, { Component } from 'react'

export class Preference extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected : this.props.selected
        }
    }
    selected(e){
        this.setState(prevState => ({
            selected: !prevState.selected
        }),() => this.state.selected ? this.props.preferenceSelected(this.props.id, 'add') : this.props.preferenceSelected(this.props.id, 'remove') )
        // if (!this.state.selected){
        //     this.props.preferenceSelected(this.props.id, 'add')
        // }else{
        //     this.props.preferenceSelected(this.props.id, 'remove')
        // }
    }
    render() {
        
        return (
            <p style={{margin: 0}} className='preference pointer' onClick={this.selected.bind(this)} style={this.state.selected ? {backgroundColor: '#2962ff', color: 'white', border: '1px solid #2962ff'}:{backgroundColor: 'white', color: 'black'} } >
                {this.props.preference}
            </p>
        )
    }
}

export default Preference
