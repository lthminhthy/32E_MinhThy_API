// get: lấy dữ liệu product về
function layDanhSachSanPham() {
    var promise = axios({

        url: 'http://svcy.myclass.vn/api/Product/GetAll',
        method: 'GET'
    });

    promise.then(function (result) {
        console.log(result.data);
        //Sau khi lấy dữ liệu từ backend về dùng dữ liệu đó tạo ra tr trên table
        renderProduct(result.data);
    });

    promise.catch(function (error) {
        console.log(error)
    });
}

window.onload = function () {
    layDanhSachSanPham();
}


// post
document.querySelector('#btnCreate').onclick= function(){

    // var product = {
    //     "id" : "string",
    //     "name" : "string",
    //     "price" : "string",
    //     "img" : "string",
    //     "description" : "string",
    //     "type" : "string"
    // }
    var sp = new Product();
    // lấy thông tin từ giaodieejn
    sp.id = document.querySelector('#id').value;
    sp.name = document.querySelector('#name').value;
    sp.price = document.querySelector('#price').value;
    sp.img = document.querySelector('#img').value;
    sp.description = document.querySelector('#description').value;
    sp.type = document.querySelector('#type').value;

    // console.log(sp)
    var promise = axios({
        url : 'http://svcy.myclass.vn/api/Product/CreateProduct',
        method: 'POST',
        data: sp
    });

    promise.then(function(result){
        console.log(result.data);
        layDanhSachSanPham();
    });
    promise.then(function(error){
        console.log(error);
    })
}





function renderProduct(arrProduct) {
    var html = '';
    for (var i = 0; i < arrProduct.length; i++) {
        var sp = arrProduct[i];
        html += `
            <tr>
                <td>${sp.id}</td>
                <td><img src=" ${sp.img}" class='w-25'</td>
                <td>${sp.name}</td>
                <td>${sp.price}</td>
                <td>${sp.description}</td>
                <td>${sp.type}</td>
                 
                <td>  
                    <button class="btn btn-danger" onclick="xoaSp('${sp.id}')" id='btnDelete'><i class="fa fa-trash" aria-hidden="true"></i></button>
               </td> 
               <td>
                    <button class="btn btn-primary" onclick="chinhSuaSp('${sp.id}')"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
                </td> 
            </tr>
        `;
    }
    document.querySelector('#tableDanhSach').innerHTML = html;
}

// xóa dữ liệu
function xoaSp(idSpClick){
    // alert (idSpClick);

    var promise = axios({
        url : 'http://svcy.myclass.vn/api/Product/DeleteProduct/'+ idSpClick,
        method : 'DELETE'
    });

    promise.then(function(result){
        console.log(result.data);
        layDanhSachSanPham();
    });
    promise.catch(function(error){
        console.log(error);
    })


}
function chinhSuaSp(idSpClick){
    // alert (idSpClick);

    var promise = axios({
        url : 'http://svcy.myclass.vn/api/Product/GetById/'+ idSpClick,
        method : 'GET'
    });

    promise.then(function(result){
        console.log(result.data);
        var sanPham = result.data;
        // load lên
        document.querySelector('#id').value= sanPham.id;
        document.querySelector('#name').value= sanPham.name;
        document.querySelector('#price').value= sanPham.price;
        document.querySelector('#img').value= sanPham.img;
        document.querySelector('#description').value= sanPham.description;
        document.querySelector('#type').value= sanPham.type;

    });
    promise.catch(function(error){
        console.log(error);
    })
}


// put
document.querySelector('#btnUpdate').onclick = function(){
    var productUdate = new Product();
    productUdate.id = document.querySelector('#id').value;
    productUdate.name = document.querySelector('#name').value;
    productUdate.price = document.querySelector('#price').value;
    productUdate.img = document.querySelector('#img').value;
    productUdate.description = document.querySelector('#description').value;
    productUdate.type = document.querySelector('#type').value;


    var promise = axios({
        url : 'http://svcy.myclass.vn/api/Product/UpdateProduct/' + productUdate.id,
        method: 'PUT',
        data: productUdate
    });

    promise.then(function(result){
        console.log(result.data);
        layDanhSachSanPham();
    });
    promise.catch(function(error){
        console.log(error);
    })
}


// search
document.querySelector('#btnSearch').onclick = function(){
    var productSearch = document.querySelector('#searchName').value;
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/Product/SearchByName?name='+ productSearch,
        method: 'GET'
    });

    promise.then(function (result) {
        console.log(result.data);
        //Sau khi lấy dữ liệu từ backend về dùng dữ liệu đó tạo ra tr trên table
        renderProduct(result.data);
    });

    promise.catch(function (error) {
        console.log(error);
        document.querySelector('#tableDanhSach').innerHTML = "Product Not Found";
    });
  
}
















