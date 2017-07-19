import React from 'react';

import validator from '../__lib/validator';
import { convToArray } from '../__lib/utils';
import os from '../os';

/*
  Model: {
    submit: String, // submit handler name, 'onSubmit' by default,
    fields: Array, // array of field objects
  }
  If there are more than one form on the page, then an array of models used:
  [
    { submit: onInsertSubmit, fields: [{...}, {...}] },
    { submit: onRemoveSubmit, fields: [{...}, {...}] },
    { submit: onUpdateSubmit, fields: [{...}, {...}] },
    ...
  ]

  !!! Field names on a page must be unique !!!

  If the form has only one field, you can do so:
  { submit: 'onFormSubmit', fields: {...} }

  field:
    { fn: fieldName, type: [text(default), checkbox, picker, file],
      vd: validator, init: initialValue, af: autoFocus, pp: postProcessing }

  Methods:
    __resetState(index),
       index - index of form on page to reset, if 'all' - all forms will be resetted, default - 0
    __setState(object of fields)
*/

const wrapper = forms => WrappedForm => {
  return class FormWrapper extends React.Component {
    static TYPES = {
      text: {
        handler: 'onChangeText',
        value: 'value',
      },
      file: {
        handler: 'onChangeText',
        value: 'value',
      },
      checkbox: {
        handler: 'onPress',
        value: 'checked',
      },
      picker: {
        handler: 'onValueChange',
        value: 'selectedValue',
      },
    };

    constructor(props) {
      super(props);
      let { isNative } = os,
        refName = isNative ? 'ref' : '$ref',
        submits = {};
      let fields = {
        __query: '',
        __refs: {},
        __types: {},
        __state: {},
        __setState: nextFields => this.setFields('set', nextFields),
        __resetState: (index = 0) => this.setFields('reset', index),
      };
      forms = convToArray(forms);
      forms.forEach(form => {
        form.fields = convToArray(form.fields);
        form.fields.forEach(field => {
          let { fn, type = 'text', init, af } = field,
            { handler, value } = FormWrapper.TYPES[type],
            fileNative = isNative && type === 'file';
          if (init === undefined) {
            init = type === 'checkbox' ? false : '';
          }
          fields.__types[fn] = type;
          fields.__state[fn] = init;
          fields[fn] = {
            [handler]: e => this.setFields('change', { e, fn }),
            [value]: init,
            [fileNative ? '$ref' : refName]: c => (fields.__refs[fn] = c),
          };
          if (fileNative) {
            fields[fn].getElement = () => fields.__refs[fn];
            fields[fn].setFileList = fl => (fields[fn].fileList = fl);
          }
          if (af) {
            fields.__name = fn;
            fields[fn].autoFocus = true;
          }
        });
        let h = form.submit || 'onSubmit';
        submits[h] = e =>
          this.refs.wrappedForm[h](this.onSubmit(form)(e), this.state.fields);
      });
      this.state = { fields };
      this.submits = submits;
    }

    setFields = (cmd, opts) => {
      let { fields } = this.state,
        { __types } = fields,
        TYPES = this.constructor.TYPES,
        { isNative } = os,
        common;
      if (cmd === 'change') {
        let { e, fn } = opts,
          field = fields[fn],
          type = __types[fn],
          { value } = TYPES[type],
          el,
          q;
        if (type === 'checkbox') {
          q = !field[value];
        } else {
          el = e.target;
          if (!isNative && type === 'file') {
            let { files } = el;
            q = files && files[0] ? files[0] : '';
          } else {
            if (el) {
              q = el.value;
            } else {
              q = e;
              el = fields.__refs[fn];
            }
            // q = el ? el.value : e
          }
        }
        field[value] = q;
        fields.__state[fn] = q;
        // console.log('Form Wrapper onChange:', fn, q);
        common = { __name: fn, __query: q, __element: el };
      } else {
        common = { __name: '', __query: '', __element: '' };

        if (cmd === 'set') {
          Object.keys(opts).forEach(fn => {
            let v = opts[fn],
              type = __types[fn];
            if (fields.hasOwnProperty(fn)) {
              if (type === 'text') v = '' + v;
              fields[fn][TYPES[type].value] = v;
              fields.__state[fn] = v;
              if (!isNative && type === 'file') {
                // browser file input only
                fields.__refs[fn].value = v;
              }
            }
          });
        } else if (cmd === 'reset') {
          // get resetted forms
          let rfs = opts === 'all' ? forms : [forms[opts]];
          rfs.forEach(rf => {
            rf.fields.forEach(({ fn, type = 'text', init, af }) => {
              if (init === undefined) {
                init = type === 'checkbox' ? false : '';
              }
              fields[fn][TYPES[type].value] = init;
              fields.__state[fn] = init;
              if (af) fields.__refs[fn].focus();
            });
          });
        }
      }
      Object.assign(fields, common);
      // console.log(cmd, 'Form Wrapper set state:', fields.__name, fields.__query);
      this.setState({ fields: { ...fields } });
    };

    onSubmit = form => e => {
      e.preventDefault();
      let keys = form.fields,
        { fields } = this.state,
        __fields = {},
        TYPES = this.constructor.TYPES;
      // console.log('keys', keys, fields);
      for (var i = 0, len = keys.length; i < len; i++) {
        let { fn, type = 'text', vd, pp } = keys[i],
          cb = type === 'checkbox',
          // checkboxes does not have a focus (TODO)
          el = cb ? true : fields.__refs[fn];
        if (!el) continue;
        let field = fields[fn],
          { value } = TYPES[type];
        value = field[value];
        if (type === 'text') {
          value = value.trim();
          if (pp) value = pp(value); // postProcessing
        } else if (os.isNative && type === 'file') {
          let n = value.trim();
          value = field.fileList.find(item => item.name === n);
        }
        if (!cb) {
          // checkboxes does not require validators
          let valid = vd ? validator[vd](value) : true;
          // console.log('form vars', fn, el, valid);
          if (!valid) {
            // this.state.fields.__refs[fn].focus()
            // fields.__refs[fn].focus()
            el.focus();
            return false;
          }
        }
        __fields[fn] = value;
      }
      return __fields;
    };

    render() {
      return (
        <WrappedForm
          fields={this.state.fields}
          ref="wrappedForm"
          {...this.props}
          {...this.submits}
        />
      );
    }
  };
};

export default wrapper;
