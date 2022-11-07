import axios from "axios";
import serverUrl from "../utilities/serverUrl";

class userService {

  post = async (user) => {
    let result = await axios.post(serverUrl + "/user/post", user);
    let userId = result.data;
    return userId;
  }

  get = async () => {
    let result = await axios.get(serverUrl + "/user/get");
    return result.data;
  }

  getUser = async (user_name, pass) => {
    let result = await axios.get(serverUrl + `/user/getByUsername_pass/${user_name}/${pass}`);
    return result.data;
  }
  signIn = async (userDetails) => {
    let result = await axios.post(serverUrl + `/user/signIn`, userDetails);
    return result.data;
  }
  signUp = async (userDetails) => {
    let result = await axios.post(serverUrl + `/user/signUp`, userDetails);
    return result.data;
  }


  readFileData = async (file) => {
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

  handleInputChange = async (files, dest,userId) => {
   // debugger
    if (files) {
      var file = files[0];
      let fileReadProcesses2 = Array.prototype.map.call(files, file => {
        const formData = new FormData();
        formData.append('file', file)
formData.append('userId',userId);
        let obj = {
          userId,
//
//
          img: formData
        }
        axios.post(serverUrl + `/${dest}/upload`, formData)
          .then(res => {
            // debugger
            console.log(res.data.path);
          })
          .catch(err => {
            // debugger
            console.log("error:", err);
          })
      }
      );
      //לבדוק אם זה מחזיר את התמונה לקומפוננטה
      let fileReadProcesses = Array.prototype.map.call(files, file =>
        this.readFileData(file)// readFileData(file)
      );
      Promise.all(fileReadProcesses).then(thumbnails => {
        let filesData = thumbnails.map((thumbnail, index) => ({
          file: files[index],
          thumbnail
        }));
      });
    }
  }
}
export default new userService();