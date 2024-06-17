const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp', 'avatar');

const storage = multer.diskStorage({
  destination: TMP_FOLDER,
  filename: function (request, file, cb) {
    const fileHash = crypto.randomBytes(10).toString('hex');
    const fileName = `${fileHash}-${file.originalname}`;

    cb(null, fileName);
  },
});

module.exports = {
  storage,
};
