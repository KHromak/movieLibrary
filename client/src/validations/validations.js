
export default {

    isStringContainNumber : (str) => {
        return /\d/.test(str)
    },

    isWrongYear : (year) => {
        return year>2021 || year<1850
    },

    isFormsEmpty : (title, year, format, stars) => {
        return !title || !year || !format || !stars
    }

}