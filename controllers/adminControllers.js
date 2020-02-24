
//api =>  /admin/add-product
const admin = require('../config/admin')
const firebase = require('../config/firebase')

//ADD PRODUCT BY PROVIDING  ---productID and ---Category
exports.postAddProduct = async (req, res, next) => {
    console.log(req.body)

    const { initialValues, product, images, idToken } = req.body

    admin.auth().verifyIdToken(idToken)
        .then(function (decodedToken) {
            let uid = decodedToken.uid;
            console.log(decodedToken)
            // ...
        }).catch(function (error) {
            console.log(error)
        });


    if (!initialValues) {
        firebase.firestore()
            .collection('products')
            .doc(product.category)
            .collection('products')
            .add(
                product
            )
            .then(async docRef => {
                console.log("Written: ", docRef.id)

                //SAVING ARRAY OF IMAGES
                let imageUrls = []
                for (let i = 0; i < images.length; i++) {
                    const image = images[i]
                    const path = `products/${docRef.id}/product-images`;
                    const options = {
                        name: product.productName + "-" + images[i].id
                    };

                    let UploadedFile = await firebase.uploadFile(path, images[i], null, options);
                    let downloadURL = await UploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

                    await firebase.firestore()
                        .collection('products')
                        .doc(product.category)
                        .collection('products')
                        .doc(docRef.id)
                        .collection('photos')
                        .add({
                            name: product.productName + "-" + images[i].id,
                            url: downloadURL
                        })

                    imageUrls.push(downloadURL)
                }

                //SAVING ARRAY OF Templates

                console.log(imageUrls.length)
                if (imageUrls.length > 0) {
                    await firebase.firestore()
                        .collection('products')
                        .doc(product.category)
                        .collection('products')
                        .doc(docRef.id)
                        .update({
                            'id': docRef.id,
                            'mainImageUrl': imageUrls && imageUrls[0],
                            'mainImageName': images && product.productName + "-" + images[0].id
                        })
                } else {
                    await firebase.firestore()
                        .collection('products')
                        .doc(product.category)
                        .collection('products')
                        .doc(docRef.id)
                        .update({
                            'id': docRef.id,

                        })
                }


            }).catch(function (error) {
                console.error("Error adding document: ", error);
            })
    } else {
        await firebase.firestore()
            .collection('products')
            .doc(initialValues.category)
            .collection('products')
            .doc(initialValues.id)
            .update(
                product
            )





        for (let i = 0; i < images.length; i++) {
            const image = images[i]
            const path = `products/${initialValues.id}/product-images`;
            const options = {
                name: product.productName + "-" + images[i].id
            };

            let UploadedFile = await firebase.uploadFile(path, images[i], null, options);
            let downloadURL = await UploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            await firebase.firestore()
                .collection('products')
                .doc(product.category)
                .collection('products')
                .doc(initialValues.id)
                .collection('photos')
                .add({
                    name: product.productName + "-" + images[i].id,
                    url: downloadURL
                })

        }





    }


    res.send('Success')
}

//GETTING ONE PRODUCT BY PROVIDING  ---productID and ---Category
exports.postGetProduct = async (req, res, next) => {

    const { category, productID } = req.body

    const queryProduct = await firebase.firestore()
        .collection('products')
        .doc(category)
        .collection('products')
        .doc(productID)
        .get()

    const product = queryProduct.data()

    res.send(product)

}


//GETTING ONE PRODUCT IMAGES BY PROVIDING  ---productID and ---Category
exports.postGetProductImages = async (req, res, next) => {

    const { category, productID } = req.body

    let imagesCollection = []


    const productImages = await firebase.firestore()
        .collection('products')
        .doc(category)
        .collection('products')
        .doc(productID)
        .collection('photos')
        .orderBy('name')
        .get()




    for (let i = 0; i < productImages.docs.length; i++) {
        const productImage = productImages.docs[i].data()
        imagesCollection.push({ original: productImage.url, thumbnail: productImage.url, color: productImage.color, pattern: productImage.pattern })
    }

    res.send(imagesCollection)

}


