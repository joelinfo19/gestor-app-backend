require('dotenv').config();

const express=require('express');
const cors=require('cors');
var multer      = require('multer');
var path        = require('path');
var matricula =require('./models/matricula')
var excelToJson = require('convert-excel-to-json');
var bodyParser  = require('body-parser');
const fs=require('fs')
const {dbConnection}=require('./database/config');
// const routeCursos = require('./routes/cursos');

const pupeteer= require('puppeteer');

//Crear el servidor de express
const app=express();




//Configurar cors
app.use(cors())
app.use(express.json())
// app.use(routeCursos)
//Conexion a la base de datos
dbConnection();


// const webscrap=async ()=>{
//     const browser= await pupeteer.launch({headless:false});
//     const page = await browser.newPage();
//     await page.goto('http://ccomputo.unsaac.edu.pe/index.php?op=alcurso')
//     await page.type('#curso','IF651BIN')
//     await page.click('#Consultar')
//     await page.waitForSelector('.zpGridTypeInt')
//     const enlaces = await page.evaluate(()=>{
//         const elements=document.querySelectorAll('[bgcolor] td')
//         const links=[]
//
//         for (let element of elements ){
//             const tmp={}
//             tmp.title=element.innerHTML
//             console.log(element)
//             links.push(tmp)
//         }
//
//         return links;
//     })
//     // const books=[];
//     // for(let enlace of enlaces){
//     //     const book=await page.evaluate(()=>{
//     //         const tmp={}
//     //         tmp.title=document.querySelector('[bgcolor] td').innerHTML
//     //         return tmp
//     //     })
//     //     books.push(book)
//     // }
//
//     // console.log(books)
//     console.log(enlaces)
//     // await page.waitFor(3000)
//     // await page.screenshot({path:'centro.jpg'})
//
//     await browser.close()
// }
// webscrap()



app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'))

const routes_docente = require('./routes/docente');

app.use('/api/docentes', routes_docente);





//joel
app.use('/api/cursos',require('./routes/cursos'))
app.use('/api/matriculas',require('./routes/matricula'));
app.use('/api/login',require('./routes/auth'));
app.use('/api/upload',require('./routes/uploads'))

// const storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'./uploads');
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
//     }
// });
// const uploads = multer({storage:storage});
// app.post('/uploadfile', uploads.single("uploadfile"), (req, res) =>{
//     importExcelData2MongoDB(__dirname + '/uploads/' + req.file.filename);
//     res.json({
//         'msg': 'File uploaded/import successfully!', 'file': req.file
//     });
// });
// // Import Excel File to MongoDB database
// function importExcelData2MongoDB(filePath){
// // -> Read Excel File to Json Data
//     console.log(filePath)
//     const excelData = excelToJson({
//         sourceFile: filePath,
//         sheets:[{
// // Excel Sheet Name
//             name: 'Matricula',
// // Header Row -> be skipped and will not be present at our result object.
//             header:{
//                 rows: 1
//             },
// // Mapping columns to keys
//             columnToKey: {
//                 A: 'usuario',
//                 B: 'curso'
//             }
//         }]
//     });
// // -> Log Excel Data to Console
//     console.log(excelData);
//     /**
//      {
// Customers:
// [
// { _id: 1, name: 'Jack Smith', address: 'Massachusetts', age: 23 },
// { _id: 2, name: 'Adam Johnson', address: 'New York', age: 27 },
// { _id: 3, name: 'Katherin Carter', address: 'Washington DC', age: 26 },
// { _id: 4, name: 'Jack London', address: 'Nevada', age: 33 },
// { _id: 5, name: 'Jason Bourne', address: 'California', age: 36 }
// ]
// }
//      */
// // Insert Json-Object to MongoDB
//     matricula.insertMany(excelData.Matricula,(err,res)=>{
//         if(err){
//             console.log(err);
//         }else{
//             console.log(res);
//         }
//     });
//     fs.unlinkSync(filePath);
// }

app.listen(process.env.PORT,()=>{
    console.log('Server run' + process.env.PORT);
})

console.log("holaaaaaaaaa");
