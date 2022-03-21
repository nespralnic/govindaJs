
//función para recuperar el localStorage
//localStorage es una "variable global"
function obtenerDatos(){
    for (const producto of productos){
        if (producto.id in localStorage){
            producto.cantidad  = localStorage.getItem(producto.id);

        }
    }  
}


// ---------------------- CARRITO ----------------------


//chequea el minimo de envío e imprime boton de enviar
function chequearMinimo() {

    if (precioTotal<3000){

        let txt = document.createElement("h6");
        txt.innerHTML = "*EL MÍNIMO DE ENVÍO ES $3000";
         totalCarrito.appendChild(txt);    
    }else{
        let bot = document.createElement('button');
        //agrega un id al boton
        bot.id = "botonEnviar";
        bot.className = "botonEnviar";
        bot.innerHTML = "ENVIAR";
        totalCarrito.appendChild(bot);
        let botonEnviar = document.getElementById("botonEnviar");
        botonEnviar.onclick = (e) =>{
            modal();
        }
    }
}

function totalDelCarrito(){
    precioTotal=0;
    for (const producto of productos){
        precioTotal = precioTotal+producto.cantidad*producto.precio;
    }
}

//IMPRIME PRODUCTOS QUE SEAN MAYORES A CERO
function carrito(){

    //estas dos líneas sobreescriben cada vez que escucha un evento
    let container = document.getElementById("containerDerecha");
    //muestra el container solo si hay datos guardados
    if (localStorage.length>0){
        
        container.innerHTML= '<div id="tituloCarrito"></div><div id="contenedorCarrito"></div><div id="totalCarrito"></div>';

        let divCarrito = document.getElementById("contenedorCarrito");
        
        //imprime el contenido de la grid
        for (const producto of productos){
            if (producto.cantidad>0){
                    let div = document.createElement("div");
                    div.innerHTML = producto.nombre;
                    divCarrito.appendChild(div);
                    div = document.createElement("div");
                    div.innerHTML = producto.cantidad;
                    divCarrito.appendChild(div);
                    div = document.createElement("div");
                    div.innerHTML = "$"+producto.precio;
                    divCarrito.appendChild(div);
                    div = document.createElement("div");
                    let = subTotal = "$"+producto.cantidad*producto.precio;
                    div.innerHTML = subTotal;
                    divCarrito.appendChild(div);
                }
                if (producto.cantidad==0){
                    subTotal=0;
                }
            }    
        //imprime el total del carrito
        let totalCarrito = document.getElementById("totalCarrito");
        frase = document.createElement("p");
        totalDelCarrito();
        frase.innerHTML = "TOTAL: $"+precioTotal;
        totalCarrito.appendChild(frase);
        
        chequearMinimo();
    
    }else{
        container.innerHTML= "";
    }
}




// ------------------------ MODAL --------------------------
//imprime el modal y botones de cancelar y confirmar
function modal(){
    let modalBg = document.querySelector(".modal-bg");
    modalBg.classList.add("modal-bg--active");
    let btnConfirmarModal = document.querySelector(".btnConfirmar");
    let btnCancelarModal = document.querySelector(".btnCancelar");
    let campoNombre = document.getElementById("nombre");
    let campoTelefono = document.getElementById("telefono");
    let campoMensaje = document.getElementById("textarea");
    
    //para cerrar con ESC
    document.addEventListener('keydown', (event) => {
        var keyValue = event.key;
        if (keyValue == "Escape"){
            modalBg.classList.remove("modal-bg--active");
        }
      }, false);    

    btnCancelarModal.onclick = (e) =>{
        e.preventDefault();
        modalBg.classList.remove("modal-bg--active");
    }

    btnConfirmarModal.onclick = (e) =>{
        
        //condición sobre los campos required
        if ((campoNombre.value != "") && (campoTelefono.value != "")){
            e.preventDefault();

            //oculta el modal
            modalBg.classList.remove("modal-bg--active");
            //borra localstorage
            localStorage.clear();
          
            //enviar mail

            Email.send({
                SecureToken : "3d2d9b3e-5cc0-4c7d-b67b-6aad67e8230a",
                To : 'niconespral@gmail.com',
                From : "niconespral@gmail.com",
                Subject : "GOVINDA PEDIDO",
                Body : nuevoPedido(campoNombre.value,campoTelefono.value,campoMensaje.value)
            }).then(
              (mensaje) => 
              
              {
                  //"OK" es default de la api
                if (mensaje === "OK"){

                    //setea en cero los campos
                    let campos = document.querySelectorAll('.inputCantidad');
                    campos.forEach(i => {
                        i.value=0;  
                    })
                    //setea cantidad de productos en cero
                    for (const producto of productos){
                        producto.resetCantidad();
                    }

                    carrito();
                    Toastify({
                        text: "Gracias, "+campoNombre.value+"! te contactaremos para combinar el delivery",
                        duration: 6000,
                        gravity: "bottom", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        className: "claseToast2",
                        
                        style: {
                        background: "linear-gradient(to right, #f0ba46, #7c4f40)",
                        },
                    }).showToast();
                }else{
                    Toastify({
                        text: "Lo sentimos, hubo un error en el proceso",
                        duration: 4000,
                        gravity: "bottom", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        className: "claseToast2",
                        
                        style: {
                        background: "linear-gradient(to right, #f0ba46, #7c4f40)",
                        },
                    }).showToast();
                }
            }).catch(() => {
    
                Toastify({
                    text: "Ups! Ha ocurrido un error inesperado.",
                    duration: 4000,
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    className: "claseToast2",
                    
                    style: {
                    background: "linear-gradient(to right, #f0ba46, #7c4f40)",
                    },
                }).showToast()

            });
        }
    }
}

/* botones + y -*/ 
function sumaResta(){
    let restas = document.getElementsByClassName("minus");
    let sumas = document.getElementsByClassName("plus");
   
    //boton restar
    for (const resta of restas){
        resta.addEventListener('click', function (){
           
            let seleccion = productos.find(item => (`minus${item.id}`) == this.id);
            if (seleccion.cantidad>0){
                seleccion.cantidad=parseInt(seleccion.cantidad)-1;
            }
            //guarda en localstorage
            localStorage.setItem(seleccion.id,seleccion.cantidad);
            //elimina localstorage si es 0
            if (seleccion.cantidad == 0){localStorage.removeItem(seleccion.id,seleccion.cantidad)};
            carrito();
        })
        
    }
    //boton sumar
    for (const suma of sumas){
        suma.addEventListener('click', function (){
            
            let seleccion = productos.find(item => (`plus${item.id}`) == this.id);
            seleccion.cantidad=parseInt(seleccion.cantidad)+1;   
            
            //guarda en localstorage
            localStorage.setItem(seleccion.id,seleccion.cantidad);
            carrito();
        })   
    }
}



function grillaProductos(){
    let divContenedorIzquierda = document.getElementById("containerIzquierda")
    let contenido = "";

    //imprime titulos de menú
    contenido = "<ul class='listaBurgers'><p class='listaTitulo'>BURGERS</p></ul> <ul class='listaTartas'><p class='listaTitulo'>TARTAS</p></ul>";
    divContenedorIzquierda.innerHTML = contenido;


    let listadoBurgers = document.querySelector(".listaBurgers");
    let listadoTartas =document.querySelector(".listaTartas");
    
    //despliega burgers
    listadoBurgers.addEventListener('click', (e) =>{  
        //si hay productos específicos en localStorage muestra el carrito
        let mostrarCarrito = productos.find(producto => producto.tipo == "b" && producto.cantidad >0 );
        if (mostrarCarrito){carrito()}; 

        let aux='';
        for (const producto of productos){
                
                if (producto.tipo == "b"){
                    
                    aux = aux+`<li class='listaProductos'><span class='nombreProductos'>${producto.nombre}</span><span>$${producto.precio}</span>
                        
                    <div class="number">
                        <span class="minus" id="minus${producto.id}">-</span>
                        <input class='inputCantidad' id='${producto.id}' type='text' value='${producto.cantidad}' min='0' disabled/>
                        <span class="plus" id="plus${producto.id}">+</span>
                    </div>
                    `;
                    listadoBurgers.innerHTML = "<p class='listaTitulo2'>BURGERS</p>"+aux;
                    }
                
                
            };       
        sumaResta();
    });
    
    //despliega tartas
    listadoTartas.addEventListener('click', (e) =>{ 
        //si hay productos específicos en localStorage muestra el carrito
        let mostrarCarrito = productos.find(producto => producto.tipo == "t" && producto.cantidad >0 );
        if (mostrarCarrito){carrito()};  

        let aux='';
        for (const producto of productos){
                
                if (producto.tipo == "t"){
                    
                        aux = aux+`<li class='listaProductos'><span class='nombreProductos'>${producto.nombre}</span><span>$${producto.precio}</span>
                        
                        <div class="number">
                            <span class="minus" id="minus${producto.id}">-</span>
                            <input class='inputCantidad' id='${producto.id}' type='text' value='${producto.cantidad}' min='0'/>
                            <span class="plus" id="plus${producto.id}">+</span>
                        </div>
                        `;

                        listadoTartas.innerHTML = "<p class='listaTitulo2'>TARTAS</p>"+aux;
                    }
            };   

        sumaResta();
    });       
}


function formatDate(date) {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 

//imprime la información del pedido en un nuevo html para gestión interna
function nuevoPedido(nombre,numero,mensaje){
    
    
    let texto ="";
    let fecha = formatDate(Date.now());
    
    for (const producto of productos){
        if (producto.cantidad >0)
        texto = texto+producto.nombre +" "+producto.cantidad+"<br>";
    }
    texto = `<br>${texto} <br> TOTAL $${precioTotal}<br>Cliente: ${nombre}<br> Teléfono: ${numero}<br> Mensaje: ${mensaje}<br>${fecha}<br>`;

    return texto;
    
}

