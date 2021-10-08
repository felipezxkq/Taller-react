import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import MaterialDatatable from "material-datatable";


const App = () => {
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [personas, setPersonas] = useState([])

    const handleInputChangeNombre = (event) => {
        //console.log(event.target.value)
        setNombre(event.target.value)
    }

    const handleInputChangeApellido = (event) => {
        //console.log(event.target.value)
        setApellido(event.target.value)

    }

    const enviarDatos = () => {
        // alert("Entro aqui")
        // console.log("Enviando datos nombre:"+nombre+" y apellido:"+apellido)
        console.log(`Enviando datos nombre:${nombre} y apellido:${apellido}`)

        guardarPersona();
     
     
        // let nuevo = {
        //     name: nombre,
        //     last: apellido
        // }
        // setPersonas(personas => [...personas, nuevo])
        // setNombre("")
        // setApellido("")
    }

    useEffect(()=>{

        getPersonas()
    },[])
    async function getPersonas() {
        try {
          const response = await axios.get('http://192.99.144.232:5000/api/personas?grupo=7');
          if(response.status == 200)
          {
            
            setPersonas(response.data.persona)
            console.log(response.data);


          }
         
        } catch (error) {
          console.error(error);
        }
      }
    
      function guardarPersona()
      {
        axios.post('http://192.99.144.232:5000/api/personas', {
            nombre: nombre,
            apellido: apellido,
            grupo:7
          })
          .then(function (response) {

                if(response.status==200)
                {
                    alert("Registro correcto")
                    getPersonas()

                }else{
                    alert("Error al guardar")
                }
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }



      const columns = [
        {
         name: "Name",
         field: "name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "Apellido",
         field: "apellido",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
         name: "Id",
         field: "id",
         options: {
          filter: true,
          sort: false,
         }
        },
       ];
        
       const data = [
           
       ];
      
       for (var persona of personas){
          console.log(persona)
           data.push({name: persona.nombre, apellido: persona.apellido, id: persona._id})  
        }
        
        const handleRowClick = (rowData, rowMeta) => {
          console.log(rowData.apellido);
          
          var caca = "hola";
          document.getElementById("nombre").innerHTML = caca;
          console.log(document.getElementById("nombre"))
          };

       const options = {
        filterType: 'checkbox',
        onlyOneRowCanBeSelected:true,
        onRowClick: handleRowClick
       };

       
       
    return (
        <Fragment>
            <h1>Formulario</h1>
            <div>
                <div>
                    <input type="text" id="nombre" placeholder="Nombre" name="nombre" onChange={handleInputChangeNombre} value={nombre} ></input>
                </div>

                <div>
                    <input type="text" placeholder="Apellido" name="apellido" onChange={handleInputChangeApellido} value={apellido}></input>
                </div>
                <button onClick={enviarDatos}>Enviar</button>


                <div className="users">
                    {personas.map((persona) => (
                 
                          <li>{persona.nombre} {persona.apellido}</li>
                    ))}
                </div>

            </div>
            <MaterialDatatable
              title={"Personas"}
              data={data}
              columns={columns}
              options={options}
            />

        </Fragment>

    )
}
export default App
