var Tween = require('gsap'),
    animsvg = require('./drawsvg');

module.exports = {
    "/": {
        "title": {
            "label": "NaN",
            "abbr": "Nantes - Angers - Nantes"
        },
        "desc": "[nän]: Nantes - Angers - Nantes a été mon trajet quotidien une semaine par mois durant deux ans, période à laquelle je passais le titre de Concepteur développeur Informatique suivi à l'IMIE d'Angers.",
        "next": "/240"
    },

    "/1560": {
        "title": {
            "number": '1560',
            "desc": 'kilometres'
        },
        "desc": "Entre mon domicile et la gare puis entre la gare et le centre de formation, à vélo.",
        "illu": "bike.svg",
        anim: function() {
            var paths = document.querySelectorAll('path'),
                tweens = new Array(),
                tl = new TimelineMax; 

            animsvg.hideSVGPaths();

            tweens.push(Tween.to(paths, 1, {drawSVG: "0%"}, {drawSVG: "100%"}));
            tl.add(tweens);
            return tl;
        },
        "pager": "01",
        "prev": "/",
        "next": "/240"
    },

    "/240": {
        "title": {
            "number": "240",
            "desc": "trains"
        },
        "desc": "TGV ou TER, au choix. Et pas beaucoup de retards.",
        "illu": "bike.svg",
        "pager": "02",
        "prev": "/1560",
        "next": "/120"
    },

    "/120": {
        "title": {
            "number": "120",
            "desc": "thés"
        },
        "desc": "Soit 60 € pour du Lipton Citron, quand même.",
        "illu": "cafe.svg",
        anim: function() {
            var ellipses = document.querySelectorAll('ellipse');
            console.log(ellipses);
            var tweens = new Array,
                tl= new TimelineMax;
            for (var i = 0; i < ellipses.length; i++) {
                tweens.push(Tween.fromTo(ellipses[i], 0.3, {opacity: 0, transform: 'translateY(-50px)'}, {opacity:1, transform: 'translateY(0)'}));
            };
            tl.add(tweens, '+=0', 'start', .1);
            return tl;
        },
        "pager": "03",
        "prev": "/240",
        "next": "/6"
    },

    "/6": {
        "title": {
            "number": "6",
            "desc": "langages"
        },
        "desc": "Java, PHP, MySQL, HTML, CSS, JavaScript. Et un peu de Photoshop.",
        "illu": "bike.svg",
        "pager": "04",
        "prev": "/120",
        "next": "/2",
    },

    "/2": {
        "title": {
            "number": "2",
            "desc": "ans"
        },
        "desc": "Deux années en contrat de professionnalisation chez Fly Designers.",
        "illu": "bike.svg",
        "pager": "05",
        "prev": "/6",
        "next": "/1"
    },

    "/1": {
        "title": {
            "number": "1",
            "desc": "titre"
        },
        "desc": "de Concepteur - Développeur Informatique.",
        "illu": "bike.svg",
        "pager": "06",
        "prev": "/2",
        "next": "/merci"
    },

    "/merci": {
       "title": {
            "label": "Merci"
        },
        "desc": "Merci à tout ceux qui m'ont aidé.",
        "prev": "/1"
    }
};