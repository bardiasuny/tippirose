const admin = require('../config/admin')
const firebase = require('../config/firebase')

exports.postGetUserProduct = async (req, res, next) => {

    const { uniqueId } = req.body

    let infoToshow = {}
    let userTemplate = {}
    // check if user already claimed it
    const vipUserProductQuery = await firebase.firestore()
        .collectionGroup('userProducts')
        .where('uniqueId', '==', uniqueId)
        .get()

    if (vipUserProductQuery.docs.length > 0) {
        infoToshow = { ...vipUserProductQuery.docs[0].data(), active: true }
        const userId = infoToshow.userId
        const template = infoToshow.template

        if (template) {
            const userTemplateQuery = await firebase.firestore()
                .collection('users')
                .doc(userId)
                .collection('templates')
                .doc(template)
                .get()

            userTemplate = userTemplateQuery.data()

        }

    } else {
        const ordersQuery = await firebase.firestore()
            .collection('orders')
            .where('uniqueId', '==', uniqueId)
            .get()

        infoToshow = { ...ordersQuery.docs[0].data(), orderId: ordersQuery.docs[0].id, active: false }

    }
    res.send({ infoToshow, userTemplate })
}

