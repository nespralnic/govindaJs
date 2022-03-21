let precioTotal=0;
let mensaje='';
const productos=[];

class Producto{
    constructor(id,nombre,precio,cantidad,tipo){
        this.id=id;
        this.nombre=nombre;
        this.precio=precio;
        this.cantidad=cantidad;
        this.tipo=tipo;
    }
    
    //No uso este método 
    //Está pensado para uso interno
    aumento = function(valor){
        this.precio+=valor;
    }       

    resetCantidad = function(){
        this.cantidad=0;
    }
}

//hardcode de productos
productos.push(new Producto(1,"Porotos Negros",500,0,"b"));
productos.push(new Producto(2,"Porotos Mung",500,0,"b"));
productos.push(new Producto(3,"Trigo Sarraceno",500,0,"b"));
productos.push(new Producto(4,"Falafel",470,0,"b"));    
productos.push(new Producto(5,"Nuggets de Mijo",470,0,"b"));
productos.push(new Producto(6,"Albóndigas de Garbanzo",470,0,"b"));
productos.push(new Producto(7,"Calabaza y Puerros",500,0,"t"));
productos.push(new Producto(8,"Hojas Verdes",500,0,"t"));
productos.push(new Producto(9,"Berenjenas",500,0,"t"));
productos.push(new Producto(10,"Zapallitos",500,0,"t"));    
productos.push(new Producto(11,"Hongos",530,0,"t"));
productos.push(new Producto(12,"Brócolis",530,0,"t"));


//toast bienvenida
setTimeout(function(){
    Toastify({
        text: "Podés agregar un mensaje al enviar el pedido",
        duration: 4000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        className: "claseToast",
        
        style: {
          background: "linear-gradient(to right, #f0ba46, #7c4f40)",
          
        },
      }).showToast();    
},2000)


//mostrar el carrito si hay algún valor cargado en storage
obtenerDatos();
grillaProductos();


/*
console.log('your local JSON =', JSON.stringify(localStorage)); 
console.log('your local JSON =', JSON.parse(localStorage.getItem(6)));
*/