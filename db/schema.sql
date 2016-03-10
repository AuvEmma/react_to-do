drop table if exists tasks;

create table tasks(
  taskID serial primary key,
  task_name varchar(255),
  task_desc text,
  compeleted boolean,
  task_time_start timestamp,
  task_time_end timestamp
)
