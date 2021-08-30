   
 
    let form = document.querySelector('#form')
    let notes = document.querySelector('#container-notes')

    var array = []

    eventListeners()

    function eventListeners(){
        form.addEventListener('submit',addNote)

        document.addEventListener('DOMContentLoaded',()=>{
            array = JSON.parse(localStorage.getItem('array')) || []

            crearHTML()
        })
    }




    function addNote(e){
        e.preventDefault()
        const note = document.querySelector('#note').value

        if(note === ''){
            mostrarError('No puede ir vacio')
            return
        }
            
        const noteObj = {
            id:Date.now(),
            note
        }

        array = [...array,noteObj]
        
        crearHTML()
        form.reset()
        
    }

    function mostrarError(error){
        const mensajeError = document.createElement('p')
        mensajeError.textContent = error
        mensajeError.classList.add('error')

        const contenido = document.querySelector('.contenedor-list')
        contenido.appendChild(mensajeError)

        setTimeout(() => {
            mensajeError.remove()
        }, 1000);
        
    }

        
    function crearHTML(){
        limpiarHTML()

        if(array.length>0){
            array.forEach(note =>{
                const btnEliminar = document.createElement('a')
                btnEliminar.classList.add('eliminar')
                btnEliminar.innerHTML = '<i class="fas fa-trash-alt"></i>'

                btnEliminar.onclick = () =>{
                    borrarNota(note.id)
                }

                const li = document.createElement('li')
                li.innerText = note.note
                li.appendChild(btnEliminar)
                notes.appendChild(li)
            })
        }

        sincronizarStorage()
    }

    function sincronizarStorage(){
        localStorage.setItem('array',JSON.stringify(array))
    }

    function borrarNota(id){
       array = array.filter(nota =>nota.id !== id)
       
       crearHTML()
    }

    function limpiarHTML(){
        while(notes.firstChild){
            notes.removeChild(notes.firstChild)
        }
    }

        /* enviar.addEventListener('click',addNotes);
    
         function addNotes(e){
            e.preventDefault()
            if(note.value === ''){
                alert('No has ingresado nada ')
            }else{
            array = [...array,note.value]
          
            form.reset()
            addHtml()
           
            del.addEventListener('click',removeNotes)
            }
            return
         }

         function addHtml(){
            let list = document.createElement('li')
             del = document.createElement('a')
            del.className = 'eliminar'
            del.innerHTML = '<i class="fas fa-trash-alt"></i>'
            for(let i=0;i<array.length;i++){
                list.innerText = array[i]
            }

                notes.appendChild(list) 
                list.appendChild(del)
               
        }

        function removeNotes(e){
            let gaa = e.target.parentElement.parentElement
            gaa.classList.add('remove')
            return
        }
 */


