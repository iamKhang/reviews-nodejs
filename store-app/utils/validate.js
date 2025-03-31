const validate = (data, file) =>{
    const errors = []
    if(!data.name||data.name.trim().length==0){
        errors.push({field: 'name', message: 'Ten khong duoc de trong'})
    }
    if(!data.address||data.address.trim().length==0){
        errors.push({field: 'address', message: 'Dia chi khong duoc de trong'})
    }
    if(!data.email||data.email.trim().length==0){
        errors.push({field: 'email', message: 'Email khong duoc de trong'})
    }
    if(!data.manager||data.manager.trim().length==0){
        errors.push({field: 'manager', message: 'Manager khong duoc de trong'})
    }
    if(!file){
        errors.push({field: 'image', message: 'Phải chọn ảnh'})
    }else if(file.size > 5*1024*1024){
        errors.push({field: 'image', message: 'Kich thuoc file phai nho hon 5MB'})
    }

    return errors
}

module.exports = validate