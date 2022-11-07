import axios from "axios";
import serverUrl from "../utilities/serverUrl";

class productService {

  post = async (product) => {
    let result = await axios.post(serverUrl + "/product/post", product);
    let productId = result.data;
    return productId;
  }

  get = async () => {
    let result = await axios.get(serverUrl + "/product/get");
    return result.data;
  }
  getUrl = (productImage) => {
    return `http://localhost:8080/product/getPicture?fileName=${productImage}`
  }

  //     getUser = async (product_name, pass) => {
  //       let result = await axios.get(serverUrl + `/product/getByUsername_pass/${product_name}/${pass}`);
  //       return result.data;
  //     }
  //     signIn = async (productDetails) => {
  //       let result = await axios.post(serverUrl + `/product/signIn`, productDetails);
  //       return result.data;
  //     }
  //     signUp = async (productDetails) => {
  //       let result = await axios.post(serverUrl + `/product/signUp`, productDetails);
  //       return result.data;
  //     }


  //     readFileData = async (file) => {
  //       const promise = new Promise((resolve, reject) => {
  //         var reader = new FileReader();
  //         reader.onloadend = () => {
  //           resolve(reader.result);
  //         };
  //         reader.onerror = () => {
  //           reject("Something went wrong when reading the file");
  //         };
  //         reader.readAsDataURL(file);
  //       });
  //       return promise;
  //     }

  //     handleInputChange = async (files, dest) => {
  //       debugger
  //       if (files) {
  //         var file = files[0];
  //         let fileReadProcesses2 = Array.prototype.map.call(files, file => {
  //           const formData = new FormData();
  //           formData.append('file', file)

  //           let obj = {
  //             productId: '',
  //   //
  //   //
  //             img: formData
  //           }
  //           axios.post(serverUrl + `/${dest}/upload`, obj, {})
  //             .then(res => {
  //               debugger
  //               console.log(res.data.path);
  //             })
  //             .catch(err => {
  //               debugger
  //               console.log("error:", err);
  //             })
  //         }
  //         );
  //         //לבדוק אם זה מחזיר את התמונה לקומפוננטה
  //         let fileReadProcesses = Array.prototype.map.call(files, file =>
  //           this.readFileData(file)// readFileData(file)
  //         );
  //         Promise.all(fileReadProcesses).then(thumbnails => {
  //           let filesData = thumbnails.map((thumbnail, index) => ({
  //             file: files[index],
  //             thumbnail
  //           }));
  //         });
  //       }
  //     }
}
export default new productService();