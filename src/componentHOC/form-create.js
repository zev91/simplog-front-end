import React, { Component } from "react";
import { FormControl, Input, InputLabel, InputAdornment, FormHelperText } from '@material-ui/core';
import { validateEmail } from 'src/utils/helper';

const validateFunc = {
  'email': validateEmail
}
export class InputFormItem extends Component {

  componentDidMount() {
    const { getField, name, label, rules, required, initState } = this.props;
    initState({ name, label, required, rules });
  }
  render() {
    const { name, label, type, required, fullWidth, errors } = this.props;
    return (
      <FormControl required={required} fullWidth={fullWidth} error={errors[name] ? errors[name].error : false}>
        <InputLabel htmlFor={`${name}-input`} >{label}</InputLabel>
        <Input id={`${name}-input`} aria-describedby={`${name}-helper-text`} type={type} name={name} {...this.props.getField(name)} />
        {errors[name] && errors[name].error && <FormHelperText id="username-helper-text">{errors[name].errorMsg}</FormHelperText>}
      </FormControl>
    )
  }
}

const stateObj = {
  fields: {},
  validation: {},
  error: {}
}

export default WrappedComponent =>
  class extends Component {
    constructor() {
      super();
      this.state = JSON.parse(JSON.stringify(stateObj));
      this.saveState = JSON.parse(JSON.stringify(stateObj));
    }

    componentDidMount() {
      this.setState(this.saveState);
    }

    onChange = key => e => {
      const errorInfo = this.onValidData(key, e.target.value);
      this.setState({
        fields: {
          ...this.state.fields,
          [key]: e.target.value
        },
        error: {
          ...this.state.error,
          ...errorInfo
        }
      });
    };

    onValidData = (fieldName, value) => {
      const { validation } = this.state;
      const rules = validation[fieldName].rules;
      const required = validation[fieldName].required;
      let errorMsg = '';
      let error = false;
      if (required) {
        if (!value) {
          errorMsg = `${validation[fieldName]['label']} 为必填项！`;
          error = true;
        }
      };

      if (rules && value) {
        if (!validateFunc[rules](value)) {
          errorMsg = `${validation[fieldName]['label']} 格式不正确！`;
          error = true;
        }
      };
      return ({
        [fieldName]: {
          errorMsg,
          error
        }
      })
    }

    validFields = fieldName => {
      const { fields, error } = this.state;
      if (fieldName) {
        this.setState({
          error: {
            ...error,
            ...this.onValidData(fieldName, fields[fieldName])
          }
        });

        return !this.onValidData(fieldName, fields[fieldName])[fieldName].error
      }
      else {
        return Object.values(this.onValidAll()).every(item => !item.error);
      }
    }

    onValidAll = () => {
      const { fields } = this.state;
      let validResult = {};
      for (let name in fields) {
        validResult = { ...validResult, ...this.onValidData(name, fields[name]) };
      }
      this.setState({
        error: validResult
      });
      return validResult;
    }

    handleSubmit = () => {
      return ({
        data: this.state.fields,
        valid: Object.values(this.onValidAll()).every(item => !item.error)
      })
    };

    getField = (fieldName) => {
      return {
        onChange: this.onChange(fieldName),
        value: this.state.fields[fieldName]
      };
    };

    getFieldValues = fieldName => fieldName ? this.state.fields[fieldName] : this.state.fields;

    initState = ({ name, label, required, rules }) => {
      this.saveState = {
        validation: {
          ...this.saveState.validation,
          [name]: {
            required,
            rules,
            label
          }
        },
        fields: {
          ...this.saveState.fields,
          [name]: ''
        },
        error: {
          ...this.saveState.error,
          [name]: {}
        }
      }
    }

    render() {
      const props = {
        ...this.props,
        initState: this.initState,
        handleSubmit: this.handleSubmit,
        getField: this.getField,
        getFieldValues: this.getFieldValues,
        validFields: this.validFields,
        errors: this.state.error
      };

      return <WrappedComponent {...props} />;
    }
  };
