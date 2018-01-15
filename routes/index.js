var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wasim to express' });
});

module.exports = router;


//Insert into bill_info
router.post('/invoice/insertBillInfo', function(req,res,next){
    try{
	var bid = req.param('bid');//bill id
	var bname = req.param('bname');//bill name
	var bfrom = req.param('bfrom');//bill from
	var bto = req.param('bto');//bill to
	var cn = req.param('cn');//contact

    req.getConnection(function(err, conn){
        if(err){
           console.error('SQL Connection error: ', err);
           return next(err);
       }
       else{
           var insertSql = "INSERT INTO bill_info SET ?";
           var insertValues = {
            "Bill_Id" : bid,
            "Bill_Name" : bname,
            "Bill_From" : bfrom,
            "Bill_To" : bto,
            "Contact" : cn
        };
        var query = conn.query(insertSql, insertValues, function (err, result){
            if(err){
                console.error('Error : ',err);
                return next(err);
            }
            console.log('Bill Id = '+bid);
            return bid;
        });
    }
});
}
catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
}
});

//Create billtable
router.post('/invoice/createbill', function(req,res,next){
    try{
       var bid = req.param('bid');
       var tablename = "bill"+bid;

       req.getConnection(function(err, conn){
        if(err){
            console.error('SQL Connection error: ', err);
            return next(err);
        }
        else{
            var insertSql = "CREATE TABLE "+tablename+"(P_Id varchar(20) PRIMARY KEY,P_Name varchar(25),P_Quantity int,P_Price int,Total int)";
            var query = conn.query(insertSql,function (err, result){
                if(err){
                    console.error('Error : '+err);
                    return next(err);
                }
                console.log('Bill Id = '+bid);
            });
        }
    });
   }
   catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
}
});


//Insert into billdata_info
router.post('/invoice/insertBillData', function(req,res,next){
    try{
       var bid = req.param('bid');
       var pid = req.param('pid');
       var pname = req.param('pname');
       var pquan = req.param('pquan');
       var pprice= req.param('pprice');
       var total = pquan*pprice;
       var tablename = "bill"+bid;

       req.getConnection(function(err, conn){
        if(err){
            console.error('SQL Connection error: ', err);
            return next(err);
        }
        else{
            var insertSql = "INSERT INTO "+tablename+" SET ?";
            var insertValues = {
                "P_Id" : pid,
                "P_Name" : pname,
                "P_Quantity" : pquan,
                "P_Price" : pprice,
                "Total" : total
            };
            var query = conn.query(insertSql, insertValues, function (err, result){
                if(err){
                    console.error('Error : '+err);
                    return next(err);
                }
                console.log('Bill Id = '+bid);
            });
        }
    });
   }
   catch(ex){
    console.error("Internal error:"+ex);
    return next(ex);
}
});

//get bill_info
router.get('/invoice/getBillInfo', function(req, res, next) {
    try {
    	var bid = req.param('bid');
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
            	var insertSql = "SELECT * FROM bill_info WHERE Bill_Id='"+bid+"'";
                conn.query(insertSql,function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex ];
                        resEmp .push(empObj);
                    }
                    res.json(resEmp);
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//get bill_data
router.get('/invoice/getBillData', function(req, res, next) {
    try {
    	var bid = req.param('bid');
        var tablename = "bill"+bid;
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
            	var insertSql = "SELECT * FROM "+tablename;
                conn.query(insertSql,function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex ];
                        resEmp .push(empObj);
                    }
                    res.json(resEmp);
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//get single product data
router.get('/invoice/getSingleProductData', function(req, res, next) {
    try {
    	var bid = req.param('bid');
    	var pid = req.param('pid');
        var tablename = "bill"+bid;
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
            	var insertSql = "SELECT P_Name,P_Quantity,P_Price FROM "+tablename+" WHERE P_Id ='"+pid+"'";
                conn.query(insertSql,function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex ];
                        resEmp .push(empObj);
                    }
                    res.json(resEmp);
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//update single product data
router.post('/invoice/updateSingleProductData', function(req, res, next) {
    try {
    	var pid = req.param('pid');
    	var bid = req.param('bid');
    	var pname = req.param('pname');
    	var pquan = req.param('pquan');
    	var pprice = req.param('pprice');
    	var total = pquan*pprice;
        var tablename = "bill"+bid;
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
            	var insertSql = "UPDATE "+tablename+" SET P_Name='"+pname+"',P_Quantity="+pquan+",P_Price="+pprice+",Total="+total+" WHERE P_Id='"+pid+"'";
                conn.query(insertSql,function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex ];
                        resEmp .push(empObj);
                    }
                    res.json(resEmp);
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//delete single product data
router.post('/invoice/deleteProductData', function(req, res, next) {
    try {
        var pid = req.param('pid');
        var bid = req.param('bid');
        var tablename = "bill"+bid;
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                var insertSql = "DELETE FROM "+tablename+" WHERE P_Id='"+pid+"'";
                conn.query(insertSql,function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex ];
                        resEmp .push(empObj);
                    }
                    res.json(resEmp);
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});

//Get total price of a bill
router.get('/invoice/getTotalAmount', function(req, res, next) {
    try {
        var bid = req.param('bid');
        var tablename = "bill"+bid;
        req.getConnection(function(err, conn) {
            if (err) {
                console.error('SQL Connection error: ', err);
                return next(err);
            } else {
                var insertSql = "SELECT sum(Total) as Total  FROM "+tablename;
                conn.query(insertSql,function(err, rows, fields) {
                    if (err) {
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    var resEmp = [];
                    for (var empIndex in rows) {
                        var empObj = rows[empIndex ];
                        resEmp .push(empObj);
                    }
                    res.json(resEmp);
                });
            }
        });
    } catch (ex) {
        console.error("Internal error:" + ex);
        return next(ex);
    }
});
