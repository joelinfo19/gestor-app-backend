
const menuFront=(role=false)=>{
    const menu=[
        {
            titulo:'Dashboard',
            submenu:[
                {titulo:'Main',url:'/'}
            ]    

        },
        {
            titulo:'Data',
            submenu:[
              
                {titulo:'Cursos',url:'cursos'},
               
            ]
        }
        







    ]
    if(role===true){
        menu[1].submenu.unshift(  {titulo:'Docentes',url:'docentes'}, {titulo:'Matriculas',url:'matriculas'})
    }
    return menu



}
module.exports={
    menuFront
}





