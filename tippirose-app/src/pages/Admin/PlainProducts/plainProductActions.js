import { toastr } from "react-redux-toastr";
import { actionTypes } from "redux-firestore";
import { SubmissionError } from "redux-form";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../../../features/async/asyncActions";

import axios from "axios";

import {
  FETCH_PRODUCT,
  FETCH_PRODUCT_IMAGES,
  FETCH_PRODUCT_PATTERNS,
  FETCH_ALLPRODUCT_IMAGES,
} from "../Product/productConstants";

let api = "";

if (process.env.NODE_ENV === "production") {
  api = "https://us-central1-tippirose-london.cloudfunctions.net/app";
} else {
  api = "";
}

export const addPlainProduct = (
  product,
  images,
  newImages,
  initialValues
) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    console.log(initialValues);
    if (!initialValues) {
      firebase
        .firestore()
        .collection("plainProducts")
        .doc(product.category)
        .collection("products")
        .add(product)
        .then(async (docRef) => {
          console.log("Written: ", docRef.id);

          //SAVING ARRAY OF IMAGES
          let imageUrls = [];
          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            const path = `plainProducts/${product.category}/${docRef.id}/`;
            const options = {
              name: product.productName + "-" + images[i].id,
            };

            let UploadedFile = await firebase.uploadFile(
              path,
              image,
              null,
              options
            );
            console.log("UploadedFile", UploadedFile);
            let downloadURL = await UploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            console.log("downloadURL", downloadURL);
            firebase
              .firestore()
              .collection("plainProducts")
              .doc(product.category)
              .collection("products")
              .doc(docRef.id)
              .collection("photos")
              .add({
                name: product.productName + "-" + images[i].id,
                url: downloadURL,
              });

            imageUrls.push(downloadURL);
          }

          //SAVING ARRAY OF Templates

          console.log("docRef", docRef.id);
          if (imageUrls.length > 0) {
            const productQuery = await firebase
              .firestore()
              .collection("plainProducts")
              .doc(product.category)
              .collection("products")
              .doc(docRef.id)
              .update({
                id: docRef.id,
                mainImageUrl: imageUrls && imageUrls[0],
                mainImageName:
                  images && product.productName + "-" + images[0].id,
              });
          } else {
            await firebase
              .firestore()
              .collection("plainProducts")
              .doc(product.category)
              .collection("products")
              .doc(docRef.id)
              .update({
                id: docRef.id,
              });
          }

          return;
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    } else {
      try {
        await firebase
          .firestore()
          .collection("plainProducts")
          .doc(initialValues.category)
          .collection("products")
          .doc(initialValues.id)
          .update(product);

        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          const path = `plainProducts/${initialValues.category}/${initialValues.id}`;
          console.log("path", path);
          const options = {
            name: product.productName + "-" + images[i].id,
          };
          if (false) {
            console.log("infirst", newImages);
            let UploadedFile = await firebase.uploadFile(
              path,
              images[i],
              null,
              options
            );
            console.log("downloadURL", UploadedFile);
            let downloadURL = await UploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

            firebase
              .firestore()
              .collection("plainProducts")
              .doc(initialValues.category)
              .collection("products")
              .doc(initialValues.id)
              .collection("photos")
              .add({
                name: product.id + "-" + images[i].id,
                url: downloadURL,
              });
          } else if (images) {
            console.log(image);
            firebase
              .firestore()
              .collection("plainProducts")
              .doc(initialValues.category)
              .collection("products")
              .doc(initialValues.id)
              .collection("photos")
              .doc(image.id)
              .update({
                dark: image.dark || false,
                light: image.light || false,
                colorCode: image.colorCode || "",
                color: image.color || "",
              });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    toastr.success(
      "Success",
      "you have successfully added our new product, well done "
    );
  } catch (err) {
    console.log(err);
  }
};

export const getPlainProduct = (productID) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  console.log("productID", productID);
  try {
    if (productID) {
      let theProduct = [];
      const product = await firebase
        .firestore()
        .collectionGroup("products")
        .where("id", "==", productID)
        .get();
      for (let i = 0; i < product.docs.length; i++) {
        theProduct.push(product.docs[i].data());
      }
      console.log(theProduct);

      dispatch({ type: FETCH_PRODUCT, payload: { product: theProduct } });
    } else {
      dispatch({ type: FETCH_PRODUCT, payload: { product: [] } });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPlainProductsCategory = (productCategory) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    await firestore.get({
      collection: "plainProducts",
      doc: productCategory,
      subcollections: [
        {
          collection: "products",
        },
      ],
      storeAs: productCategory,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deletePlainImage = (initialValues, img) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();

  try {
    if (img.name === initialValues.mainImageName) {
      toastr.warning(
        "Warning!",
        " you can't delete the main image. please select another Image as your prodcut's main image then try to delete this image."
      );
    } else {
      await firebase
        .firestore()
        .collection("plainProducts")
        .doc(initialValues.category)
        .collection("products")
        .doc(initialValues.id)
        .collection("photos")
        .doc(img.id)
        .delete();
      await firebase.deleteFile(
        `products/${initialValues.id}/product-images/${img.name}`
      );

      toastr.success("Success!", " you have successfully deleted the image");
    }
  } catch (err) {
    console.log(err);

    toastr.error("Woooops!", " Something went wrong, try again later");
  }
};

export const assignPlainProductColor = (
  initialValues,
  tshirtInfo,
  img
) => async (dispatch, getState, { getFirebase, getFirestore }) => {
  dispatch(asyncActionStart());
  const firebase = getFirebase();
  const firestore = getFirestore();
  const { color, colorCode, light, dark } = tshirtInfo;
  try {
    await firebase
      .firestore()
      .collection("plainProducts")
      .doc(initialValues.category)
      .collection("products")
      .doc(initialValues.id)
      .collection("photos")
      .doc(img.id)
      .update({
        color,
        colorCode,
        light,
        dark,
      });

    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};

export const getPlainProductImagesWithCat = (category, productID) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch(asyncActionStart());
  try {
    const firebase = getFirebase();
    if (productID && category) {
      let imagesCollection = [];

      const productImages = await firebase
        .firestore()
        .collection("plainProducts")
        .doc(category)
        .collection("products")
        .doc(productID)
        .collection("photos")
        .orderBy("name")
        .get();

      for (let i = 0; i < productImages.docs.length; i++) {
        const productImage = productImages.docs[i].data();

        imagesCollection.push({ ...productImage });
      }
      console.log("productImages &&&&&&", imagesCollection);
      dispatch({
        type: FETCH_PRODUCT_IMAGES,
        payload: { img: imagesCollection },
      });
    } else {
      dispatch({ type: FETCH_PRODUCT_IMAGES, payload: { img: [] } });
    }

    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};

export const getAllPlainImagesWCat = (category) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  try {
    const firebase = getFirebase();
    if (category) {
      let imagesCollection = [];

      const plainProductsImages = await firebase
        .firestore()
        .collection("plainProducts")
        .doc(category)
        .collection("products")
        .get();

      for (let i = 0; i < plainProductsImages.docs.length; i++) {
        const productImage = await plainProductsImages.docs[i].data();

        imagesCollection.push({
          ...productImage,
        });
      }

      dispatch({
        type: FETCH_ALLPRODUCT_IMAGES,
        payload: { img: imagesCollection },
      });
    } else {
      dispatch({ type: FETCH_ALLPRODUCT_IMAGES, payload: { img: [] } });
    }

    dispatch(asyncActionFinish());
  } catch (err) {
    console.log(err);
    dispatch(asyncActionError());
  }
};
