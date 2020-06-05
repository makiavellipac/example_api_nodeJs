const http=require('http');
const {bodyParser}=require('./lib/bodyParser');

let database=[];

const getTaskHandler=(req,res)=>{
    res.writeHead(200,{'content-type':'application/json'});
    res.write(JSON.stringify(database));
    res.end();
}
const createTaskHandler=async(req,res)=>{
    try {
        await bodyParser(req);
        database.push(req.body);
        res.writeHead(200,{'content-type':'application/json'});
        res.write(JSON.stringify({message:'recibed',status:200}));
        res.end();    
    } catch (error) {
        res.writeHead(400,{'content-type':'application/json'});
        res.write(JSON.stringify({message:'error',status:400}));
        res.end();    
    }
    
}

const updateTaskHandler=async(req,res)=>{
    try {
        let {url}=req;
        let idQuery=url.split('?')[1];
        let idKey=idQuery.split('=')[0];
        let idValue=idQuery.split('=')[1];
        if(idKey==='id'){
            await bodyParser(req);
            database[idValue-1]=req.body;
            res.writeHead(200,{'content-type':'application/json'});
            res.write(JSON.stringify({message:'update',status:200}));
            res.end();
        }
        else{
            res.writeHead(200,{'content-type':'application/json'});
            res.write(JSON.stringify({message:'error',status:400}));
            res.end();
        }    
    } catch (error) {
        res.writeHead(200,{'content-type':'application/json'});
        res.write(JSON.stringify({message:'error',status:400}));
        res.end();
    } 
    
}

const deleteTaskHandler=async(req,res)=>{
    try {
        let {url}=req;
        let idQuery=url.split('?')[1];
        let idKey=idQuery.split('=')[0];
        let idValue=idQuery.split('=')[1];
        if(idKey==='id'){
            await bodyParser(req);
            database.splice(idValue-1,1);
            res.writeHead(200,{'content-type':'application/json'});
            res.write(JSON.stringify({message:'update',status:200}));
            res.end();
        }
        else{
            res.writeHead(200,{'content-type':'application/json'});
            res.write(JSON.stringify({message:'error',status:400}));
            res.end();
        }    
    } catch (error) {
        res.writeHead(200,{'content-type':'application/json'});
        res.write(JSON.stringify({message:'error',status:400}));
        res.end();
    } 
}
const server= http.createServer((req,res)=>{
    const {url,method}=req;
    //Logger
    console.log(`URL:${url} - Method:${method}`);
    switch(method){
        case 'GET':
            if(url==="/"){
                res.writeHead(200,{'content-type':'application/json'});
                res.write(JSON.stringify({message:'Hello World'}));
                res.end();
            }
            if(url==="/task"){
                getTaskHandler(req,res);
            }
            break;
        case 'POST':
            if(url==="/task"){
                createTaskHandler(req,res);
            }
            break;
        case 'PUT':
            updateTaskHandler(req,res);
            break;
        case 'DELETE':
            deleteTaskHandler(req,res);
            break;
        default:
            res.writeHead(200,{'content-type':'application/json'});
            res.write(JSON.stringify({message:'Not Found',status:400}));
            res.end();
    }

})

server.listen(3000);
console.log('server in port',3000);