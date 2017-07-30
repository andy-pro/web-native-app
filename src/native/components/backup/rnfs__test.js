// @flow
import React, { Component } from 'react';
import { Button, View, Text , Picker} from 'react-native'
import { connect } from 'react-redux';

// import RNFS from 'react-native-fs'
const RNFS = require('react-native-fs');

const readRootDir = () => {
  // get a list of files and directories in the main bundle



  let root = RNFS.ExternalStorageDirectoryPath + '/FinanGo'
  // let root = RNFS.DocumentDirectoryPath
  // console.log('root', root);

  RNFS.readDir(root)
    .then((result) => {
      console.log('GOT RESULT', JSON.stringify(result))
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
}

// create a path you want to write to

const writeTest = () => {
  var path = RNFS.ExternalStorageDirectoryPath + '/FinanGo/test-finango.txt';
  // write the file
  RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}
const makeDir = () => {
  var path = RNFS.ExternalStorageDirectoryPath + '/FinanGo';
  // write the file
  RNFS.mkdir(path)
    .then((success) => {
      console.log('ura, dir!');
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const getFSInfoTest = () => {
  RNFS.getFSInfo().then(info => {
    console.log(JSON.stringify(info))
  });
}

class FileInput extends Component {

  constructor(props) {
    super(props)
    this.state = this.init
  }

  init = {
    listIndex: undefined,
    fileList: [],
    pickerList: []
  }

  componentDidMount() {
    this.readAppDir()
  }

  readAppDir = () => {
    let root = RNFS.ExternalStorageDirectoryPath + '/FinanGo'
    // let root = RNFS.DocumentDirectoryPath
    // console.log('root', root);

    RNFS.readDir(root)
      .then((fileList) => {
        // console.log('GOT RESULT', JSON.stringify(fileList))
        let data
        if (fileList.length) {
          fileList.unshift({name: 'Select file'})
          fileList.forEach((item, i) => item.index = i)
          data = {
            listIndex: 0,
            fileList,
            pickerList: fileList.map((item, i) => <Picker.Item key={i} label={item.name} value={i} />),
          }
        } else data = this.init
        // console.log('GOT RESULT', JSON.stringify(data.fileList))
        this.setState(data)
      })
      .catch((err) => {
        console.log(err.message, err.code);
      });
  }

  readAppFile = () => {
    let { index } = this.props.value
    if (!index) return
    importFile(this.state.fileList[index].path)
  }

  onValueChange = index => {
    this.props.onChangeText({
      // target: { files: index ? [this.state.fileList[index]] : '' }
      target: { files: index ? [this.state.fileList[index]] : '' }
    })
    // this.setState({ index })
  }

  render () {
    return (
      <View style={{flex: 1}}>
        <Button
          onPress={makeDir}
          title="make app dir"
          color="#bbb"
        />
        <Button
          onPress={writeTest}
          title="write file"
          color="#abc"
        />
        <Button
          onPress={this.readAppFile}
          title="Read file"
          color="#bbb"
        />
        <Picker
          selectedValue={this.props.value.index || 0}
          onValueChange={this.onValueChange}
        >
          {this.state.pickerList}
        </Picker>
      </View>
    )
  }

}

export default connect(
  ({ app }) => ({
    messages: app.messages
  })
)(FileInput);


const importFile = path => {
  Promise.all([RNFS.stat(path), path])
    .then((statResult) => {
      if (statResult[0].isFile()) {
        // if we have a file, read it
        return RNFS.readFile(statResult[1], 'utf8');
      }

      return 'no file';
    })
    .then((contents) => {
      // log the file contents
      console.log(contents);
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
}

//
// constructor(props) {
//   super(props)
//   this.state = this.init
// }

init = {
  listIndex: undefined,
  fileList: [],
  pickerList: []
}

// componentDidMount() {
//   this.readAppDir()
// }

readAppDir = () => {
  let root = RNFS.ExternalStorageDirectoryPath + '/FinanGo'
  // let root = RNFS.DocumentDirectoryPath
  // console.log('root', root);

  RNFS.readDir(root)
    .then((fileList) => {
      // console.log('GOT RESULT', JSON.stringify(fileList))
      let data
      if (fileList.length) {
        fileList.unshift({name: 'Select file'})
        fileList.forEach((item, i) => item.index = i)
        data = {
          listIndex: 0,
          fileList,
          pickerList: fileList.map((item, i) => <Picker.Item key={i} label={item.name} value={i} />),
        }
      } else data = this.init
      // console.log('GOT RESULT', JSON.stringify(data.fileList))
      this.setState(data)
    })
    .catch((err) => {
      console.log(err.message, err.code);
    });
}

readAppFile = () => {
  let { index } = this.props.value
  if (!index) return
  importFile(this.state.fileList[index].path)
}

onValueChange = index => {
  this.props.onChangeText({
    // target: { files: index ? [this.state.fileList[index]] : '' }
    target: { files: index ? [this.state.fileList[index]] : '' }
  })
  // this.setState({ index })
}
