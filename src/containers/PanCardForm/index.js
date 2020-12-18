import React, { Component, PureComponent, Fragment } from 'react'
import {Row,Col} from 'react-bootstrap'
import {Input} from '@material-ui/core'
import './PanCardForm.css'

export class PanCardForm extends PureComponent {
  
  constructor(props){
    super(props)
    this.state = this.getInitialState()
    this.handleChange = this.handleChange.bind(this)
    this.sendPanNumber = this.sendPanNumber.bind(this)
    this.handelOnKeyDown  =this.handelOnKeyDown.bind(this)
  }
  getInitialState(){
    const initialState = {}
    for(let i=0;i<10;i++){
      initialState[`panInput${i}`] = this.props.setValue ? this.props.setValue[i] : ''
    }
    initialState.inputsArray = this.getInputsArray()
    initialState.focusId = initialState.inputsArray[0].id
    return initialState
  }
  componentDidUpdate(){
  }
  getRandomID () {
    return '_' + Math.random().toString(36).substr(2, 9)
  }
  getInputsArray(){
    const inputs = []
    for(let i=0;i<10;i++){
      inputs.push({
        id: this.getRandomID(),
        name: `panInput${i}`
      })
    }
    return inputs
  }
  toNextInput(index){
    const {inputsArray} = this.state
    if(index !== inputsArray.length-1){
      let focusId = inputsArray[index+1].id
      let input = document.getElementById(focusId) 
      input.focus()
      input.select()
      this.setState({
        focusId
      })
    }
  }
  toPrevInput(index){
    const {inputsArray} = this.state
    if(index !== 0){
      let focusId = inputsArray[index-1].id
      let input = document.getElementById(focusId) 
      input.select()
      input.focus()
      this.setState({
        focusId
      })
    }
  }
  sendPanNumber(){
    const {inputsArray} = this.state
    let panString = ''
    for (let i = 0; i < inputsArray.length; i += 1) {
      panString += (this.state[`panInput${i}`])
    }
    this.props.sendPanNumber(panString)
  }
  handleChange(e, index){
    const {value, name} = e.target
    console.log(index, this.state[name])
    console.log(value, value.length, name, value.charCodeAt(0))
    if(value.length>=2){
      this.toNextInput(index)
      this.sendPanNumber()
    }else if(this.state[name] !== '' && value===''){
      this.setState({
        [name]: '',
      }, ()=>{
        this.sendPanNumber()
      })
    }else{
      if((index >=0 && index<=4) || index === 9){
        if((value.charCodeAt(0) >=65 && value.charCodeAt(0) <=90) || (value.charCodeAt(0)>=97 && value.charCodeAt(0)<=122)){
          let char = value.toUpperCase()
          this.setState({
            [name]: char
          }, ()=> {
            this.toNextInput(index)
            this.sendPanNumber()
          })
        }
      }else{
        if(value>=0 && value <=9){
          this.setState({
            [name]: value
          }, ()=>{
            this.toNextInput(index)
            this.sendPanNumber()
          })
        }
      }
    }
  }
  handelOnKeyDown(e, index){
    console.log(e.key)
    if(e.key === 'Backspace' && this.state[e.target.name] === ''){
      this.toPrevInput(index)
    }
  }
  render() {
    const {inputsArray} = this.state
    const form = inputsArray.map((input, index)=>{
      if(index === 3 || index === 6){
        return (
          <Fragment key={input.id}>
            <div className='pan-input'>
              <span>/</span>
            </div>
            <div  className='pan-input'>
              <Input
                type={index >= 5 && index <= 8? 'tel' : 'text'}
                onChange = {e=>this.handleChange(e, index)}
                onKeyDown={(e)=> this.handelOnKeyDown(e, index)}
                name = {input.name}
                id={input.id}
                value = {this.state[`panInput${index}`]}
                maxLength="1"
                />
            </div>
          </Fragment>
        )
      }else{
        return (
            <div key={input.id} className='pan-input'>
              <Input
                type={index >= 5 && index <= 8? 'tel' : 'text'}
                name = {input.name}
                onChange = {e=>this.handleChange(e, index)}
                onKeyDown={(e)=> this.handelOnKeyDown(e, index)}
                id={input.id}
                value = {this.state[`panInput${index}`]}
                maxLength = "1"
                />
            </div>
        )
      }
    })
    console.log(form)
    return (
        <div id='inputs-container'>
          {form}
        </div>
    )
  }
}

export default PanCardForm
