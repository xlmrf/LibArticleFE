export function apa(item) {
    //apa item including: authors full name, year, title, place
    let apa = ''
    if (item.length === 0){
        return apa = 'Author not found';
    }
    console.log('apa',item);
    // return 0;
    const l_i = item.authors[item.authors.length - 1]
    item.authors.forEach(author => {
        l_i === author && l_i !== item.authors[0] ? apa += '& ' : ''
        if (author.last_name && author.first_name){
            apa += author.last_name + ', ' + author.first_name[0] + '.'
        }
        else{
            apa+= 'Nameless.'
        }
        l_i !== author ? apa += ', ' : ''
    })
    return apa += `(${item.publication_date? item.publication_date.substring(0, 4) : ''}). ${item.title}. ${item.place}`;
}