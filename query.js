const Pool = require('pg').Pool
// const pool = new Pool({
//     user:'postgres',
//     host:'localhost',
//     database:'pgwms',
//     password:'root',
//     port:5432,
// });
const pool = new Pool({
    user:'dmghwioxfhwtnb',
    host:'ec2-107-22-241-205.compute-1.amazonaws.com',
    database:'d20i6fsba4odab',
    password:'d07d997b3419fea7b98c91e6ae1ba92fae3732f70ff894292cd0650c1e17be62',
    port:5432,
});
const createpeon = (req,res) => {
    const {firstname, lastname, mobilenumber, emailid} = req.body;
    pool.query('insert into peon(firstname,lastname,mobilenumber,emailid) values ($1,$2,$3,$4)',
    [firstname,lastname,mobilenumber,emailid], (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(201).send(`User Added... With ID : ${result.pid}`);
    });
}
const getpeon = (req,res) => {
    pool.query('select * from peon order by pid asc', (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
    })
}
const getpeonById = (req,res) => {
    const pid = parseInt(req.params.pid);
    pool.query('select * from peon where pid = $1',[pid], (error,result) => {
        if(error)
        {
            throw error;
            
        }
        res.status(200).json(result.rows);
        console.log(result.rows)
    })
}
const updatepeon = (req,res) => {
    const pid = parseInt(req.body.pid);
    const {firstname,lastname,mobilenumber,emailid} = req.body;
    pool.query('update peon set firstname = $1,lastname=$2,mobilenumber=$3,emailid=$4 where pid=$5',
    [firstname,lastname,mobilenumber,emailid,pid],
    (error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Updated by Id:-${pid}`)
    })
}
const deletepeon = (req,res) => {
    const pid = parseInt(req.params.pid);
    pool.query('delete from peon where pid=$1', [pid],(error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Deleted by Id:-${pid}`);
    });
}

const createfaculty = (req,res) => {
    const {firstname, lastname, mobilenumber, emailid} = req.body;
    pool.query('insert into faculty(firstname,lastname,mobilenumber,emailid) values ($1,$2,$3,$4)',
    [firstname,lastname,mobilenumber,emailid], (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(201).send(`User Added... With ID : ${result.fid}`);
    });
}
const getfaculty = (req,res) => {
    pool.query('select * from faculty order by fid asc', (error,result) => {
        console.log("result ="+result);
        console.log("Error ="+error);
        // if(error)
        // {
        //     throw error;
        // }
        
        res.status(200).json(result.rows);
    })
}
const getfacultyById = (req,res) => {
    const fid = parseInt(req.params.fid);
    pool.query('select * from faculty where fid = $1',[fid], (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
        console.log(result.rows)
    })
}
const updatefaculty = (req,res) => {
    const fid = parseInt(req.body.fid);
    const {firstname,lastname,mobilenumber,emailid} = req.body;
    pool.query('update faculty set firstname = $1,lastname=$2,mobilenumber=$3,emailid=$4 where fid=$5',
    [firstname,lastname,mobilenumber,emailid,fid],
    (error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Updated by Id:-${fid}`)
    })
}
const deletefaculty = (req,res) => {
    const fid = parseInt(req.params.fid);
    pool.query('delete from faculty where fid=$1', [fid],(error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Deleted by Id:-${fid}`);
    });
}

const createtask = (req,res) => {
    const {task, status} = req.body;
    pool.query('insert into task(task,status) values ($1,$2)',
    [task,status], (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(201).send(`User Added... With ID : ${result.tid}`);
    });
}
const gettask = (req,res) => {
    pool.query('select * from task order by tid asc', (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
    })
}
const gettaskById = (req,res) => {
    const tid = parseInt(req.params.tid);
    pool.query('select * from task where tid = $1',[tid], (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).json(result.rows);
        console.log(result.rows)
    })
}
const updatetask = (req,res) => {
    const tid = parseInt(req.body.tid);
    const {task,status} = req.body;
    pool.query('update task set task = $1,status=$2 where tid=$3',
    [task,status,tid],
    (error,result)=> {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Updated by Id:-${tid}`)
    })
}
const deletetask = (req,res) => {
    const tid = parseInt(req.params.tid);
    pool.query('delete from task where tid=$1', [tid],(error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(200).send(`User Deleted by Id:-${tid}`);
    });
}

const creatework = (req,res) => {
    const {peon_id, faculty_id, task_id} = req.body;
    pool.query('insert into peon_work(peon_id, faculty_id, task_id) values ($1,$2,$3)',
    [peon_id, faculty_id, task_id], (error,result) => {
        if(error)
        {
            throw error;
        }
        res.status(201).send(`User Added... With ID : ${result.work_id}`);
    });
}

const getwork = (req,res) => {
    pool.query('select p.firstname pn,f.firstname fn,t.task ts from peon p join peon_work w on(p.pid=w.peon_id) join faculty f on(f.fid=w.faculty_id) join task t on(t.tid=w.task_id)', (error,result) => {
    if(error)
    {
        throw error;
    }
    res.status(200).json(result.rows);
});
}

const getlogin = (req,res) => {
    const{firstname,mobilenumber} = req.body;
    console.log(req.body);
    pool.query('select firstname,mobilenumber from faculty where firstname=$1 AND mobilenumber=$2', [firstname,mobilenumber], (error,result) => {
        if(error)
        {
            console.log(error)
        }
        res.send({ status:201, msg: "Login success", data: result.rows});
        console.log(result.rows);
    })

}
module.exports = {
    createpeon,
    getpeon,
    getpeonById,
    updatepeon,
    deletepeon,

    createfaculty,
    getfaculty,
    getfacultyById,
    updatefaculty,
    deletefaculty,
    deletetask,

    createtask,
    gettask,
    gettaskById,
    updatetask,

    creatework,
    getwork,
    getlogin
  
}