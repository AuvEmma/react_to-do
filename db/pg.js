var pg = require('pg');
var connectionString = process.env.DB_URL;

function allTasks(req, res, next) {
    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }

      var query = client.query("SELECT * FROM tasks;", function(err, results) {
        done()
        if (err) {
          return console.error('error running query', err)
        }
          res.rows = results.rows;
          next()
      })
    })
}

function newTask (req, res, next) {
  console.log(req.body);
    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }

      var query = client.query("INSERT INTO tasks (task_name, task_desc, completed) VALUES ($1,$2,$3) returning taskid;", [req.body.task_name, req.body.task_desc, req.body.completed], function(err, results) {
        done()
        if (err) {
          return console.error('error running query', err)
        }
          res.rows = results.rows;
          next()
      })
    })
}

function updateTaskTime(req, res, next) {
  pg.connect(connectionString, function(err, client, done) {
    if (err) {
      done()
      console.log(err)
      return res.status(500).json({success: false, data: err})
    }

    var query = client.query("UPDATE tasks set task_time_start=$1, task_time_end=$2 where taskid = $3 returning taskid;", [req.body.start_time, req.body_end_time, req.params.taskid], function(err, results) {
      done()
      if (err) {
        return console.error('error running query', err)
      }
        res.rows = results.rows;
        next()
    })
  })

}

function updateSingleTask (req, res, next) {
    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }

      var query = client.query("UPDATE tasks set completed = not completed where taskid = $1 returning taskid;", [req.params.taskid], function(err, results) {
        done()
        if (err) {
          return console.error('error running query', err)
        }
          res.rows = results.rows;
          next()
      })
    })
}

function deleteSingleTask (req, res, next) {
    pg.connect(connectionString, function(err, client, done) {
      if (err) {
        done()
        console.log(err)
        return res.status(500).json({success: false, data: err})
      }

      var query = client.query("delete from tasks where taskid = $1 returning taskid;", [req.params.taskid], function(err, results) {
        done()
        if (err) {
          return console.error('error running query', err)
        }
        res.rows = results.rows;
          next()
      })
    })
}

module.exports.allTasks = allTasks;
module.exports.newTask = newTask;
module.exports.updateTaskTime = updateTaskTime;
module.exports.updateSingleTask = updateSingleTask;
module.exports.deleteSingleTask = deleteSingleTask;
