const {peoples} = require('./peoples');
const os = require('os');
const fs = require('fs');
const fsExtra = require('fs-extra')


//console.log(os.platform());

//Create Directory
if(!fs.existsSync('./logs')){
    fs.mkdir('./logs', (err) => {
        if(err){
            console.log(err);
        }
        console.log('Directory has been created');
    });
}else{

    fsExtra.emptyDirSync('./logs')

    // fs.unlink('./logs/*.*', (err) => {
    //     if(err){
    //         console.log(err);
    //     }

    //     console.log('files deleted');
    // });

    fs.rmdir('./logs', (err) =>{

        if(err){
            console.log(err);
        }

       
        console.log('Directory has been deleted');

    })
}


//Write File
fs.writeFile('./logs/logs.txt','Hello World', () => {
    console.log('file has been written');
});

//Read File
fs.readFile('./logs/logs.txt',(err, data) => {
    if(err){
        console.log(err);

    }else{
        console.log(data.toString());
    }
});

//console.log(os.platform());