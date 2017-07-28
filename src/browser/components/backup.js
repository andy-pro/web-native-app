// download & upload for browser

import { Observable } from 'rxjs';

function download(data, filename) {
  // .txt by default
  var a = document.createElement('a'),
    file = new Blob([data], { type: 'text/plain;charset=utf-8' });
  if (window.navigator.msSaveOrOpenBlob) {
    // for IE10+
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    // Others
    var url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}

function upload(file) {
  // check File API
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    let reader = new FileReader();
    let r = Observable.fromEvent(reader, 'load').map(e => JSON.parse(e.target.result));
    reader.readAsText(file);
    return r;
  } else
    return Observable.throw(
      new Error('The File APIs are not fully supported by your browser.')
    );
}

export { download, upload };
