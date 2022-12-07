const socket = io();
//New Product constants
const productsPool = document.getElementById("tableBody");
const productForm = document.getElementById("addProductForm");
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const produdctthumbnail = document.getElementById("thumbnail");

const renderProducts = (productData) => {
    console.log("Data de producto : ", productData)

    fetch('http://localhost:3000')
        .then(res => console.log("Respuesta: ", res))

        .catch(err => console.log('Solicitud fallida', err)); // Capturar errores

};

// Definimos la funcion submit handler, se ejecuta cuando se dispara el evento submit del form
const submitProductHandler = (event) => {
    //Ejecutamos la funcion preventDefault() para evitar que se recargue la pagina
    //event.preventDefault();

    // Definimos la informacion del mensaje, es un obejto con una propiedad "username" y "message"
    const productInfo = {
        title: productName.value,
        price: productPrice.value,
        thumbnail: produdctthumbnail.value,
    };

    socket.emit("client:productData", productInfo);
    productName.value = "";
    productPrice.value = "";
    produdctthumbnail.value = "";

};

productForm.addEventListener("submit", submitProductHandler);

const chatForm = document.getElementById("chatForm");
const userName = document.getElementById("userName");
const message = document.getElementById("message");
const messagesPool = document.getElementById("messagesPool");

const renderMessage = (messagesData) => {

    const html = messagesData.map((messageInfo) => {
        return `<div > <strong style="color:blue;">${messageInfo.username}</strong><em style="color:brown;"> [${messageInfo.hourDate}] </em><em style="color:green; font-style: italic;" >${messageInfo.message}</em> </div>`;
    });

    messagesPool.innerHTML = html.join(" ");
};

// Definimos la funcion submit handler, se ejecuta cuando se dispara el evento submit del form

const submitMessageHandler = (event) => {
    //Ejecutamos la funcion preventDefault() para evitar que se recargue la pagina
    event.preventDefault();
    let today = new Date();
    let date = today.toLocaleString()
    // Definimos la informacion del mensaje, es un obejto con una propiedad "username" y "message"
    const messageInfo = {
        username: userName.value,
        hourDate: date,
        message: message.value,
    };
    // Ejecutamos la funcion sendMessage() que la encargada de enviar el mensaje al back pasandole como parametro la informacion del mensaje
    socket.emit("client:message", messageInfo);

    // Vaciamos el message input asi queda libre para escribir un nuevo mensaje
    message.value = "";
    userName.readOnly = true;
};

chatForm.addEventListener("submit", submitMessageHandler);
socket.on("server:message", renderMessage);
socket.on("server:products", renderProducts);