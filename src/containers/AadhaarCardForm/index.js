import React, { Component, Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Input } from '@material-ui/core';
import './AadhaarCardForm.scss';

export class AadhaarCardForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    this.handleChange = this.handleChange.bind(this);
  }
  getInitialState() {
    const initialState = {};
    for (let i = 0; i < 12; i++) {
      initialState[`aadhaarInput${i}`] = this.props.setValue ? this.props.setValue[i] : '';
    }
    initialState.inputsArray = this.getInputsArray();
    initialState.focusId = initialState.inputsArray[0].id;
    return initialState;
  }
  componentDidUpdate() {
    const { focusId } = this.state;
  }
  getRandomID() {
    return (
      '_' +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }
  getInputsArray() {
    const inputs = [];
    for (let i = 0; i < 12; i++) {
      inputs.push({
        id: this.getRandomID(),
        name: `aadhaarInput${i}`
      });
    }
    return inputs;
  }
  handleChange(e, inputIndex) {
    let key = e.keyCode || e.charCode;
    const { inputsArray } = this.state;
    const { name } = e.target;
    let focusId = inputsArray[inputIndex].id;
    let value = e;
    console.log(e.keyCode);
    if (key === 8 || key === 46) {
      if (this.state[`aadhaarInput${inputIndex}`] === '') {
        const prevInputIndex = inputIndex - 1;
        if (prevInputIndex >= 0) {
          focusId = inputsArray[prevInputIndex].id;
        }
        document.getElementById(focusId).focus();
        let aadhaarString = '';
        for (let i = 0; i < inputsArray.length; i += 1) {
          aadhaarString += this.state[`aadhaarInput${i}`];
        }
        this.props.sendAadhaarNumber(aadhaarString);
      } else {
        this.setState(
          {
            [name]: '',
            focusId
          },
          () => {
            document.getElementById(focusId).focus();
            let aadhaarString = '';
            const { inputsArray } = this.state;
            for (let i = 0; i < inputsArray.length; i += 1) {
              aadhaarString += this.state[`aadhaarInput${i}`];
            }
            this.props.sendAadhaarNumber(aadhaarString);
          }
        );
      }
    } else if (key >= 48 && key <= 57 && this.state[`aadhaarInput${inputIndex}`] === '') {
      let char = String.fromCharCode(key);
      console.log(char, key);
      const nextInputIndex = inputIndex + 1;
      if (nextInputIndex < inputsArray.length) {
        focusId = inputsArray[nextInputIndex].id;
      }
      this.setState(
        {
          [name]: char,
          focusId
        },
        () => {
          document.getElementById(focusId).focus();
          let aadhaarString = '';
          for (let i = 0; i < inputsArray.length; i += 1) {
            aadhaarString += this.state[`aadhaarInput${i}`];
          }
          this.props.sendAadhaarNumber(aadhaarString);
        }
      );
    }
  }
  render() {
    const { inputsArray } = this.state;
    const form = inputsArray.map((input, index) => {
      if (index === 4 || index === 8) {
        return (
          <Fragment key={input.id}>
            <div className='aadhaar-input'>
              <span>/</span>
            </div>
            <div className='aadhaar-input'>
              <Input
                type='number'
                onKeyDown={e => this.handleChange(e, index)}
                name={input.name}
                id={input.id}
                value={this.state[`aadhaarInput${index}`]}
                maxLength='1'
              />
            </div>
          </Fragment>
        );
      } else {
        return (
          <div key={input.id} className='aadhaar-input'>
            <Input
              type='number'
              onKeyDown={e => this.handleChange(e, index)}
              name={input.name}
              id={input.id}
              value={this.state[`aadhaarInput${index}`]}
              maxLength='1'
            />
          </div>
        );
      }
    });
    return <div id='inputs-container'>{form}</div>;
  }
}

export default AadhaarCardForm;
