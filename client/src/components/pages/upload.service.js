import axios from 'axios';

function readFileData(file) {
  const promise = new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject("Something went wrong when reading the file");
    };
    reader.readAsDataURL(file);
  });
  return promise;
}

export function handleInputChange(files, dest) {
  var file = files[0];
  let fileReadProcesses2 = Array.prototype.map.call(files, file => {
    const formData = new FormData();
    formData.append('file', file)
    axios.post(`http://localhost:5000/api/${dest}`, formData, {} 
    ).then(res => {
      console.log(res.data.path);
    })
  }
  );

  let fileReadProcesses = Array.prototype.map.call(files, file =>
    readFileData(file)
  );
  Promise.all(fileReadProcesses).then(thumbnails => {
    let filesData = thumbnails.map((thumbnail, index) => ({
      file: files[index],
      thumbnail
    }));
  });
}
