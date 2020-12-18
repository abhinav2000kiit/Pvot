import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

// keyCode constants
const BACKSPACE = 8;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const DELETE = 46;
const SPACEBAR = 32;

const isStyleObject = obj => typeof obj === 'object';

class SingleOtpInput extends PureComponent {
  componentDidMount() {
    const {
      input,
      props: { focus, shouldAutoFocus }
    } = this;

    if (input && focus && shouldAutoFocus) {
      input.focus();
    }
  }

  componentDidUpdate(prevProps) {
    const {
      input,
      props: { focus }
    } = this;

    if (prevProps.focus !== focus && input && focus) {
      input.focus();
      input.select();
    }
  }

  getClasses = (...classes) => classes.filter(c => !isStyleObject(c) && c !== false).join(' ');

  render() {
    const {
      separator,
      isLastChild,
      inputStyle,
      focus,
      isDisabled,
      hasErrored,
      errorStyle,
      focusStyle,
      disabledStyle,
      shouldAutoFocus,
      isInputNum,
      value,
      ...rest
    } = this.props;

    const numValueLimits = isInputNum ? { min: 0, max: 9 } : {};

    console.log('##############', this.props);

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={Object.assign(
            { width: this.props.boxwidth ? this.props.boxwidth : '1em', textAlign: 'center' },
            isStyleObject(inputStyle) && inputStyle,
            focus && isStyleObject(focusStyle) && focusStyle,
            isDisabled && isStyleObject(disabledStyle) && disabledStyle,
            hasErrored && isStyleObject(errorStyle) && errorStyle
          )}
          className={this.getClasses(
            inputStyle,
            focus && focusStyle,
            isDisabled && disabledStyle,
            hasErrored && errorStyle
          )}
          type={isInputNum ? 'number' : 'tel'}
          {...numValueLimits}
          maxLength='1'
          ref={input => {
            this.input = input;
          }}
          disabled={isDisabled}
          value={value ? value : ''}
          {...rest}
        />
        {!isLastChild && separator}
      </div>
    );
  }
}

class OtpInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeInput: 0,
      otp: []
    };
  }

  getOtpValue = () => (this.props.value ? this.props.value.toString().split('') : []);

  handleOtpChange = otp => {
    const { onChange, isInputNum } = this.props;
    const otpValue = otp.join('');
    // onChange(isInputNum ? Number(otpValue) : otpValue);
    onChange(otpValue);
  };

  focusInput = input => {
    const { numInputs } = this.props;
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0);

    this.setState({ activeInput });
  };

  focusNextInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput + 1);
  };

  focusPrevInput = () => {
    const { activeInput } = this.state;
    this.focusInput(activeInput - 1);
  };

  changeCodeAtFocus = value => {
    const { activeInput } = this.state;
    const otp = this.getOtpValue();
    otp[activeInput] = value[0];

    this.handleOtpChange(otp);
  };

  handleOnPaste = e => {
    e.preventDefault();
    const { numInputs } = this.props;
    const { activeInput } = this.state;
    const otp = this.getOtpValue();

    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('');

    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift();
      }
    }

    this.handleOtpChange(otp);
  };

  handleOnChange = e => {
    this.changeCodeAtFocus(e.target.value);
    this.focusNextInput();
  };

  handleOnKeyDown = e => {
    if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
      e.preventDefault();
      this.changeCodeAtFocus('');
      this.focusPrevInput();
    } else if (e.keyCode === DELETE || e.key === 'Delete') {
      e.preventDefault();
      this.changeCodeAtFocus('');
    } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
      e.preventDefault();
      this.focusPrevInput();
    } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
      e.preventDefault();
      this.focusNextInput();
    } else if (e.keyCode === SPACEBAR || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
    }
  };

  checkLength = e => {
    if (e.target.value.length > 1) {
      e.preventDefault();
      this.focusNextInput();
    }
  };

  renderInputs = () => {
    const { activeInput } = this.state;
    const {
      numInputs,
      inputStyle,
      focusStyle,
      separator,
      isDisabled,
      disabledStyle,
      hasErrored,
      errorStyle,
      shouldAutoFocus,
      isInputNum
    } = this.props;
    const otp = this.getOtpValue();
    const inputs = [];

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <SingleOtpInput
          key={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onInput={this.checkLength}
          onPaste={this.handleOnPaste}
          onFocus={e => {
            this.setState({ activeInput: i });
            e.target.select();
          }}
          onBlur={() => this.setState({ activeInput: -1 })}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
          shouldAutoFocus={shouldAutoFocus}
          isInputNum={isInputNum}
          boxwidth={this.props.boxwidth}
        />
      );
    }

    return inputs;
  };

  render() {
    const { containerStyle } = this.props;

    return (
      <div
        style={Object.assign({ display: 'flex' }, isStyleObject(containerStyle) && containerStyle)}
        className={!isStyleObject(containerStyle) ? containerStyle : ''}
      >
        {this.renderInputs()}
      </div>
    );
  }
}

OtpInput.propTypes = {
  numInputs: PropTypes.number,
  onChange: PropTypes.func,
  separator: PropTypes.object,
  containerStyle: PropTypes.object,
  inputStyle: PropTypes.object,
  focusStyle: PropTypes.object,
  isDisabled: PropTypes.bool,
  disabledStyle: PropTypes.object,
  hasErrored: PropTypes.bool,
  errorStyle: PropTypes.object,
  shouldAutoFocus: PropTypes.bool,
  isInputNum: PropTypes.bool,
  value: PropTypes.string
};

export default OtpInput;
