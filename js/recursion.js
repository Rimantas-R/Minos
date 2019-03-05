var struktura = [
    [
        [
            'file.text',
            'nuotrauka.jpg'
        ],
        'cv.pdf'
    ],
    [
        [
            'file2.text',
            'nuotrauka2.jpg'
        ],
        'cv2.pdf'
    ],
    'random.text',
    'random-2.text'
];

let showList = function (dirLs) {
var HTML = '';
    for (var item of dirLs) {
        if (typeof(item) == 'object') {
            HTML += '<div> --';
            HTML += showList(item);
            HTML += '</div>';
        } else if (typeof(item) == 'string'){
            HTML += '<p>-- '+item+'</p>';
        } else continue;
    }
    return HTML;
};

document.getElementsByClassName('listD')[0].innerHTML = showList(struktura);