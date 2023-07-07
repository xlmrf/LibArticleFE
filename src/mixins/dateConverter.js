export default {
    methods:{
        // myTruncate('Lorem ipsum dolor sit amet, consectetur adipisicing elit...',8, '...')
        getConvertDate(date){
            const newDate = new Date(date)
            const yyyy = newDate.getFullYear()
            let mm = newDate.getMonth() + 1
            let dd = newDate.getDate()

            if (dd < 10) dd = '0' + dd
            if (mm < 10) mm = '0' + mm

            return dd + '.' + mm + '.' + yyyy
        }
    }
}