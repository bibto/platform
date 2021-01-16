const express=require('express')
const mongo=require('mongodb').MongoClient;
const objectId=require('mongodb').ObjectId;
const jwt=require('jsonwebtoken')
const cors=require('cors')
const bodyparser=require('body-parser')

const router=express.Router()
const   url='mongodb://localhost:27017/';;
 router.use(bodyparser.json())
 router.use(cors())

function verifietoken(req,res,next)
{
    if (!req.headers.authorization){return res.status(401).send('Unauthorized request')}
    let token=req.headers.authorization.split(' ')[1]
    if (token==='null'){return res.status(401).send('Unauthorized request')}
    let payload=jwt.verify(token,'secretKey')
    if (!payload){return res.status(401).send('Unauthorized request')}
    req.userId=payload.subject
    console.log("+++++++++++++++++++++++++++++++++++++")
    console.log(" Response from < verificationtoken >The request is from =>  ",req.userId)
    console.log("+++++++++++++++++++++++++++++++++++++")
    next()
}
router.get('/',(req,res)=>{
    res.send("This replie is from the router") 
}) 
router.post('/register',function(req,res){
    let item=req.body;
    const client=new mongo(url,{ useUnifiedTopology: true })
    client.connect(function(err,client){
        console.log('register')
        let db=client.db('test')
        item.comment="No comment yet for this student"
        item.task="No task yet for this student"
        item.agentid="not"
        item.agentname="Not affected yet"
        item.status="not treated yet"
        
        let col=db.collection('students').insertOne(item,function(){
            client.close()
        })
    })
    res.send("registration done !")
})


router.post('/login',(req,res)=>{
    let item=req.body;
    const client=new mongo(url,{ useUnifiedTopology: true })
   client.connect(function(err,cl){
        let d=cl.db('test')
        let c=d.collection('users').findOne({login:item.login},function(err,user){ 
            if (err){console.log('+'+err);
        }else if (!user){res.status(401).send('invalid user');}
        else if(user.password !==item.password){
            res.status(401).send('invalid pass');
        }else{
            console.log(user)
            let payload={subject:user._id}
            let token=jwt.sign(payload,'secretKey')
            res.send({token});
            console.log("+++++++++++++++++++++++++++++++++++++")
            console.log("Response from < /login > logged agent token => ",token)
            console.log("+++++++++++++++++++++++++++++++++++++")
        }
        cl.close()
        console.log("...")
        })
        
    })
    
    })

router.post('/studentManager',verifietoken,(req,res)=>{
    filter=req.body
    console.log(filter)
    let {studentid,agentid,registrationdate,date_of_start,status}=filter
    //let filterarray=Array.of(studentid,agentid,registrationdate,date_of_start,status)
    let fobject={};
    console.log(" filter =>",fobject)
    let client=new mongo(url,{ useUnifiedTopology: true });
    let objId=new objectId(req.userId);
    client.connect(function(err,client){
        if(err){return 0}
        let db=client.db('test')
        let user=db.collection('users').findOne({"_id":objId},function(err,userDocument){
            if (err){console.log("error while fetching user credentials");return;}
            if (userDocument.role==="admin"){
                if (agentid.length>2){fobject["agentid"]=agentid;}
                if (date_of_start.length>2){fobject["date_of_start"]=date_of_start;}
                if (status.length>2){fobject["status"]=status;}
                db.collection('students').find(fobject).toArray((err,studentsDocuments)=>{
                    if (err){console.log("error while fetching students");return;}
                    console.log("+++++++++++++++++++++++++++++++++++++")
                    console.log("Response from < /studentManager >")
                    console.log("+++++++++++++++++++++++++++++++++++++")
                   console.log(studentsDocuments)
                    let studentsArray=studentsDocuments.map((student)=>{
                        student.registrationdate=objectId(student._id).getTimestamp().toISOString().split("T")
                        return student
                    })
                        if (registrationdate.length>2){
                            studentsArray=studentsArray.filter(item=>item.registrationdate[0]===registrationdate)
                        }
                       console.log(studentsArray)
                    res.status(200).send({studentsArray})
                    client.close();return;
                })
            }

        })
    })
})






router.get('/getusers',(req,res)=>{

    client=new mongo(url,{useUnifiedTopology:true})
    client.connect(function(err,client){
        if(err){console.log("error while connecting to mongo db");return;}
        client.db('test').collection('users').find().toArray(function(err,agentsDocuments){
            if(err){console.log("Error occur while fetching agents");return;}
            let agentsList=agentsDocuments.map(agent=>{return {"agentname":agent.login,"agentid":agent._id}})
            console.log(agentsList)
            res.status(200).send({agentsList})
            client.close()
        })
    })
})

router.get('/dashboardAcess',verifietoken,(req,res)=>{
    let client=new mongo(url,{ useUnifiedTopology: true })
    client.connect(function(err,client){
        let objId=new objectId(req.userId)
        if(err){console.log(err);return;}
      let db=client.db('test');
      let user=db.collection('users').findOne({"_id":objId},function(err,user){
          if (err){console.log(err);return;}
          console.log("+++++++++++++++++++++++++++++++++++++")
          console.log("Response from < /dashboardAcess > The logged agent is =>  ",user.login)
          console.log("+++++++++++++++++++++++++++++++++++++")
          res.status(200).send({userCredentials:{name:user.login,role:user.role}})
          client.close()
      })  

    })
})

router.get("/getstudent/:studentId",verifietoken,(req,res)=>{
    const studentId=req.params.studentId;
    const client=new mongo(url,{useUnifiedTopology:true})
    console.log(studentId)
    
    client.connect(function(err,client){
        let db=client.db('test');
        let objId=new objectId(studentId)
        console.log("time stamp",objId.getTimestamp().toISOString().split("T")[0])
        db.collection('students').findOne({"_id":objId},function(err,document){
            if (err){console.log(err);return;}
        db.collection('users').find().toArray((err,agentslist)=>{
            if (err){console.log(err);return;}
            //let userslist=agentslist.filter(agent=>agent.role==="user")
            let logeduser=agentslist.filter(agent=>agent._id==req.userId)
            let agents=[]
            if(logeduser[0].role==="admin"){
                for(agent of agentslist){
                    agents.push({"name":agent.login,"agentid":agent._id})
                }
                console.log("--* ",logeduser[0])
                res.status(200).send({document,agents})
                client.close();return; 
            }else if(logeduser[0].role=="user")
            console.log("**->",logeduser[0] )
                agents.push({"name":logeduser[0].login,"agentid":logeduser[0]._id})   
                res.status(200).send({document,agents})
            client.close();return;
            
        })
            console.log("+++++++++++++++++++++++++++++++++++++")
            console.log("Response from < /getstudent > the agent try to fetch this doc => ",document)
            console.log("+++++++++++++++++++++++++++++++++++++")
            
        })
    })
})

router.post('/updatestudent',verifietoken,function(req,res){
    const updatedstudent=req.body;
    const usobjId=new objectId(updatedstudent._id)
    const agentobjid=new objectId(req.userId)
    const client=new mongo(url,{useUnifiedTopology:true})
    client.connect(function(err,clien){
        if (err){console.log("error while connecting to mongo data base");return;}
        let db=client.db('test');
        db.collection("users").findOne({"_id":agentobjid},{projection:{role:1}},function(err,agentdocument){
            console.log("7778 ->",agentdocument)
                if(agentdocument.role=="admin"){
                    db.collection('students').findOneAndUpdate({_id:usobjId},{$set:{
                        "first_name": updatedstudent.first_name,
                        "last_name": updatedstudent.last_name,
                        "email": updatedstudent.email,
                        "phone_number": updatedstudent.phone_number,
                        "field": updatedstudent.field,
                        "date_of_start": updatedstudent.date_of_start,
                        "comment": updatedstudent.comment,
                        "task": updatedstudent.task,
                        "agentid":updatedstudent.agentid,
                        "agentname":updatedstudent.agentname,
                        "status":updatedstudent.status
                        }},function(err,updateddocument){
                            if(err){console.log("error eccur while updating the targeted student");return;}
                            if(updateddocument.ok==1){
                                res.status(200).send({updateddocument})
                                console.log("updated student");return;     
                        }
                            
                        })

                }else if(agentdocument.role=="user"){
                    db.collection('students').findOneAndUpdate({_id:usobjId},{$set:{
                        "first_name": updatedstudent.first_name,
                        "last_name": updatedstudent.last_name,
                        "comment": updatedstudent.comment,
                        "status":updatedstudent.status
                        }},function(err,updateddocument){
                            if(err){console.log("error eccur while updating the targeted student");return;}
                            if(updateddocument.ok==1){
                                res.status(200).send({updateddocument})
                                console.log("updated student");return;     
                        }
                            
                        })

                }


        })
        
    })
            console.log("+++++++++++++++++++++++++++++++++++++")
            console.log("Response from < /updatedstudent > the agent try to fetch this doc => ",updatedstudent)
            console.log("+++++++++++++++++++++++++++++++++++++")
})
router.post('/validationspace',verifietoken,(req,res)=>{
    let userId=req.userId
    let filter=req.body
    let fobject={}
    console.log(filter)
    let {registrationdate,date_of_start,status}=filter
    fobject["agentid"]=userId
    if (date_of_start.length>2){fobject["date_of_start"]=date_of_start;}
    if (status.length>2){fobject["status"]=status;}
    
        console.log(userId)
    const client=new mongo(url,{useUnifiedTopology:true})
    client.connect(function(err,client){
        if(err){console.log("Error while connecting to mongo database");return;}
        client.db('test').collection('students').find(fobject).toArray(function(err,studentsDocuments){
            if (err){console.log("Error while fetching students");return;}
            console.log(studentsDocuments);
            let studentsArray=studentsDocuments.map((student)=>{
                student.registrationdate=objectId(student._id).getTimestamp().toISOString().split("T")
                return student
            })
            if(registrationdate.length>2){
                studentsArray=studentsArray.filter(item=>item.registrationdate[0]==registrationdate)
            }
            res.status(200).send({studentsArray});
            client.close();
        })
    })
})

router.post('/adduser',verifietoken,(req,res)=>{
    loggedUserId=req.userId;
    agentToAdd=req.body;
    obj=new objectId(loggedUserId)  
    client=new mongo(url,{useUnifiedTopology:true})
    client.connect((err,client)=>{
        if (err){console.log("error occur while connection data base");return;}
        let db=client.db('test')
        db.collection('users').find().toArray(function(err,usersDocuments){
            if(err){console.log("error occur while fetching the user");return;}
            loggeduser=usersDocuments.filter(item=>item._id==loggedUserId)

            if (loggeduser[0].role=="admin"){
                if(usersDocuments.filter(item=>item.login==agentToAdd.login).length>0)
                {   
                    console.log("the user already exists in data base try to change the login");return;
                }
                else if(agentToAdd.password==agentToAdd.confirmpassword){

                        db.collection('users').insertOne({"login":agentToAdd.login,"password":agentToAdd.password,"role":"user"},
                        function(err,insertedAgent){
                            if(err){console.log("error occur while inserting the agent");return;}
                            console.log("this Agent is inserted seccessfully => ",insertedAgent.ops)
                            res.status(200)
                            client.close();return;
                        })   
                    }else{
                        console.log("password dont match");return;
                    }

                

                
            }else{
                console.log('not permitted access for the logged agent to this functionnality')
            }
        })
    })


})

module.exports=router