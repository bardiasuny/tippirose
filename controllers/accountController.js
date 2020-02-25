const admin = require('../config/admin')
const firebase = require('../config/firebase')

exports.postGetUserVipProducts = async (req, res, next) => {

    const { user } = req.body

    let allUserProducts = []
    const vipUserProductQuery = await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .collection('userProducts')
        .get()

    for (let i = 0; i < vipUserProductQuery.docs.length; i++) {
        const products = vipUserProductQuery.docs[i].data()
        allUserProducts.push(products)
    }
    res.send(allUserProducts)

}


exports.fetchAllTemplates = async (req, res, next) => {
    const { user } = req.body

    let allTemplates = []
    const allTemplatesQuery = await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .collection('templates')
        .get()

    for (let i = 0; allTemplatesQuery.docs.length > i; i++) {

        allTemplates.push(allTemplatesQuery.docs[i].data())
    }
    res.send(allTemplates)
}

exports.assingVipTemplate = async (req, res) => {
    const { user, template, product } = req.body
    await firebase.firestore()
        .collection('users')
        .doc(user.uid)
        .collection('userProducts')
        .doc(product.uniqueId)
        .update({
            template: template
        })
    res.send("success")
}