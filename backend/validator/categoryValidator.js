const {body}= require("express-validator");

const categoryValidator=[
    body("name").notEmpty().withMessage("name is required"),
    body('slug').notEmpty().withMessage('slug is required'),
    body('description').optional(),
    body('isActive').isBoolean().withMessage("isActive must be a boolean value "),
    body('image').custom((value, { req }) => {
      if (!req.file) {
         return true;
      }
      // Check file type/mime type
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        throw new Error('Only JPEG, PNG, or GIF images are allowed');
      }
      // Check file size (example: max 1MB)
      const maxSize = 1 * 1024 * 1024; 
      if (req.file.size > maxSize) {
          throw new Error('Image size must be less than 1MB');
      }
      return true;
    })
]
const updateCategoryValidator=[
  body('name').optional(),
  body('description').optional(),
  body('isActive').optional().isBoolean()
]
module.exports = {categoryValidator,updateCategoryValidator}