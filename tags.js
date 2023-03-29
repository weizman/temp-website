(function(){
    const parent = document.currentScript.parentElement;

    top.TAGS = {
        ALL: [
            'CVEs', 'Vulnerabilities', 'Security', 'JavaScript',
            'Research', 'Anti-Debug', 'Videos', 'Published', 'Podcasts',
            'Posts', 'News', 'Supply-Chain-Security',
            'Discovery', 'Browser', 'Top', 'MetaMask', 'LavaMoat',
        ],
        SELECTED: (new URLSearchParams(window.location.search).get('tags') || []).split(','),
    };

    top.TAGS.ALL.forEach(tag => {
        const selected = top.TAGS.SELECTED.includes(tag);
        const a = document.createElement('a');
        a.style.fontWeight = selected ? 'bold' : '';
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
    });

    document.currentScript.remove();
}())