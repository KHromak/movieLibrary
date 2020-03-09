export default {

    isStringContainNumber : (str) => {
        return /\d/.test(str);
    },

    isWrongYear : (year) => {
        return year > 2021 || year < 1850;
    },

    isFormsEmpty : (title, year, format, stars) => {
        return !title || !year || !format || !stars;
    },

    isFileTypeTxt : (file) => {
        console.log(file.size, "filesize");
        if(file.size < 3 || !file || !file.name.length > 0){
            return false;
        }
        return file.name.toLowerCase().endsWith('.txt');
    }
}