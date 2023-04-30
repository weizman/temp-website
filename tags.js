(function(){
    function getSelectedTags() {
        let tags = new URLSearchParams(document.currentScript.src.split('?')[1]).get('tags');
        if (tags) {
            return tags.split(',');
        }
        tags = new URLSearchParams(window.location.search).get('tags');
        if (tags) {
            return tags.split(',');
        }
        return [];
    }

    const parent = document.currentScript.parentElement;

    top.TAGS = {
        ALL: [
            'Top', 'CVEs', 'Vulnerabilities', 'Security', 'JavaScript',
            'Research', 'Anti-Debug', 'Supply-Chain-Security', 'The-Client-Side',
            'Discovery', 'Browser', 'MetaMask', 'LavaMoat',
        ],
        SELECTED: getSelectedTags(),
    };

    top.TAGS.ALL.forEach(tag => {
        const selected = top.TAGS.SELECTED.includes(tag);
        const a = document.createElement('a');
        a.style.fontWeight = selected ? 'bold' : '';
        a.style.cursor = 'pointer';
        a.textContent += tag;
        a.onclick = () => {
            if (selected) {
                top.TAGS.SELECTED.splice(top.TAGS.SELECTED.indexOf(tag), 1);
            } else {
                top.TAGS.SELECTED.push(tag);
            }
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('tags', top.TAGS.SELECTED.join(','));
            window.location.search = searchParams.toString();
        };
        parent.appendChild(a);
        parent.append(' | ');
    });

    document.currentScript.remove();
}())