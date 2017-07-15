import React from 'react';

import validator from '../__lib/validator';
import { convToArray } from '../__lib/utils';
import os from '../os';

/*
  model:
    { fn: fieldName, type: [text(default), checkbox, picker, file],
      vd: validator, init: initialValue, af: autoFocus, pp: postProcessing }
  methods:
    __resetState(index),
       index - index of form on page to reset, if 'all' - all forms will be resetted, default - 0
    __setState
*/

const wrapper = forms => WrappedComponent => {
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
        refName = isNative ? 'ref' : '$ref';
      let fields = {
        __query: '',
        __refs: {},
        __submits: {},
        __types: {},
        __state: {},
        __setState: nextFields => this.setFields('set', nextFields),
        __resetState: (index = 0) => this.setFields('reset', index),
      };
      forms = convToArray(forms);
      forms.forEach(form => {
        fields.__submits[form.submit] = this.onSubmit(form);
        form.fields = convToArray(form.fields);
        form.fields.forEach(field => {
          let { fn, type = 'text', init = '', af } = field,
            { handler, value } = FormWrapper.TYPES[type],
            fileNative = isNative && type === 'file';
          fields.__types[fn] = type;
          fields.__state[fn] = init;
          fields[fn] = {
            [handler]: e => this.setFields('change', { e, fn }),
            [value]: init,
            [fileNative ? '$ref' : refName]: c => (fields.__refs[fn] = c),
            // [refName]: c => { if (c) fields.__refs[fn] = c }
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
      });
      this.state = { fields };
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
          if (type === 'file' && !isNative) {
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
              t = __types[fn];
            if (fields.hasOwnProperty(fn)) {
              if (t === 'text') v = '' + v;
              fields[fn][TYPES[t].value] = v;
              fields.__state[fn] = v;
              if (!isNative && t === 'file') {
                fields.__refs[fn].value = v;
              }
            }
          });
        } else if (cmd === 'reset') {
          // get resetted forms
          let rfs = opts === 'all' ? forms : [forms[opts]];
          rfs.forEach(rf => {
            rf.fields.forEach(({ fn, type = 'text', init = '', af }) => {
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
      for (var i = 0, len = keys.length; i < len; i++) {
        let { fn, type = 'text', vd, pp } = keys[i],
          el = fields.__refs[fn];
        if (!el) continue;
        let field = fields[fn],
          { value } = TYPES[type];
        value = field[value];
        if (type === 'text') {
          value = value.trim();
          if (pp) value = pp(value); // postProcessing
        } else if (type === 'file' && os.isNative) {
          let n = value.trim();
          value = field.fileList.find(item => item.name === n);
          // value = fields[fn].fileList.find(item => item.name === n)
        }
        let valid = vd ? validator[vd](value) : true;
        // console.log('form vars', fn, el, valid);
        if (!valid) {
          // this.state.fields.__refs[fn].focus()
          // fields.__refs[fn].focus()
          el.focus();
          return false;
        }
        __fields[fn] = value;
      }
      return __fields;
    };

    render() {
      return <WrappedComponent {...this.props} fields={this.state.fields} />;
    }
  };
};

export default wrapper;
