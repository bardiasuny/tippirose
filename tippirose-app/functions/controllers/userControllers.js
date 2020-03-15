const admin = require('../config/admin')
const firebase = require('../config/firebase')

const uuid = require('uuid')



//    =>    /user/order-product

exports.postOrderProduct = async (req, res, next) => {

    const { downloadURL, product, color, size, pattern, uniqId, uniqueUrl, user, date, secretKey } = req.body

    console.log(req.body.downloadURL)


    await firebase.firestore()
        .collection('orders')
        .add({
            orderDate: date,
            productID: product.id,
            productName: product.productName,
            category: product.category,
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            pattern: pattern,
            size: size,
            color: color,
            url: uniqueUrl,
            uniqueId: uniqId,
            designImgUrl: downloadURL,
            mainImageUrl: product.mainImageUrl,
            price: product.price
        }).then(async docRef => {
            console.log("addedOrder ID :", docRef.id)


            await admin.firestore()
                .collection('orders')
                .doc(docRef.id)
                .collection('secretKey')
                .doc('secretKey')
                .set({
                    secretKey: secretKey
                })



            return


        })

    res.send("Order has beed successfull")

}

//   =>      /user/activate-product
exports.postActivateProduct = async (req, res, next) => {

    const { product, userData, user } = req.body

    const secretKeyQuery = await admin.firestore()
        .collection('orders')
        .doc(product.orderId)
        .collection('secretKey')
        .doc('secretKey')
        .get()

    const secretKey = secretKeyQuery.data()

    console.log(product)
    if (userData.secretKey === secretKey.secretKey) {

        await firebase.firestore()
            .collection('users')
            .doc(user.id)
            .collection('userProducts')
            .doc(product.uniqueId)
            .set({
                orderDate: product.orderDate,
                productID: product.productID,
                userId: user.id,
                userName: user.displayName,
                userEmail: user.email,
                pattern: product.pattern,
                size: product.size,
                color: product.color,
                url: product.url,
                uniqueId: product.uniqueId,
                designImgUrl: product.designImgUrl,
                mainImageUrl: product.mainImageUrl,
                //description: product.description,
                orderId: product.orderId
            })

        await firebase.firestore()
            .collection('users')
            .doc(user.id)
            .update({
                level: "vip"
            })

        await admin.firestore()
            .collection('users')
            .doc(user.id)
            .collection('userProducts')
            .doc(product.uniqueId)
            .collection('secrets')
            .doc('secretKey')
            .set({
                secretKey
            })

        let userId = user.id;



        admin.auth().setCustomUserClaims(userId, { vip: true }).then(() => {
            console.log(" you are VIP")
            return
        }).catch((err) => {
            console.log(err)

        })



        res.send('match')
    } else {
        res.send('The key is not match')
    }



}


exports.postGetUserTemplate = async (req, res, next) => {

    const { template, userId } = req.body

    const userTemplateQuery = await firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('templates')
        .doc(template)
        .get()

    const userTemplate = userTemplateQuery.data()

    res.send(userTemplate)


}
