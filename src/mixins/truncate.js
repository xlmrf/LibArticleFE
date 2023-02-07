export default {
    methods:{
        // myTruncate('Lorem ipsum dolor sit amet, consectetur adipisicing elit...',8, '...')
        myTruncate(text, length, clamp){
            clamp = clamp || '...';
            var node = document.createElement('div');
            node.innerHTML = text;
            var content = node.textContent;
            return content.length > length ? content.slice(0, length) + clamp : content;
        }
    }
}
