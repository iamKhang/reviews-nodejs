// File: utils/validation.js

const validateMobile = (mobileData, file) => {  // Thêm tham số file
    const errors = [];
    const currentYear = new Date().getFullYear();

    // Validate name
    if (!mobileData.name || mobileData.name.trim().length === 0) {
        errors.push({ field: 'name', message: 'Tên điện thoại không được để trống' });
    }

    // Validate price
    if (!mobileData.price || isNaN(mobileData.price) || mobileData.price <= 0) {
        errors.push({ field: 'price', message: 'Giá phải là số dương' });
    }

    // Validate brand
    if (!mobileData.brand || mobileData.brand.trim().length === 0) {
        errors.push({ field: 'brand', message: 'Thương hiệu không được để trống' });
    }

    // Validate release year
    if (!mobileData.releaseYear || isNaN(mobileData.releaseYear)) {
        errors.push({ field: 'releaseYear', message: 'Năm ra mắt phải là số' });
    } else if (mobileData.releaseYear < 0 || mobileData.releaseYear > currentYear) {
        errors.push({ field: 'releaseYear', message: `Năm ra mắt phải từ 0 đến ${currentYear}` });
    }

    // Validate image
    if (!file) {
        errors.push({ field: 'image', message: 'Vui lòng chọn ảnh' });
    } else if (file.size > 5 * 1024 * 1024) { // 5MB
        errors.push({ field: 'image', message: 'Kích thước ảnh không được vượt quá 5MB' });
    }

    console.log(errors);
    return errors;
};

module.exports = {
    validateMobile
};