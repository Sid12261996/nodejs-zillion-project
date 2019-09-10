const imageFile = require('./Models/image-saving-model.js'),
    Jimp = require('jimp'),
    fs = require('fs'),
    mongoose = require('mongoose')
;

const fixedImagePath = 'public/ImagesManipulated/image-file.jpg';
// JimpImageRead = async (image) => {
//     const file = await Jimp.read(image.url);
//
//
//     file.greyscale() // set greyscale
//         .write() // save
//         .catch(err => console.error(err));
// };

exports.SaveImageToDB = async function (image, count) {
    const manipulatedPath = `${fixedImagePath + count}.jpg`;
    return Jimp.read(image.url).then(lenna => {
        return lenna
            .greyscale() // set greyscale
            .write(fixedImagePath) // save

    }).catch(err => {
        console.error(err);
        return 'failed';
    }).then(result => {
        console.log(manipulatedPath, 'From Jimp');
        const singletonImage = new imageFile();
        singletonImage._id = new mongoose.Types.ObjectId();

        singletonImage.imageBinary = fs.readFileSync(fixedImagePath);


        singletonImage.contentType = image.type;


        singletonImage.save().then(res => {
            console.log(res);
            return res;
        }).catch(err => console.error(err, 'I am error'))
    });
};

exports.retrieveImage = function () {
    return imageFile.find().limit(15).exec().then(docs => {
        return docs;
    })
};
