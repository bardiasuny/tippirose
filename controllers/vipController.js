const admin = require('../config/admin')
const firebase = require('../config/firebase')


//get-user-product
exports.postGetUserProduct = async (req, res, next) => {

    const { uniqueId } = req.body

    let infoToshow = {}
    let userTemplate = {}
    // check if user already claimed it
    try {
        const vipUserProductQuery = await admin.firestore()
            .collectionGroup('userProducts')
            .where('uniqueId', '==', uniqueId)
            .get()

        if (vipUserProductQuery.docs.length > 0) {
            infoToshow = { ...vipUserProductQuery.docs[0].data(), active: true }
            const userId = infoToshow.userId
            const template = infoToshow.template

            if (template) {
                const userTemplateQuery = await admin.firestore()
                    .collection('users')
                    .doc(userId)
                    .collection('templates')
                    .doc(template)
                    .get()

                userTemplate = userTemplateQuery.data()

                // increment Vists

                const profileRef = admin.firestore()
                    .collection('users')
                    .doc(userId)
                    .collection('templates')
                    .doc(template)


                await profileRef.update({ visited: userTemplate.visited + 1 })

            }

        } else {
            const ordersQuery = await firebase.firestore()
                .collection('orders')
                .where('uniqueId', '==', uniqueId)
                .get()

            infoToshow = { ...ordersQuery.docs[0].data(), orderId: ordersQuery.docs[0].id, active: false }

        }
        res.send({ infoToshow, userTemplate })
    } catch (err) {
        res.send(err)
    }
}


exports.addLinkViewCount = async (req, res, next) => {

    const { newLinks, userId, profileName } = req.body

    await admin.firestore()
        .collection('users')
        .doc(userId)
        .collection('templates')
        .doc(profileName)
        .update({
            links: newLinks
        })



    res.send("incremented view")
}


