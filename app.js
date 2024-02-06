'use strict';
document.addEventListener('DOMContentLoaded', ()=>{

    //initialisation de la to do list
    let newTask;
    const button = document.querySelector('.button');
    const TO_DO_LIST = "to-do-list";
    const error = document.getElementById('error');
    // const input = document.querySelectorAll('input');

    if(localStorage.getItem(TO_DO_LIST) == null){
        newTask = []
    }else{
        newTask = loadFromLocalStorage(TO_DO_LIST)
    }

    function loadFromLocalStorage(name) {
        return JSON.parse(localStorage.getItem(name))//parse pour convertir les chaone de charactere 
    }

    /**
     * sauvegarde de la liste dans le localStorage
     * @param {string} name 
     * @param {array} data 
     */

    function saveToLocalStorage(name, data){
        //convertion de l'objet en chaine, pour que le format soit lisible par le JSON
        localStorage.setItem(name, JSON.stringify(data))
    }

    //création d'une tache dans le tableau
    function createTask(task){
        // let increment;
        if(task == ''){
            error.style.display='block';
        }else{
            newTask.push({
                task: task,
                taskChek: false,
            })
        }
    }

    function getFormFieldValue(selector){
        let input;
        input = document.querySelector(selector);
        return input.value
    }

    //cliquer et save la tache
    function clickAndSaveTask() {
        let task = getFormFieldValue('#task');
        task = task.trim();
        error.style.display='none';

        createTask(task);
        saveToLocalStorage(TO_DO_LIST, newTask);
        refresh();
    }
    refresh();

    
    //fonction de rafraichissement qui récupère les élément
    function refresh() {
        const ul =document.getElementsByTagName('ul')[0];
        // const li = document.createElement('li');
        ul.innerHTML = null;
        // div.classList.add('divOfTask');
        // ul.appendChild(li);
        console.log(newTask);
        let newTaskLg = newTask.length

        let table = JSON.parse(localStorage.getItem(TO_DO_LIST))//parse pour convertir les chaone de charactere 
        for(let i=0; i<newTaskLg;i++){
            if(table[i].taskChek){
                ul.innerHTML +=
                `<li><input type='checkbox' checked class='checkbox' data-check='${i}'><p class='text' style="text-decoration: line-through;cotylor:gray;">${newTask[i].task} </p><i class="fa-solid fa-trash-can"></i></li>`;
            }else{
                ul.innerHTML +=
                `<li><input type='checkbox' class='checkbox' data-check='${i}'><p class='text'>${newTask[i].task} </p><i class="fa-solid fa-trash-can"></i></li>`;
            }
        }
        underline();
    }

    /**
     * fonction qui permet de rayé
     */
    function underline(){
        let checkbox = document.querySelectorAll('.checkbox');
        let text = document.querySelectorAll('.text');
        const taskForm = 'nouvelle tache';

        let checkboxLg = checkbox.length;

        for(let i=0;i<checkboxLg;i++){

            checkbox[i].addEventListener('click', ()=>{

                if(checkbox[i].checked){
                    text[i].style.textDecoration='line-through';
                    text[i].style.color='gray';
                    editTask(i,text[i].textContent,true)
                }else{
                    editTask(i,text[i].textContent,false)
                    text[i].style.textDecoration='none';
                    text[i].style.color='black';
                }
                saveToLocalStorage(TO_DO_LIST, newTask)//on sauvegarde le fait que ça soit rayé
            })
        }
    }

    function editTask(index,task,taskChek){
        let editTask = {
            task: task,
            taskChek: taskChek
        }
        //j'identifie les données à remplacer (index) et je les remplace par les nouvelles données (editContact)
        newTask.splice(index,1,editTask)
        //contact.splice(indiceARemplacer,aPartirDeLindiceNumero..,modification) !! <-- utilisation d'un splice
    }

    const poubelle = document.getElementsByTagName('i')
    /**
     * fonction qui permet de supprimer une tache
     */
    function deleteTask(){
        //récupèration du bouton delete
        let table = JSON.parse(localStorage.getItem(TO_DO_LIST))//parse pour convertir les chaone de charactere 

        let tableLg = table.length;
        for(let i=0;i<tableLg;i++){

            poubelle[i].addEventListener('click', ()=>{
                // location.reload()//recharger la recharger la page
                // console.log('ohink')
                // poubelle[i].style.background='red';
                console.log(table[i])
                // localStorage.removeItem(JSON.stringify(table[i]));
                table.splice(i,1);
                saveToLocalStorage(TO_DO_LIST, table)
                location.reload();
                // refresh();
            })
        }
        
    }
    // deleteTask()
    const ul = document.getElementsByTagName('ul')[0];
    // const iElement = document.getElementsByTagName['i']
    ul.addEventListener('mouseover', ()=>{
        deleteTask()
    })
    button.addEventListener('click', (e)=>{
        e.preventDefault();
    })
    
    button.addEventListener('click', clickAndSaveTask)
    // button.addEventListener('click', deleteTask)
    
    // input.addEventListener('mouseover', ()=>{
        //     // i.style.display='block';
        // })
        
        // localStorage.clear();
    })
