//Database Specification
Database Name : test2
host: localhost
user: root
password: ''

Table:Bill info table
Col1      Col2         Col3         Col4       Col5
Bill_Id   Bill_Name    Bill_From    Bill_To    Contact
(var:20)  (var:25)     (var:255)    (var:255)  (var:30)

Table: BillXXX   table(Here XXX = Bill_Id)
Col1      Col2         Col3          Col4      Col5
P_Id      P_Name       P_Quantity    P_Price   Total
(var:20)  (var:25)     int(11)       int(11)   int(11)


//API defination 
in /routes/index.js

Insert bill information url : /invoice/insertBillInfo
Parameter : bid      //bill id
            bname    //bill name
            bfrom    //bill from
            bto      //bill to
            cn       //contact

Create bill table url : '/invoice/createbill'
Parameter : bid      //bill id

Insert product information into bill url : '/invoice/insertBillData'
Parameter : bid      //bill id
            pid      //product id
            pname    //product name
            pquan    //product from
            pprice   //product to

Get bill information url : '/invoice/getBillInfo'
Parameter : bid      //bill id

Get bill table details url : '/invoice/getBillData'
Parameter : bid      //bill id

Update product information url: '/invoice/updateSingleProductData'
Parameter : bid      //bill id
            pid      //product id
            pname    //product name
            pquan    //product from
            pprice   //product to

Delete product information url: '/invoice/deleteProductData'
Parameter : bid      //bill id
            pid      //product id

//frontend files is
in /frontend/src/ 
App.css
App.js
BillEntry.js   // Insert bill information and show bill in modal box
BillEntry.css
dataentry.js   // Item header and dynamically created itemlist from itementry.js
dataentry.css
itementry.js   // Insert,update,delete product from a specified bill table 
itementry.css
              