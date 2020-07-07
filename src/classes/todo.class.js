export  class Todo {

    //AL recuperar de localStorage se recuperan atributos pero no metodos
    //hacemos desestructuracion de objetos para obtener id, tarea, completado, creado

    //de este modo definimos la instancia y recuperamos los metodos de Todo imprimirClase() por ejemplo
   static fromJson({id, tarea, completado, creado, prioridad}){
       const tempTodo = new Todo(tarea, prioridad);

       tempTodo.id = id;
       tempTodo.completado = completado;
        tempTodo.creado = creado;
        tempTodo.prioridad = prioridad;

       return tempTodo;
   }


    constructor(tarea, prioridad) {
           this.tarea = tarea;

           this.id = new Date().getTime(); //1286871
           this.completado = false;
           this.creado = new Date();
           this.prioridad =prioridad;
    }

    imprimirClase(){

    }
}