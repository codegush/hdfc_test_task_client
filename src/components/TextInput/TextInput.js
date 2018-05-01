import React, { Component } from 'react';

class TextInput extends Component {
  render() {
    const {
      containerStyle,
      id,
      labelText,
      labelStyle,
      name,
      onChange,
      placeholder,
      style,
      type,
      value
    } = this.props;

    return (
      <div style={containerStyle}>
        <label className="control-label" htmlFor={id} style={labelStyle}>
          {labelText}
        </label>
        <div className="controls">
          <input
            id={id}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            style={style}
            type={type || 'text'}
            value={value}
          />
        </div>
      </div>
    );
  }
}

export default TextInput;
