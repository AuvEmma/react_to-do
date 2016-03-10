const express     = require('express');
const tasks       = express.Router();
var bodyParser = require('body-parser');
var db = require('./../db/pg');


var myTasks = {taskA:{
      name   : 'Jason',
      completed : true,
      desc   : "blurgTest"
      }
  };
// /tasks
tasks.route('/')
  .get( db.allTasks, (req,res)=>res.json(res.rows) )
  .post( db.newTask, (req,res)=>res.json(res.rows) )

// /tasks/task-12345/time
tasks.route('/:taskid/time')
  .put( (req,res)=>{
    //update a task's time if exists, if not do nothing
  })

// /tasks/task-12345/
tasks.route('/:taskid')
  .put(db.updateSingleTask, (req,res)=>res.json(res.rows) )
  .delete( db.deleteSingleTask, (req,res)=>res.json(res.rows) )
module.exports = tasks;
