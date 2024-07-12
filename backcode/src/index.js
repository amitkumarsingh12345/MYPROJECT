const bodyParser = require('body-parser');
const express = require('express');
const app = new express();
app.use(bodyParser.json())
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtkey = "Divya";
app.use(cors());
const testmodel = require('./User/user');
const admin = require('./Admin/admin');
const product = require('./Admin/product');
const category = require('./Admin/category');
const order = require('./Admin/order');
const multer = require('multer');
const { unlink } = require('fs').promises;

// ------------------DELETE FILE-----------------------

const deleteFile = async filePath => {
    await unlink(filePath);
}

// ------------------DELETE PRODUCTS WHEN DELETE CATEGOTY-----------------------

const deleteProductHandler = async (props) => {
    try {
        await product.deleteMany({ category: props });
    } catch (error) {
        res.status(401).send(error);
    }
}

// ------------------USER SIGNUP API-----------------------

app.post('/user', async (req, res) => {
    await new testmodel(req.body).save().
      then( () => res.status(200).send({"Massage": "Data Saved!!"})).
        catch( (err) => res.status(401).send(err))
});

// ------------------USER LOGIN API-----------------------

app.post('/userlogin', async (req, res) => {
    const data = await testmodel.findOne({
        password: req.body.password,
        email: req.body.email
    });
    res.send(data);


    // jwt.sign({data}, jwtkey, {expiresIn:"2h"},(err,token)=>{
    //     if(err){
    //         res.send("Something went wrong")  
    //     }
    //     res.send({data,auth:token})
    // })



});

// ------------------USER SEARCH API-----------------------

app.get('/user/:key', async (req, res) => {
    await testmodel.findOne({email: req.params.key}).
      then( (data) => res.status(200).send(data)).
        catch( (err) => res.status(401).send(err))
})


// ------------------USER DELETE API-----------------------

app.delete('/user/:id', async (req, res) => {
    const data = await testmodel.deleteOne({ _id: req.params.id })
    data.deletedCount == 1 ? res.send({ "Massage": "Data Deleted!!" }) :
        res.send({ "Massage": "Data Not Found!!" });
});

// ------------------USER UPDATE API-----------------------

app.put('/user', async (req, res) => {
    const data = await testmodel.updateOne(
        { email: req.body.email },
        {
            $set: { password: req.body.password }
        }
    )
    data.modifiedCount == 1 ? res.send({ "Massage": "Data Modified!!" }) :
        res.send({ "Massage": "Data Not Found!!" });
});


// ----------------------------------ADMIN SIGNUP API------------------------------------

app.post('/admin', async (req, res) => {
    await new admin(req.body).save().
        then(() => res.status(200).send({ "Massage": "Data Saved!!" })).
        catch((error) => res.status(400).send(error));
});

// ----------------------------------ADMIN UPDATE API------------------------------------

app.put('/admin', async (req, res) => {
    console.log(req.body.password)
    const data = await admin.updateOne(
        { name: req.body.name },
        {
            $set: { password: req.body.password }
        }
    )
    data.modifiedCount == 1 ? res.send({ "Massage": "Data Modified!!" }) :
        res.send({ "Massage": "Data Not Found!!" });
});

// ------------------ADMIN LOGIN API-----------------------

app.post('/adminlogin', async (req, res) => {
    const data = await admin.findOne({
        name: req.body.name,
        password: req.body.password
    });
    res.send(data);
});

// ---------------------------------PRODUCT POST API--------------------------------------------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../MYPROJECT/frontcode/public/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file?.originalname)
    }
})

const upload = multer({ storage: storage })

app.post('/product', upload.single('image'), async (req, res) => {
    await new product({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        image: req.file?.originalname,
        qty: req.body.qty,
        discription: req.body.discription,
    }).save().then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
});

// ------------------PRODUCT GET API-----------------------

app.get('/product', async (req, res) => {
    await category.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "name",
                foreignField: "category",
                as: "showdata"
            }
        },
        {
            $project: {
                _id: 0,
                showdata: 1
            }
        }
    ]).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
});

// ------------------PRODUCT SEARCH API-----------------------

app.get('/product/:key', async (req, res) => {
    await product.find({ _id: req.params.key }).
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
});

// ------------------CART DELETE API-----------------------

app.delete('/product/:id', async (req, res) => {
    await product.findOne({ _id: req.params.id }, { _id: 0, image: 1 }).
        then((data) => deleteFile(`../../MYPROJECT/frontcode/public/${data.image}`)).
        catch((error) => console.log(""));

    await product.deleteOne({ _id: req.params.id }).
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
});

// ------------------PRODUCT UPDATE API-----------------------

app.put('/product/:id', upload.single('image'), async (req, res) => {
    await product.findOne({ _id: req.params.id }, { _id: 0, image: 1 }).
        then((data) => typeof (req.file?.originalname) == 'string' && req.file?.originalname != data.image ? deleteFile(`../../CART_MANAGEMENT_SYSTEM/testfront/public/${data.image}`) : "").
        catch((error) => console.log(""));
    await product.updateOne(
        { _id: req.params.id },
        {
            $set: ({
                name: req.body.name,
                price: req.body.price,
                category: req.body.category,
                image: req.file?.originalname,
                qty: req.body.qty,
                discription: req.body.discription
            })
        }
    ).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
});


// --------------------------------CATEGORY POST API-------------------------------------

app.post('/category', async (req, res) => {
    await new category(req.body).save().
        then((data) => res.status(200).send(data)).
        catch(() => res.status(400).send(error));
});

// ------------------CATEGORY GET API-----------------------

app.get('/category', async (req, res) => {
    await category.find().
        then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error))
});

// ------------------CATEGORY SEARCH API-----------------------

app.get('/category/:key', async (req, res) => {
    await category.find(
        { _id: req.params.key }
    ).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
});

// ------------------CATEGORY DELETE API-----------------------

app.delete('/category/:id', async (req, res) => {
    try {
        await category.findOne({ _id: req.params.id }).
            then((data) => deleteProductHandler(data.name))

        await category.deleteOne({ _id: req.params.id }).
            then((data) => res.status(200).send(data))
    } catch (error) {
        res.status(400).send(error);
    }
});

// ------------------CATEGORY UPDATE API-----------------------

app.put('/category/:id', async (req, res) => {
    await category.updateOne(
        { _id: req.params.id },
        {
            $set: (req.body)
        }
    ).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error));
});

// --------------------------------ORDER POST API-------------------------------------

app.post('/order', async (req, res) => {
    await new order(req.body).save().
        then(() => res.status(200).send({ Massage: 'Order Success' })).
        catch((error) => res.status(400).send(error));
});

// --------------------------------ORDER DELETE API-------------------------------------

app.delete('/order/:id', async (req, res) => {
    await order.deleteOne({ _id: req.params.id }).
        then(() => res.status(200).send({ Massage: 'Order Deleted' })).
        catch((error) => res.status(400).send(error));
});

// --------------------------------ORDER POST API-------------------------------------

app.get('/order', async (req, res) => {
    await testmodel.aggregate([
        {
            $lookup: {
                from: "orders",
                localField: "email",
                foreignField: "useremail",
                as: "showdata"
            }
        },

    ]).then((data) => res.status(200).send(data)).
        catch((error) => res.status(400).send(error))
});



// ------------------VERIFY TOKEN-----------------------

// function verifyToken(req, res, next) {
//    let token = req.headers['authorization'];
//    console.log(token);
//    if(token) {
//       token = token.split(' ')[1];
//       console.log(token);
//       jwt.verify(token,jwtkey,(err,valid) => {
//          if(err) {
//             res.send({result: 'Please Provide valid token'});
//          } else {
//             next();
//          }
//       })
//    } else {
//       res.send({result: 'Please Add token!!!'});
//    }
// }


// ------------------SERVER PORT NO. 11000-----------------------

app.listen(11000, () => console.log("Server Created!!"));