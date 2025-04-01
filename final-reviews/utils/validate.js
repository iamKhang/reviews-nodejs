const validate = (data, file) => {

    const errors = []

    if (!data.isbn || data.isbn.trim().length == 0) {
        errors.push({
            field: 'isbn',
            message: 'ISBN khong duoc bo trong!'
        })

    }
    if (!data.name || data.name.trim().length == 0) {
        errors.push({
            field: 'name',
            message: 'name khong duoc bo trong!'
        })

    }
    if (!data.publisher || data.publisher.trim().length == 0) {
        errors.push({
            field: 'publisher',
            message: 'publisher khong duoc bo trong!'
        })

    }
    if (!data.publishYear || isNaN(data.publishYear)) {
        errors.push({
            field: 'publishYear',
            message: 'publishYear khong duoc bo trong!'
        })

    }
    if (!data.author || data.author.trim().length == 0) {
        errors.push({
            field: 'author',
            message: 'Author khong duoc bo trong!'
        })
    }
    if (!file) {
        errors.push({
            field: 'image',
            message: 'Chon anh bai bao!'
        })
    }else if (file.size > 5*1024*1024) {
        errors.push({
            field: 'image',
            message: 'Anh bai bao khong duoc lon hon 5MB!'
        })
    }
    return errors
}
module.exports = validate