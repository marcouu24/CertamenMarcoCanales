//Tiny
tinymce.init({
    selector: '#crimen-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });


  //Añadir Ciudades

  let comunas = ["Santiago","Quilpue","Viña del Mar","Otra que no sea santiago"];
  const añadir = () => {
      let select = document.querySelector("#ciudad-select");

      for (let i = 0; i < comunas.length; i++){

        let comuna=document.createElement("option");
        comuna.value=comunas[i];
        comuna.text=comunas[i];
        select.appendChild(comuna);         
      }
  };

añadir();



//Cargar Tabla

const reos = [];
const cargarTabla = ()=>{

  let tbody = document.querySelector("#tbody-tabla");
  tbody.innerHTML = "";

    //Recorrer la lista 
    for(let i=0; i < reos.length; ++i){
    let r = reos[i];

    //Por cada reo genera una fila de la tabla (tr)
    let tr = document.createElement("tr");

    //Por cada atributo generar un td de la tabla
    let tdNombre = document.createElement("td");
    let tdDetalle = document.createElement("td");
    let tdCiudad = document.createElement("td");
    let tdGravedad = document.createElement("td");

        //Definir    
        tdNombre.innerText = r.nombre + " " +  r.apellido;
        tdDetalle.innerHTML = r.detalle;
        tdCiudad.innerHTML = r.ciudad;
        let gravedad=document.createElement("i");

        if (r.cantidadcrimenes<4){
            gravedad.classList.add("fas", "fa-exclamation-triangle", "text-success","fa-3x")        
        }else if(r.cantidadcrimenes>3 && r.cantidadcrimenes<7){
            gravedad.classList.add("fas", "fa-exclamation-triangle", "text-primary","fa-3x") 
        }else if(r.cantidadcrimenes>6 && r.cantidadcrimenes<16){
            gravedad.classList.add("fas", "fa-exclamation-triangle", "text-warning","fa-3x") 
        }else if(r.cantidadcrimenes>15){
            gravedad.classList.add("fas", "fa-exclamation-triangle", "text-danger","fa-3x") 
        }
        tdGravedad.classList.add("text-center");
        tdGravedad.appendChild(gravedad);

        //5. Agregar los td al tr
        tr.appendChild(tdNombre);
        tr.appendChild(tdDetalle);
        tr.appendChild(tdCiudad);
        tr.appendChild(tdGravedad);
        ////6. Agregar el tr a la tabla
        tbody.appendChild(tr);
    }
};



//Listener BTN Registrar
document.querySelector("#registrar-btn").addEventListener("click", ()=>{
    let nombre = document.querySelector("#nombre-txt").value;
    let apellido = document.querySelector("#apellido-txt").value;
    let cantidadcrimenes = document.querySelector("#crimenes-txt").value;
    let detalle = tinymce.get("crimen-txt").getContent(); //Tinymce
    let ciudad = document.querySelector("#ciudad-select").value;
    
    let reo = {};

    //Crear atributo del objeto
    reo.nombre = nombre;
    reo.apellido = apellido;
    reo.cantidadcrimenes = cantidadcrimenes;
    reo.detalle = detalle;
    reo.ciudad = ciudad;
 
    reos.push(reo);
    cargarTabla();
    Swal.fire("Registro de criminal realizado", );  
 } );




