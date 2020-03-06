
export default {

    isStringContainNumber : (str) => {
        return /\d/.test(str);
    },

    isWrongYear : (year) => {
        return year>2021 || year<1850;
    },

    isFormsEmpty : (title, year, format, stars) => {
        return !title || !year || !format || !stars;
    },

    isFileTypeTxt : (file) => {
        const validFileExtension = '.txt';
        let fileName = file.name;
        let fileValidate;
        if (fileName.length > 0) {
            fileValidate = false;
            if(fileName.substr(fileName.length - validFileExtension.length, validFileExtension.length).toLowerCase() == validFileExtension.toLowerCase()){
                return fileValidate = true;
            }
        }
        if (!fileValidate) {
            console.log('sorry');
            return false;
        }
        return true;
    }
}