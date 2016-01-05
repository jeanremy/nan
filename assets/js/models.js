var Tween = require('gsap'),
    animsvg = require('./drawsvg');

module.exports = {
    "/": {
        "title": {
            "label": "NaN",
            "abbr": "Nantes - Angers - Nantes"
        },
        "desc": "[Nantes - Angers - Nantes] Retour sur deux années d'études entre Nantes et la cité angevine.",
        "next": "/1560"
    },

    "/1560": {
        "title": {
            "number": '1560',
            "desc": 'kilometres'
        },
        "desc": "Entre mon domicile et la gare puis entre la gare et le centre de formation, à vélo.<br/> A raison d'une semaine par mois pendant deux ans.",
        "illu": "bike.svg",
        anim: function() {
            var lines = document.querySelector('.bike'),
                tweens = new Array(),
                tl = new TimelineMax(),
                length =  lines.getTotalLength();
                console.log(lines, length);
            lines.style.strokeDasharray = (length / 2) + ' ' + (length / 2);
            tweens.push(Tween.fromTo(lines, 1, {strokeDashoffset: length/2}, {strokeDashoffset: 0}));
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
        "desc": "TGV ou TER, au choix.<br/> Et pas beaucoup de retards.",
        "illu": "train.svg",
        "pager": "02",
        anim: function() {
            var ellipses = document.querySelectorAll('.step');
            animsvg.hideSVG(ellipses);
            var tweens = new Array,
                tl= new TimelineMax();
            for (var i = 0; i < ellipses.length; i++) {
                tweens.push(Tween.fromTo(ellipses[i], 0.3, {opacity: 0, transform: 'translateY(-50px)'}, {opacity:1, transform: 'translateY(0)',  ease: Back.easeOut.config(1.7)}));
            };
            tl.add(tweens, '+=0', 'start', .1);
            return tl;
        },
        "prev": "/1560",
        "next": "/120"
    },

    "/120": {
        "title": {
            "number": "120",
            "desc": "thés"
        },
        "desc": "Un par jour, à 50 cts.<br/>Soit 60 € pour du Lipton Citron, quand même.",
        "illu": "cafe.svg",
        anim: function() {

            var ellipses = document.querySelectorAll('ellipse');
            var tweens = new Array,
                tl= new TimelineMax();
            for (var i = 0; i < ellipses.length; i++) {
                //tweens.push(animsvg.hideSVG);
                tweens.push(Tween.fromTo(ellipses[i], 0.3, {opacity: 0, transform: 'translateY(-50px)'}, {opacity:1, transform: 'translateY(0)',  ease: Back.easeOut.config(1.7)}));
            };
            tl.add(tweens, '+=0', 'start', .1);
            tl.add(function() {console.log('end of anim tl');})
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
        "desc": "Java, PHP, MySQL, HTML, CSS, JavaScript.<br/> Et un peu de Photoshop.",
        "illu": "key.svg",
        anim: function() {
            var paths = document.querySelectorAll('path, polyline');
            animsvg.hideSVG();
            var tweens = new Array,
                tl= new TimelineMax;
            for (var i = 0; i < paths.length; i++) {
                tweens.push(Tween.fromTo(paths[i], 0.3, {opacity: 0}, {opacity:1}));
            };
            tl.add(tweens, '+=0');
            tl.add(function() {console.log('end of anim tl');})
            return tl;
        },
        "pager": "04",
        "prev": "/120",
        "next": "/2",
    },

    "/2": {
        "title": {
            "number": "2",
            "desc": "ans"
        },
        "desc": "Deux années en contrat de professionnalisation chez Fly Designers.<br/> Et quelques parties de Curvytron.",
        "illu": "curvy.svg",
         anim: function() {
            var bonuses = document.querySelectorAll('path, ellipse, polyline, circle');
            animsvg.hideSVG(bonuses);
            var tweens = new Array,
                tl= new TimelineMax();
            for (var i = 0; i < bonuses.length; i++) {
                tweens.push(Tween.fromTo(bonuses[i], 0.5, {opacity: 0}, {opacity:1,  ease: Back.easeOut.config(1.7)}));
            };
            tl.add(tweens, '+=0', 'start', .1);
            return tl;
        },
        "pager": "05",
        "prev": "/6",
        "next": "/1"
    },

    "/1": {
        "title": {
            "number": "1",
            "desc": "titre"
        },
        "desc": "de Concepteur - Développeur Informatique, obtenu à l'IMIE.",
        "illu": "win.svg",
        anim: function() {
            var winner = document.querySelectorAll('.win');
            animsvg.hideSVG(winner);
            var tweens = new Array,
                tl= new TimelineMax();
            for (var i = 0; i < winner.length; i++) {
                tweens.push(Tween.fromTo(winner[i], 0.5, {opacity: 0, transform: 'scale(0.8)'}, {opacity:1, transform: 'scale(0.95)', ease: Back.easeOut.config(1)}));
            };
            tl.add(tweens, '+=0', 'start', .5);
            return tl;
        },
        "pager": "06",
        "prev": "/2",
        "next": "/merci"
    },

    "/merci": {
       "title": {
            "label": "Merci"
        },
        "desc": "Merci à tout ceux qui m'ont aidé. Liste des gens",
        "prev": "/1"
    }
};