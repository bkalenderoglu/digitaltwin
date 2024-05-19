import * as THREE from './three.module.js';
import {
    Interaction
} from './interaction.module.js';
import {
    CSS2DRenderer,
    CSS2DObject
} from './CSS2DRenderer.js';

window.lms_veri = {
    "ses": true,
    "dil": "tr",
    dil_secim_durum: false,
    "giris_yazi": true,
    "konum": 5,
    "lon": 0,
    "lat": 0,
    info_butonlar: {},
    acik_infolar: {}
};
var scorm_mu = false;
//var lms_veri =SD.GetDataChunk() == undefined || SD.GetDataChunk() == ""  ? lms_veri: JSON.parse(SD.GetDataChunk());scorm_mu=true;
let camera, scene, renderer, dondur;
let isUserInteracting = false,
    onPointerDownMouseX = 0,
    onPointerDownMouseY = 0,
    lon = lms_veri["lon"],
    lat = lms_veri["lat"],
    onPointerDownLon = 0,
    onPointerDownLat = 0,
    phi = 0,
    theta = 0;
let ilk = lms_veri["konum"];

function lms_veri_kaydet() {
    var tamamlanan = 0;
    for (var i = 0; i < Object.values(lms_veri["info_butonlar"]).length; i++) {
        if (Object.values(lms_veri["info_butonlar"])[i])
            tamamlanan++;
    }
    var tamamlanma_orani = ((100 / Object.values(lms_veri["info_butonlar"]).length) * tamamlanan).toFixed(2);
    if (scorm_mu) {
        SD.SetDataChunk(JSON.stringify(lms_veri));
    } else {
        console.log('SETDATACUNK:', lms_veri);
        //console.log('egitim tamamlanma oranı:'+tamamlanma_orani)
    }
}


if (lms_veri["dil_secim_durum"] == false) {
    $('.dil_secenek').removeClass('gizle')
}

const container = document.getElementById('container');
camera = new THREE.PerspectiveCamera(85, window.innerWidth / window.innerHeight, 1, 20);
scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(10, 10, 10);
geometry.scale(1, 1, 1);

renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
container.addEventListener('pointerdown', onPointerDown);
var interactions = new Interaction(renderer, scene, camera);


var labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.pointerEvents = 'none';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);


window.mobileCheck = function() {
    let check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};


const scale_kf = new THREE.VectorKeyframeTrack('.scale', [0, .75, 1.5], [.00001, .5, .5, .00001, .6, .6, .00001, .5, .5]);
const scale_ac = new THREE.AnimationClip('scale_ac', -1, [scale_kf]);

function scale_animasyon(mesh, o = [1, 1, 1]) {

    const scale_kff = new THREE.VectorKeyframeTrack('.scale', [0, .75, 1.5], [o[0], o[1], o[2], o[0] * 1.2, o[1] * 1.2, o[2] * 1.2, o[0], o[1], o[2]]);
    const scale_acf = new THREE.AnimationClip('scale_acf', -1, [scale_kff]);
    const mixer = new THREE.AnimationMixer(mesh);
    const scala_af = mixer.clipAction(scale_acf);
    const clock = new THREE.Clock();

    const animate2 = function() {
        requestAnimationFrame(animate2);

        const delta = clock.getDelta();
        mixer.update(delta);

    };
    animate2();
    return scala_af;
}

window.konumlar = [];

function konum(id, y = 0, x = 0, z = 0) {
    this.id = id;
    var materyal = new THREE.MeshBasicMaterial({
        transparent: true
    });
    this.sekil = new THREE.SphereGeometry(15, 60, 40);
    this.sekil.scale(-1, 1, 1);
    this.mesh = new THREE.Mesh(this.sekil, materyal);
    this.mesh.renderOrder = -1;

    this.getir = function(gidecek = 0, d = undefined) {
        $('.loading').css('display', 'flex');

        var mesh = this.mesh;
        new THREE.TextureLoader().load("img/" + this.id + ".jpg", function(texture) {
            mesh.material.map = texture;
            if (gidecek == 0) {
                mesh.scale.set(1, 1, 1); //mesh.material.opacity=1;
                mesh.position.set(0, 0, 0);
                lms_veri["konum"] = id;

            } else {
                mesh.position.set(0, 0, 0);
                lms_veri["konum"] = id;
                konumlar[gidecek].gonder();
                if (d != undefined) {
                    konumlar[id].dondur(d[0] == undefined ? d : d[0], d[1]);
                }
                lms_veri_kaydet();
            }

            $('.loading').css('display', 'none');
            $('.loading').css('background', 'none');
            $('.sayi').html(id + ".jpg");
            $('.loading').removeClass("back");
        });
        for (let i = 0; i < this.mesh.children.length; i++) {
            var element = this.mesh.children[i];
            if (element.name == "video") {
                element.getir();
            }
        }
    }
    this.dondur = function(y, x) {
        lon = y == undefined ? lon : y;
        lat = x == undefined ? lat : x;
        lms_veri['lon'] = lon;
        lms_veri['lat'] = lat;
    };
    this.cevir = function(y = 0, x = 0, z = 0) {
        this.mesh.rotation.y = y;
        this.mesh.rotation.x = x;
        this.mesh.rotation.z = z;
    };
    this.gonder = function() {
        this.mesh.position.set(5000, 5000, 5000);
        this.mesh.material.map.dispose();
        var cevirx = 0;
        var ceviry = 0;
        for (let i = 0; i < this.mesh.children.length; i++) {
            var element = this.mesh.children[i];
            if (element.name == "video") {
                element.gonder();
            }
        }
    }
    this.cevir(y, x, z);
    scene.add(this.mesh);
    this.mesh.position.set(5000, 5000, 5000);

    /*////silinecek
    this.mesh.on('mousemove',function(){
    	var kure=konumlar[id];window.kure=konumlar[id];
    });///silinecek
    /*/

}


konumlar = ["", new konum(1, 3.1), new konum(2, 3), new konum(3, 3.66), new konum(4, 3.7), new konum(5, 3.12), new konum(6, 3.14), new konum(7, 3.13), new konum(8, 3.14), new konum(9, 3.13), new konum(10, 3.89), new konum(11, 3.58, -0.03), new konum(12, 3.17, -0.03), new konum(13, -3.12, -0.01), new konum(14, -2.71, 0.03), new konum(15, 1.55, -0.03), new konum(16, 3.10), new konum(17, 1.56), new konum(18, 1.56), new konum(19, .83), new konum(20, -.72), new konum(21, -1.1), new konum(22, .8), new konum(23, 1.50, -0.02), new konum(24, 1.50, -0.03), new konum(25, 1.57), new konum(26, 2.11), new konum(27, 1.54), new konum(28, 1.14), new konum(29, 1.20), new konum(30, 2.80), new konum(31, 3.065), new konum(32, 3.12), new konum(33, 3.14), new konum(34, 3.14), new konum(35, 3.14), new konum(36, 3.12), new konum(37, 2.97), new konum(38, 4.70), new konum(39, 3.11), new konum(40, 3.14), new konum(41, 4.71), new konum(42, 1.06), new konum(43, 1.57), new konum(44, 2.34), new konum(45, 3.89), new konum(46, 4.71), new konum(47, 2.58), new konum(48, 3.21), new konum(49, 3.19), new konum(50, -3.14, -0.02), new konum(51, -1.6), new konum(52, -1.53, -0.01), new konum(53, -1.6), new konum(54, 3.62), new konum(55, -1.63), new konum(56, -2.53, -0.01), new konum(57, -1.54, -0.01), new konum(58, -1.64, -0.01), new konum(59, -1.56), new konum(60, 3.05), new konum(61, 3.07), new konum(62, 3.08), new konum(63, 3.145), new konum(64, 3.10), new konum(65, -3.07), new konum(66, -3.161, 0.01), new konum(67, 1.549), new konum(68, 0.604), new konum(69, 1.58), new konum(70, 2.99), new konum(71, 1.57), new konum(72, -1.621), new konum(73, -1.6), new konum(74, -1.77), new konum(75, 0.388), new konum(76, -1.58), new konum(77, -1.64, -0.04), new konum(78, 3.12), new konum(79, 2.79), new konum(80, -1.62), new konum(81, -2.2), new konum(82, -3.19), new konum(83, 3.13), new konum(84, -1.52), new konum(85, -1.59), new konum(86, -3.18), new konum(87, -1.59), new konum(88, -1.58), new konum(89, -1.59), new konum(90, -1.56), new konum(91, 0.04, 0.02), new konum(92, 0.03), new konum(93, -0.09), new konum(94, -0.13), new konum(95), new konum(96, -0.11), new konum(97, 1.465), new konum(98, -1.29), new konum(99, 1.53), new konum(100, -0.36, -0.04), new konum(101, 1.61), new konum(102, 3.12), new konum(103, 3.06), new konum(104, 1.55), new konum(105, 3.13), new konum(106, 1.54, -0.01), new konum(107, 3.17, -0.01), new konum(108, -1.14), new konum(109, 4.75), new konum(110, 4.62), new konum(111, -3.15), new konum(112, -3.152), new konum(113, 3.16), new konum(114, -1.51), new konum(115, -3.81), new konum(116, 3.09, 0.01), new konum(117, 1.55, -0.01), new konum(118, 3.1), new konum(119, 3.65), new konum(120, -0.87), new konum(121), new konum(122), new konum(123, 1.56), new konum(124, 3.03), new konum(125, 0.11), new konum(126, 3.1), new konum(127, 3.13, 0.01), new konum(128, 2.83, 0.10), new konum(129, -1.28), new konum(130, -1.55, -0.01)];


const materialc = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});


function imlec(obje) { //objelerinde üzerinde fare imlecini değiştirir
    obje.on('mouseover', function(e) {
        $('canvas').addClass('pointer');
    });
    obje.on('mouseout', function(e) {
        $('canvas').removeClass('pointer');
    });
}






///yol marker 
var marker_sekil = new THREE.BoxGeometry();
var marker_icon = new THREE.TextureLoader().load("./img/konum.svg");
var marker_icon2 = new THREE.TextureLoader().load("./img/konum2.svg");
marker_icon2.anisotropy = renderer.capabilities.getMaxAnisotropy();
marker_icon.anisotropy = renderer.capabilities.getMaxAnisotropy();
var marker_icon_material = new THREE.MeshBasicMaterial({
    map: marker_icon,
    transparent: true
});
var marker_icon_material2 = new THREE.MeshBasicMaterial({
    map: marker_icon2,
    transparent: true
});

function yol(kure = 0, yeni = 0, p = [0, 0, 0], r = [0, 0, 0], d = undefined) {
    this.mesh = new THREE.Mesh(marker_sekil, marker_icon_material);
    konumlar[kure].mesh.add(this.mesh);
    this.mesh.scale.set(.0001, .7, .7);
    this.mesh.position.set(p[0], p[1], p[2]);
    this.mesh.rotation.set(r[0], r[1], r[2]);
    imlec(this.mesh);
    this.mesh.yeni = yeni;

    this.mesh.on('click', function() {
        konumlar[yeni].getir(kure, d);
        if (yeni == 117) {
            konum_goster_gizle([116])
        }
        if (yeni == 111 && kure == 112) {
            $('.harita').addClass('acik');
        }
    });

    /*////silinecek
    this.mesh.on('mouseover',function(){
    	dondur=this;window.dondur=this;
    });///silinecek
    /*/
    var animasyon = scale_animasyon(this.mesh, [.0001, .5, .5]);
    animasyon.play();


}
///yol marker 6.3=0

new yol(1, 2, [0.10, -0.60, -5.30], [-0.10, 1.54, 1.80]);
new yol(1, 3, [-5.27, -0.43, -1.03], [0.03, 0.00, 1.41]);
new yol(1, 4, [-2.30, -0.36, -4.58], [0.15, 0.00, 1.50]);

new yol(2, 1, [-0.02, -0.56, 4.49], [0.00, -1.50, 4.90]);
new yol(2, 3, [-3.90, -0.28, 2.38], [-0.08, -0.00, 4.54]);
new yol(2, 4, [-3.91, -0.51, -2.62], [0.09, 0.00, 1.45]);

new yol(3, 1, [2.40, -0.50, 3.30], [0.00, -3.60, 1.50]);
new yol(3, 4, [4.30, -0.50, -4.00], [0.00, 10.20, 1.41]);
new yol(3, 5, [-4.70, -0.60, -0.10], [-0.20, -1.10, 1.35]);

new yol(4, 1, [-0.08, -0.33, 4.67], [-0.13, 0.00, 1.57]);
new yol(4, 2, [2.38, -0.44, 4.00], [0.02, -1.00, 1.69]);
new yol(4, 3, [-3.33, -0.43, 3.48], [-0.03, -0.00, 1.50]);
new yol(4, 130, [-1.72, -0.29, -5.00], [0.00, 1.80, -1.40]);

new yol(5, 3, [3.90, -0.65, -3.03], [0.05, -0.00, -1.50]);
new yol(5, 6, [-3.58, -0.60, 0.05], [0.00, 0.00, -1.65]);

new yol(6, 5, [5.69, -1.06, -0.02], [0.00, -0.00, -1.34]);
new yol(6, 7, [-2.18, -1.33, 3.39], [-0.04, -3.15, -1.56]);

new yol(7, 6, [2.20, -1.6, -3.70], [0.06, 0.23, -1.61]);
new yol(7, 9, [-4.63, -0.90, 0.22], [-0.00, 0.00, -1.70]);
new yol(7, 10, [-5.14, -0.90, 3.04], [0.77, 1.48, 0.81]);

new yol(9, 7, [4.98, -1.10, -0.59], [0, 0, -1.45]);
new yol(9, 12, [-4.62, -0.90, 0.01], [0.04, 0.26, 1.38]);
new yol(9, 10, [-0.72, -1.30, 4.01], [0.04, 0.79, 1.48]);

new yol(10, 7, [5.88, -1.10, 0.91], [0.08, 0.02, 1.05]);
new yol(10, 9, [3.38, -1.50, -3.29], [-3.26, 2.09, 1.88]);
new yol(10, 12, [-1.52, -1.10, -5.99], [-3.96, 1.89, 5.08]);
new yol(10, 25, [-3.12, -1.10, 0.31], [0.04, 0.09, 1.38], 75);

new yol(12, 9, [4.42, -1.10, -0.11], [3.16, 3.21, -1.38]);
new yol(12, 13, [-2.82, -1.40, -0.09], [-3.16, 2.09, 4.68]);
new yol(12, 17, [-1.22, -1.30, -2.59], [-2.96, 1.69, 1.38]);

new yol(13, 17, [1.08, -1.40, -2.89], [-2.96, 1.69, 1.38]);
new yol(13, 12, [2.38, -1.40, 0.11], [-3.06, 1.59, 1.48]);
new yol(13, 14, [-0.92, -1.30, 3.11], [-3.06, 1.39, 4.48]);

new yol(14, 13, [1.28, -1.00, -1.99], [-3.06, 5.19, 4.68]);
new yol(14, 17, [3.28, -0.90, -3.49], [-3.16, 5.09, 4.58]);
new yol(14, 15, [-3.12, -1.20, -1.09], [-3.16, 3.49, 4.78]);

new yol(15, 14, [-0.42, -1.20, -3.09], [3.24, 4.49, 4.68]);
new yol(15, 16, [-3.42, -1.30, 0.01], [-3.16, 3.19, 4.58]);

new yol(16, 15, [-0.12, -1.30, 3.41], [-3.16, 4.69, 1.68]);
new yol(16, 60, [-6.24, -0.50, -0.03], [-0.00, -0.00, 1.34]);

new yol(17, 13, [2.78, -1.50, 1.31], [-3.36, 2.19, 1.88]);
new yol(17, 12, [2.78, -1.50, -0.79], [-3.36, 2.19, 1.88]);
new yol(17, 18, [-4.22, -1.00, -0.09], [-2.76, 5.20, 1.95]);

new yol(18, 17, [4.28, -0.90, 0.01], [-2.50, 4.45, 2.25]);
new yol(18, 19, [-1.02, -1.70, -1.59], [-2.76, 5.20, 1.95]);
new yol(18, 20, [-5.52, -0.70, 0.11], [-2.50, 5.05, 2.25]); //-190

new yol(19, 18, [1.92, -1.80, 0.39], [-2.76, 4.70, 1.95]);

new yol(20, 18, [-4.39, -0.82, -5.10], [0.16, -0.13, 1.43]);
new yol(20, 21, [-5.51, -1.22, 2.43], [0.00, 0.60, 1.40]);
new yol(20, 22, [-3.91, -1.12, 3.73], [0, 0.60, 1.40]);

new yol(21, 20, [3.79, -1.02, -4.47], [0.00, 0.60, 1.70]); //-90

new yol(22, 20, [3.97, -1.10, 3.87], [-0.10, 0.60, 1.64]); //-90

new yol(25, 26, [-2.13, -1.10, 2.37], [-0.10, 0.60, 1.64]);
new yol(25, 10, [1.57, -3.00, -3.53], [-0.10, 0.60, 1.64]);

new yol(26, 25, [2.87, -1.20, -1.13], [-0.10, 0.60, 1.64]);
new yol(26, 27, [-3.43, -1.00, -2.13], [6.60, 1.30, 4.44]);

new yol(27, 26, [3.57, -0.90, -0.13], [9.60, 1.50, 4.54]);
new yol(27, 28, [-4.63, -1.00, 0.17], [6.50, 1.20, 7.64]);

new yol(28, 27, [3.37, -0.70, -1.53], [6.80, 1.90, 10.54]);
new yol(28, 30, [-3.73, -1.00, 0.87], [0.00, 0.00, 1.44]);

new yol(30, 28, [0.77, -0.90, 3.27], [0.00, -0.00, 1.55]);
new yol(30, 31, [-1.93, -1.20, -2.53], [0.40, 1.40, 7.54]);

new yol(31, 30, [1.38, -1.37, 3.23], [0.20, 1.70, 1.29]);
new yol(31, 32, [-3.43, -1.00, 0.27], [-2.80, 1.60, 7.54]);

new yol(32, 31, [3.47, -0.90, -0.13], [-0.00, 0.00, 1.74]);
new yol(32, 34, [-4.63, -2.40, 0.27], [0.00, -0.00, 1.44]);

new yol(34, 32, [6.09, 2.00, -0.63], [0.00, 0.03, -0.41]);
new yol(34, 36, [-3.53, -1.10, -0.03], [-2.80, 1.80, 7.54]);

new yol(36, 34, [3.17, -1.30, 0.07], [-6.00, 1.40, 7.54]);
new yol(36, 38, [-4.03, -0.80, -0.83], [-6.00, 0.90, 7.54]);
new yol(36, 52, [-1.63, -1.80, 1.77], [-6.30, 0.80, 7.54]);

new yol(38, 36, [-1.43, -1.10, 4.57], [0.20, 1.50, 1.24]);
new yol(38, 40, [-1.13, -0.90, -4.73], [0.40, 1.60, 1.34]);
new yol(38, 51, [3.48, -1.60, -1.59], [-3.16, 4.69, 1.48]);

new yol(40, 38, [4.27, -0.70, -0.63], [-0.00, 3.00, 1.44]);
new yol(40, 41, [-2.33, -1.70, 2.87], [-0.10, -0.00, -1.56]);

new yol(41, 40, [2.97, -1.70, 1.87], [-0.00, -0.00, -1.46]);
new yol(41, 44, [-2.63, -0.40, -0.03], [3.20, -0.30, 1.74], 40);

new yol(44, 41, [2.57, -2.70, 2.37], [3.20, 0.09, 1.44], 90);
new yol(44, 46, [-4.23, -1.10, 1.87], [0.67, -1.65, 2.25]);

new yol(46, 44, [-0.73, -1.00, 3.77], [0.60, -1.57, 2.24]);
new yol(46, 47, [-5.33, -0.90, -0.03], [1.13, 4.60, -0.46]);

new yol(47, 46, [-2.33, -0.90, -3.83], [-1.90, 4.80, 2.64]);
new yol(47, 49, [-4.53, -0.70, 2.77], [1.00, 4.50, -0.46]);

new yol(49, 47, [7.28, -0.70, 0.41], [0.01, 0.00, 1.68], 90);
new yol(49, 50, [-0.32, -1.00, 4.61], [1.37, 1.60, 0.00]);

new yol(50, 49, [-0.06, -0.96, -4.09], [1.62, 1.57, 0.10]);

var beyaz = new yol(51, 38, [-4.62, -1.00, -0.99], [0.04, -0.00, 1.50]);
beyaz.mesh.material = marker_icon_material2;
new yol(51, 130, [5.08, -0.40, 0.11], [0.00, 3.00, 1.42]);

new yol(52, 36, [1.47, -1.60, 1.77], [-0.00, 0.00, 1.64]);
new yol(52, 54, [-3.43, -1.30, -0.23], [-0.00, 0.00, 1.44]);

new yol(54, 52, [1.77, -1.30, -3.23], [0.10, 0.00, 1.64]);
new yol(54, 55, [-2.33, -1.50, 0.27], [-0.00, 0.00, 1.54]);

new yol(55, 54, [1.47, -1.80, 2.07], [-0.00, 0.00, 1.74]);
new yol(55, 56, [-3.73, -1.30, 0.07], [-0.00, 0.00, 1.54]);

new yol(56, 55, [1.97, -1.30, -2.63], [-0.00, 0.00, 1.60]);
new yol(56, 57, [-2.83, -1.50, -1.73], [-0.00, -0.00, -1.65]);

new yol(57, 56, [0.07, -1.40, 3.17], [-0.00, -0.00, 1.54]);
new yol(57, 60, [-5.33, -1.10, -0.43], [0.01, -0.00, 1.40]);

new yol(60, 57, [-0.23, -1.10, -2.73], [0.05, 0.00, 1.55]);
new yol(60, 16, [6.53, -0.67, -0.56], [0.00, 0.00, 1.73]);
new yol(60, 63, [-5.03, -0.60, 0.47], [0.00, 0.00, 1.44]);

new yol(63, 60, [5.41, -0.45, 0.05], [-0.00, -0.00, 1.74]);
new yol(63, 64, [-4.83, -0.80, 0.07], [0.00, -0.00, 1.40]);
new yol(63, 72, [-0.03, -1.10, 4.27], [-0.10, -0.00, 1.56]);

new yol(64, 66, [-6.63, -0.40, 0.27], [0.01, -0.00, 1.39]);
new yol(64, 63, [5.67, -0.80, -0.13], [-0.00, 0.00, 1.84]);
new yol(64, 82, [0.07, -1.00, 2.57], [-0.00, -0.00, 7.84], 0);

new yol(66, 64, [4.37, -0.60, -0.13], [0.00, 0.10, 1.70]);
new yol(66, 67, [-1.13, -2.10, -2.42], [0.03, -0.00, 1.45]);

new yol(67, 68, [-2.33, -1.70, 1.97], [-0.00, -0.00, 1.54]);
new yol(67, 66, [2.17, -1.80, -1.93], [-0.00, -0.00, 1.54]);

new yol(68, 67, [-0.03, -1.80, -3.23], [0.10, -0.00, 1.44]);
new yol(68, 69, [-3.43, -1.20, 2.37], [3.10, -0.00, 1.64]);

new yol(69, 68, [3.77, -1.20, 1.27], [-0.00, -0.00, 1.74]);
new yol(69, 71, [-1.63, -0.60, 3.47], [-0.10, 1.00, 1.44]);

new yol(71, 69, [1.27, -0.80, -4.33], [0.10, 0.00, -1.54]);

new yol(72, 63, [3.77, -1.10, -0.13], [-0.00, -0.00, 1.64]);
new yol(72, 74, [-4.23, -0.70, 0.17], [-0.00, -0.00, 1.37]);

new yol(74, 72, [4.27, -0.80, -1.03], [0.04, 0.10, 1.74]);
new yol(74, 75, [0.67, -1.50, 2.57], [-0.00, -0.00, 1.64]);
new yol(74, 77, [-5.43, -0.80, 0.97], [-0.00, -0.00, 1.44]);

new yol(75, 74, [2.67, -1.70, 0.27], [-0.00, -0.00, 1.64]);

new yol(77, 74, [5.28, -0.91, -0.46], [0.04, -0.00, 1.74]);
new yol(77, 78, [-1.73, -1.50, -2.73], [0.10, -0.00, 1.44]);
new yol(77, 81, [-6.93, -0.40, 0.47], [0.01, -0.00, 1.28]);

new yol(78, 77, [2.37, -1.20, -0.93], [-0.00, -0.00, 1.44]);

new yol(81, 77, [5.20, -0.60, -3.73], [0.01, 0.50, -1.38]);

new yol(82, 64, [2.27, -1.70, -0.03], [-0.00, -0.00, 1.64], 90);
new yol(82, 83, [-4.83, -0.80, 0.17], [-0.00, 0.00, 1.34]);

new yol(83, 82, [4.87, -0.80, -0.03], [0.05, -0.3, 1.74]);
new yol(83, 84, [-3.13, -0.90, 0.07], [0.05, 0.30, 1.44]);
new yol(83, 110, [0.02, -1.00, 3.79], [-0.17, 0.00, 1.59]);

new yol(84, 83, [-0.13, -1.00, 3.47], [-0.15, 0.00, 1.54]);
new yol(84, 85, [-2.63, -1.50, -0.73], [0.05, 0.30, 1.44]);
new yol(84, 87, [0.44, -0.61, -7.83], [0.24, 0.00, 1.60]);

new yol(85, 84, [2.17, -1.50, 0.57], [-0.15, 0.30, 1.64]);

new yol(87, 84, [0.16, -0.46, 7.17], [-0.20, 0.10, 1.57]);
new yol(87, 88, [-6.85, -0.49, 0.13], [0.00, 0.12, 1.40]);

new yol(88, 87, [6.75, -0.47, -0.09], [0.00, -0.00, 1.80]);
new yol(88, 89, [-5.05, -0.83, 0.03], [0.00, -0.00, 1.40]);
new yol(88, 107, [-0.06, -0.73, 4.63], [-0.13, -0.00, 1.57]);

new yol(89, 88, [4.39, -0.56, 0.03], [0.00, 0.00, 1.70]);
new yol(89, 90, [-5.05, -0.49, 0.08], [0.04, -0.00, 1.38]);
new yol(89, 102, [-0.08, -0.59, 4.93], [-0.13, -0.00, 1.56]);

new yol(90, 89, [6.91, -0.56, 0.03], [0.00, 0.00, 1.73]);
new yol(90, 91, [-0.09, -1.36, 2.03], [0.00, 0.00, 1.63]);
new yol(90, 92, [-4.01, -0.86, 0.09], [0.00, -0.20, 1.43]);

new yol(91, 90, [1.91, -1.26, 0.13], [-0.04, 0.00, 1.53]);

new yol(92, 90, [-0.09, -0.56, 3.23], [-0.10, 0.40, 1.53]);
new yol(92, 93, [-5.59, -0.56, -0.17], [0.00, 0.00, 1.43]);

new yol(93, 92, [4.41, -0.46, -0.47], [0.00, 0.10, 1.73]);
new yol(93, 94, [-6.39, -0.76, 0.43], [0.00, 0.00, 1.43]);

new yol(94, 93, [4.41, -0.56, -0.31], [-0.00, -0.00, 1.75]);
new yol(94, 95, [-6.59, -0.56, 0.99], [0.00, 0.00, 1.25]);
new yol(94, 97, [0.31, -1.06, 2.23], [0.00, 0.50, 1.63]);

new yol(95, 94, [6.32, -0.58, -0.01], [0.00, 0.00, 1.85]);
new yol(95, 96, [-5.69, -0.56, -0.21], [0.08, 0.20, 1.35]);

new yol(96, 95, [6.32, -0.48, -0.51], [0.00, 0.00, 1.85]);

new yol(97, 94, [2.51, -1.16, -0.37], [0.00, 0, 1.63]);
new yol(97, 98, [-0.69, -1.46, -2.07], [0.00, 0, 1.53]);
new yol(97, 99, [-3.19, -1.26, 0.43], [0.00, 0.00, 1.53]);

new yol(98, 97, [0.84, -1.46, -2.77], [0.00, 0, 1.63]);

new yol(99, 97, [3.74, -1.26, -0.17], [0.00, 0.00, 1.63]);
new yol(99, 100, [-1.16, -1.46, -2.90], [0.00, 0.00, 1.51]);
new yol(99, 101, [-6.24, -0.66, 0.47], [0.00, 0.00, 1.43]);

new yol(100, 99, [2.00, -1.56, -3.09], [0.10, 0.00, 1.53]);

new yol(101, 99, [6.12, -0.66, 0.33], [0.00, 0.00, 1.73]);
new yol(101, 102, [-0.30, -0.66, 5.97], [-0.16, -0.00, 1.58]);
new yol(101, 104, [-6.24, -0.60, -0.43], [0.00, 0.00, 1.43]);

new yol(102, 89, [-5.24, -0.70, -0.03], [0.00, 0.00, 1.43]);
new yol(102, 101, [7.40, -0.66, -0.13], [0.00, 0.00, 1.78]);

new yol(104, 110, [-5.24, -0.51, 0.22], [0.00, 0.00, 1.43]);
new yol(104, 101, [6.15, -0.83, -0.55], [0.00, 0.00, 1.74]);
new yol(104, 105, [-0.16, -0.85, 3.79], [-0.05, 0.00, 1.56]);

new yol(105, 104, [4.20, -1.06, -0.37], [0.00, 0.00, 1.78]);
new yol(105, 106, [-0.26, -1.45, -2.71], [0.15, 0.00, 1.48]);
new yol(105, 107, [-6.27, -0.81, -0.25], [0.00, 0.00, 1.43]);

new yol(106, 105, [2.54, -1.45, -1.01], [0.10, -0.00, 1.54]);

new yol(107, 88, [-5.17, -0.91, -0.25], [0.00, 0.00, 1.43]);
new yol(107, 105, [5.60, -0.86, 0.03], [0.00, 0.00, 1.78]);
new yol(107, 108, [-0.72, -1.55, 2.59], [-0.00, 0.00, 1.49]);

new yol(108, 107, [3.48, -1.75, 1.39], [-0.00, 0.00, 1.69]);

new yol(110, 83, [4.28, -0.95, -0.34], [0.00, 0.00, 1.69]);
new yol(110, 104, [-6.30, -0.81, 0.69], [0.00, 0.00, 1.39]);

//arge merkezi

new yol(111, 112, [-4.02, -1.00, -0.19], [-3.26, 0.69, 1.78]);

new yol(112, 111, [2.02, -2.20, 0.19], [0, 0, 1.68]);
new yol(112, 113, [-4.02, -1.20, -1.39], [0.00, -0.00, 1.57]);
new yol(112, 127, [-3.42, -1.40, 0.01], [0.00, -0.00, 1.57]);

new yol(113, 114, [-5.42, -1.42, 1.51], undefined, [-90, -20]);
new yol(113, 112, [3.28, -1.32, 1.51], [-0.00, 0.00, 1.70]);
new yol(113, 127, [0.68, -1.62, 1.81], [0.00, 0.00, 1.60]);

new yol(114, 126, [-4.21, -4.14, -0.09], undefined);
new yol(114, 113, [-4.21, -4.75, -0.09], undefined);

new yol(115, 126, [-1.96, -1.31, -2.39], [0.20, 1.40, 1.40]);
new yol(115, 124, [-3.86, -0.81, 3.21], [0.20, 1.17, 1.33]);

new yol(116, 117, [-4.96, -0.77, 0.31], [0.20, 1.10, 1.40]);
new yol(116, 126, [0.23, -1.07, 4.31], [0.20, 1.40, 1.30]);

new yol(117, 116, [-0.07, -0.87, -4.89], [0.10, -0.00, 1.6]);
new yol(117, 118, [0.14, -0.67, 4.56], [-0.10, 0.00, 1.58]);
new yol(117, 124, [4.94, -0.72, -0.03], [-0.02, -0.00, 1.80]);


new yol(118, 119, [-3.67, -0.77, -0.06], [0.15, 0.80, 1.39]);
new yol(118, 117, [4.93, -0.67, -0.35], [-0.07, 3.31, 1.41]);

new yol(119, 118, [3.33, -1.07, 1.95], [-0.07, 3.31, 1.51]);
new yol(119, 120, [-4.57, -0.77, -2.45], [-0.17, -1.19, 1.31]);

new yol(120, 119, [-2.77, -0.77, 3.55], [-0.23, -1.18, 1.42]);
new yol(120, 121, [-4.57, -0.82, -3.98], [-0.17, -1.19, 1.24]);


new yol(121, 120, [-0.12, -0.77, 6.24], [-0.23, -1.18, 1.52]);
new yol(121, 129, [-4.57, -0.72, -0.04], [0.13, 0.61, 1.34]);

new yol(122, 129, [3.66, -0.97, 0.01], [-0.03, 0.12, 1.72]);
new yol(122, 123, [-4.86, -0.67, -0.04], [0.00, 0.00, 1.40]);

new yol(123, 122, [0.10, -0.57, 4.31], [-0.13, 0.23, 1.56]);
new yol(123, 124, [-2.37, -1.22, 0.06], [-0.02, 0.10, 1.48]);


new yol(124, 115, [5.29, -0.88, -0.48], [0.00, 0.02, 1.71]);
new yol(124, 123, [0.99, -1.72, 2.75], [0.05, -0.00, 1.62]);
new yol(124, 125, [-4.27, -1.02, 0.26], [0.01, 0.10, 1.48]);
new yol(124, 117, [-0.52, -0.80, -5.07], [0.10, 0.00, 1.56]);

new yol(125, 124, [-4.27, -0.92, -0.44], [0.02, -0.00, 1.48]);

new yol(126, 114, [-5.76, -1.81, 2.31], undefined, [-90, -20]);
new yol(126, 115, [0.24, -1.31, 3.41], [0.00, 1.60, 1.40]);
new yol(126, 116, [-0.06, -1.11, -4.49], [0.00, 1.60, 1.80]);

new yol(127, 112, [2.73, -1.32, 0.16], [0.00, 0.00, 1.55]);
new yol(127, 113, [-0.57, -1.52, -1.84], [0.00, 0.00, 1.55]);

new yol(129, 121, [1.20, -0.70, -3.74], [-0.00, 1.13, 1.66]);
new yol(129, 122, [-1.22, -0.97, 3.94], [-0.23, -1.58, 1.42]);

new yol(130, 4, [-1.70, -0.17, 5.78], [1.38, 1.49, 3.10]);
new yol(130, 51, [-5.02, -0.30, -0.45], [0.02, 0.00, 1.42]);
//arge merkezi

function konum_goster_gizle(acilacaklar = [], durum = true) {
    for (var w = 1; w <= konumlar.length - 1; w++) {
        for (var e = 0; e < konumlar[w].mesh.children.length; e++) {
            var anlik_yol = konumlar[w].mesh.children[e];
            if (anlik_yol != undefined) {
                if (anlik_yol.yeni != undefined) {
                    for (var k = 0; k < acilacaklar.length; k++) {
                        if (acilacaklar[k] == anlik_yol.yeni) { // it will return true if you `foo` is one of array values else false
                            anlik_yol.visible = durum;
                        }
                    }
                }
            }
        } /*//*/
    }
}

konum_goster_gizle([116], false)
///yol marker






konumlar[ilk].getir();
/*/
///silinecek
const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	const kirmizi = urlParams.get("konum");
ilk=kirmizi;
if(ilk==null){ilk=1
}else{ilk=parseInt(ilk)}

///silinecek
konumlar[ilk].getir();


///silinecek
////test küp daha sonra silinecek
var giden=ilk;
var gelen = ilk+1;
const cube = new THREE.Mesh( marker_sekil, materialc );
cube.position.x = 5;cube.position.y = 5;
//scene.add( cube );
cube.material.transparent=true;
cube.material.opacity=.3;
window.sayac=0;
cube.on('click', function(ev) {
	if(gelen==konumlar.length){gelen=1;}else if(giden==konumlar.length){giden=1}
	  konumlar[gelen].getir(giden);
	  console.log(gelen);

	  giden++;gelen++;
});
//scene.add(cube);
////test küp daha sonra silinecek
///silinecek
/*/



var info_buton_texture = new THREE.TextureLoader().load('./img/info.svg');
///info box buton
function info_buton(kure = 1, id = 0, p = [0, 0, 0], r = [0, 0]) {
    var imaterial = new THREE.SpriteMaterial({
        map: info_buton_texture,
        transparent: true
    });
    this.mesh = new THREE.Sprite(imaterial);
    this.mesh.position.set(p[0], p[1], p[2]);
    konumlar[kure].mesh.add(this.mesh);
    imlec(this.mesh);

    ///silinecek
    this.mesh.on('mouseover', function() {
        dondur = this;
        window.dondur = this;
    });
    ///silinecek
    dondur = this.mesh;
    window.dondur = this.mesh;

    this.mesh.animasyon = scale_animasyon(this.mesh, [1, 1, 1]);
    this.mesh.animasyon.play();
    this.mesh.name = "aciklama_" + id;
    //const aciklama_div=document.getElementsByClassName('aciklama')[id];
    const aciklama_div = $(".aciklama_" + id)[0];


    var aciklama_div_test = document.createElement("div");
    aciklama_div_test.classList.add('aciklama');
    aciklama_div_test.classList.add('aciklama_' + id);



    aciklama_div_test.innerHTML = aciklama_div.innerHTML;
    container.appendChild(aciklama_div_test);

    const aciklama_obje = new CSS2DObject(aciklama_div_test);
    aciklama_obje.position.set(0, 0, 0);


    this.mesh.add(aciklama_obje);
    $(".gizle.aciklama_" + id).remove();


    this.mesh.children[0].visible = lms_veri["acik_infolar"][id];
    if (lms_veri["info_butonlar"][id]) {
        this.mesh.animasyon.stop();
    }

    if (lms_veri["info_butonlar"][id] != true) {
        lms_veri["info_butonlar"][id] = false
    }
    if (lms_veri["acik_infolar"][id] != true) {
        lms_veri["acik_infolar"][id] = false
    }

    this.mesh.on('click', function() {
        lms_veri["info_butonlar"][id] = true;
        this.animasyon.stop();
        for (var i = 1; i <= konumlar.length - 1; i++) {
            var animasyonlu_obje = konumlar[i].mesh.getObjectByName('aciklama_' + id)
            if (animasyonlu_obje != undefined) {
                animasyonlu_obje.animasyon.stop();

                if (animasyonlu_obje.children[0].visible) {
                    animasyonlu_obje.children[0].visible = false;
                    lms_veri["acik_infolar"][id] = false;
                } else {
                    animasyonlu_obje.children[0].visible = true;
                    lms_veri["acik_infolar"][id] = true;
                }
            }
        }
        lms_veri_kaydet();
    });

    this.mesh.children[0].element.firstChild.addEventListener('click', function() {
        aciklama_obje.visible = false;
        lms_veri["acik_infolar"][id] = false;
        for (var i = 1; i <= konumlar.length - 1; i++) {
            var animasyonlu_obje = konumlar[i].mesh.getObjectByName('aciklama_' + id)
            if (animasyonlu_obje != undefined) {
                animasyonlu_obje.children[0].visible = false;
            }
        }
        lms_veri_kaydet();
    });


}
new info_buton(111, 1, [-6.94, 1.99, -3.45]);

new info_buton(112, 2, [-7.92, 0.89, -0.67]);
new info_buton(113, 2, [-4.71, 1.48, 6.30]);
new info_buton(127, 2, [-7.64, 1.69, -1.67]);

new info_buton(116, 3, [1.27, 0.57, 7.88]);
new info_buton(115, 3, [-1.33, 0.98, -7.83]);
new info_buton(126, 3, [6.60, 1.17, 4.36]);

new info_buton(115, 4, [-6.84, 0.78, 4.07]);

new info_buton(124, 5, [-6.92, 0.90, -3.92]);

new info_buton(119, 6, [-4.59, 0.45, 6.54]);

new info_buton(129, 7, [-7.62, 1.35, 2.02]);

new info_buton(20, 8, [-5.98, 0.27, 5.31]);
new info_buton(22, 8, [-5.76, -0.03, -5.55]);


new info_buton(18, 9, [-3.99, 0.97, -6.86]);
new info_buton(19, 9, [-7.53, 1.21, -2.42]);


new info_buton(94, 10, [-1.61, 0.66, 7.81]);
new info_buton(97, 10, [-4.33, 1.21, -6.62]);
new info_buton(99, 10, [7.45, 0.79, -2.82]);

new info_buton(44, 11, [-7.98, 0.30, -0.47]);

new info_buton(47, 13, [-7.53, 0.39, 2.68]);

new info_buton(83, 19, [-7.55, 0.89, -2.50]);
new info_buton(82, 19, [-7.98, 0.39, -0.48]);

new info_buton(83, 20, [-7.87, 0.59, 1.32]);
new info_buton(84, 20, [-6.42, 1.30, -4.60]);
new info_buton(87, 20, [-0.67, 0.39, 7.96]);

new info_buton(104, 21, [-1.53, 0.73, 7.82]);
new info_buton(105, 21, [2.39, 1.38, -7.50]);
new info_buton(107, 21, [7.98, 0.52, -0.33]);

new info_buton(88, 22, [-1.50, 0.49, 7.84]);
new info_buton(105, 22, [-8, 0.28, 0.30]);
new info_buton(107, 22, [-5.02, 1.42, 6.07]);

new info_buton(87, 23, [-7.79, 0.49, -1.80]);
new info_buton(88, 23, [-0.45, 0.89, -7.94]);
new info_buton(89, 23, [7.89, 0.58, -1.20]);

new info_buton(12, 24, [-7.37, 0.26, 3.10]);
new info_buton(13, 24, [-2.38, 0.58, 7.62]);
new info_buton(16, 24, [-0.21, -0.20, 7.99]);
new info_buton(17, 24, [7.40, 0.48, 2.99]);


new info_buton(34, 25, [-7.84, 0.60, 1.47]);
new info_buton(36, 25, [-6.86, 1.11, 3.96]);
new info_buton(38, 25, [-3.71, 0.51, 7.07]);
new info_buton(60, 25, [-2.52, 1.01, -7.53]);

new info_buton(15, 26, [-7.96, 0.21, 0.77]);
new info_buton(16, 26, [-7.93, 0.30, -1.01]);
new info_buton(57, 26, [-7.91, 0.61, -1.03]);
new info_buton(72, 26, [7.93, 0.33, -1.04]);
new info_buton(67, 26, [7.74, 0.50, -1.95]);
new info_buton(68, 26, [1.45, 0.59, -7.85]);
//new info_buton(82,26,[7.93,1.01,0.27]);

new info_buton(60, 27, [-7.92, 0.41, 1.02]);
new info_buton(63, 27, [-3.02, 1.11, 7.32]);
new info_buton(64, 27, [7.83, 0.40, 1.61]);


new info_buton(72, 28, [-7.95, 0.25, -0.89]);
new info_buton(74, 28, [-2.37, -0.33, -7.63]);
new info_buton(77, 28, [-1.37, -0.50, -7.87]);


new info_buton(82, 29, [-7.71, 0.39, 2.08]);
new info_buton(83, 29, [1.27, 0.47, 7.88]);
new info_buton(104, 29, [-7.95, 0.53, -0.67]);
new info_buton(110, 29, [6.57, 0.81, 4.50]);


new info_buton(63, 30, [-7.92, 0.41, 1.06]);
new info_buton(64, 30, [-2.55, 0.90, 7.53]);

new info_buton(66, 31, [-2.43, 0.61, -7.60]);
new info_buton(67, 31, [-7.93, 0.61, 0.90]);
new info_buton(69, 31, [7.95, 0.71, 0.60]);

new info_buton(20, 32, [-7.37, 0.27, 3.09]);
new info_buton(21, 32, [-5.91, 0.63, 5.36]);


new info_buton(28, 33, [-7.72, -0.07, 2.10]);
new info_buton(30, 33, [1.51, 0.20, -7.85]);
new info_buton(31, 33, [6.71, 0.00, -4.35]);
new info_buton(32, 33, [7.51, 0.10, -2.75]);






///info box buton










/*/

//////////////////////////////////////////////////

var serbest=true;
var cevirx=0;
var ceviry=0;
var oran = 1;
document.addEventListener( 'keydown', function ( event ) {
	

	switch (event.keyCode){
		case 81:
			dondur.position.x+=.1*oran;
		break;
		case 65:
			dondur.position.x-=.1*oran;
		break;
		case 87:
			dondur.position.y+=.1*oran;
		break;
		case 83:
			dondur.position.y-=.1*oran;
		break;	
		case 69:
			dondur.position.z+=.1*oran;
		break;
		case 68:
			dondur.position.z-=.1*oran;
		break;
		case 73:
			dondur.rotation.x+=.1*oran;
		break;
		case 75:
			dondur.rotation.x-=.1*oran;
		break;
		case 79:
			dondur.rotation.y+=.1*oran;
		break;
		case 76:
			dondur.rotation.y-=.1*oran;
		break;	
		case 80:
			dondur.rotation.z+=.1*oran;
		break;
		case 186:
			dondur.rotation.z-=.1*oran;
		break;
		case 49:
			camera.position.y+=.1*oran;
		break;	
		case 50:
			camera.position.y-=.1*oran;
		break;

		case 51:
			camera.position.x+=.1*oran;
		break;	
		case 52:
			camera.position.x-=.1*oran;
		break;

		case 53:
			camera.position.z+=.1*oran;
		break;	
		case 54:
			camera.position.z-=.1*oran;
		break;
		case 55:
			lon=0;lat=0;
		break;	
		case 56:
			lon=0;lat=0;
		break;
		case 32:
			onPointerDownMouseX = 0;
			onPointerDownMouseY = 0;
			lon = 0;
			onPointerDownLon = 0;
			lat = 0;
			onPointerDownLat = 0;
			phi = 0;
			theta = 0;/*/
/*/
		break;
		case 90:
			oran*=10;
			console.log(oran);
		break;
		case 88:
			console.log(oran);
			oran*=.1;                               
		break;	
		case 37:
			cevirx-=.1*oran;
			kure.cevir(cevirx,ceviry);console.log(","+parseFloat(cevirx).toFixed(2)+","+parseFloat(ceviry).toFixed(2));
		break;
		case 39:
			cevirx+=.1*oran;
			kure.cevir(cevirx,ceviry); console.log(","+parseFloat(cevirx).toFixed(2)+","+parseFloat(ceviry).toFixed(2));
		break;
			
		case 40:
			ceviry-=.05*oran;
			kure.cevir(cevirx,ceviry);console.log(","+parseFloat(cevirx).toFixed(2)+","+parseFloat(ceviry).toFixed(2));
		break;
		case 38:
			ceviry+=.05*oran;
			kure.cevir(cevirx,ceviry);console.log(","+parseFloat(cevirx).toFixed(2)+","+parseFloat(ceviry).toFixed(2));
		break;
		case 13:

			if(gelen==konumlar.length){gelen=1;}else if(giden==konumlar.length){giden=1}
		  konumlar[gelen].getir(giden);
		  console.log(gelen);
			
		  giden++;gelen++;
			
		
		break;
			case 8:
			var geri_gelen=gelen-2;var geri_giden=giden;
			
			if(geri_gelen==0){geri_gelen=konumlar.length-1;giden=konumlar.length;gelen=konumlar.length+1}
			
			konumlar[geri_gelen].getir(geri_giden);
		  console.log(geri_gelen,geri_giden,gelen);
			
		  giden--;gelen--;
		break;	
		case 82:
			console.log(((dondur.material.rotation/.01745)+1).toFixed(0));
			dondur.material.rotation+=1*.01745;
		break;
		case 70:
			console.log(((dondur.material.rotation/.01745)-1).toFixed(0));
			dondur.material.rotation-=1*.01745;
		break;
			
	}
	
	var dondur_keycode=[81,65,87,83,69,68,73,75,79,76,80,186];

	for (var i = dondur_keycode.length - 1; i >= 0; i--) {
		if(event.keyCode==dondur_keycode[i]){
			console.log("["+dondur.position.x.toFixed(2)+","+dondur.position.y.toFixed(2)+","+dondur.position.z.toFixed(2)+"],["+dondur.rotation.x.toFixed(2)+","+dondur.rotation.y.toFixed(2)+","+dondur.rotation.z.toFixed(2)+"]");
			console.log(Math.sqrt(dondur.position.x.toFixed(2)*dondur.position.x.toFixed(2)+dondur.position.z.toFixed(2)*dondur.position.z.toFixed(2)+dondur.position.y.toFixed(2)*dondur.position.y.toFixed(2)).toFixed(2));
		}
	}
	
	
	
	
	
	
	
	if (event.getModifierState("CapsLock")) {
    serbest=false;
  } else {
    serbest=true;
  }
	
	//console.log(event.keyCode);
});
//////////////////////////////////////////////////
/*/


function onPointerDown(event) {
    if (event.isPrimary === false) return;
    isUserInteracting = true;
    onPointerDownMouseX = event.clientX;
    onPointerDownMouseY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
    container.addEventListener('pointermove', onPointerMove);
    container.addEventListener('pointerup', onPointerUp);
}

function onPointerMove(event) {
    if (event.isPrimary === false) return;
    if (window.mobileCheck()) {
        lon = (onPointerDownMouseX - event.clientX) * 0.17 + onPointerDownLon;
        lat = (event.clientY - onPointerDownMouseY) * 0.17 + onPointerDownLat;
    } else {
        lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
    }
    lms_veri['lon'] = lon;
    lms_veri['lat'] = lat;
    lms_veri_kaydet();
}

function onPointerUp(event) {
    if (event.isPrimary === false) return;
    isUserInteracting = false;
    container.removeEventListener('pointermove', onPointerMove);
    container.removeEventListener('pointerup', onPointerUp);

}

window.addEventListener('resize', onWindowResize);

function onWindowResize() {
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    $('.harita .icerik').css('transform', 'translate(-50%, -50%) scale(' + Math.min(1, Math.min(1, window.innerWidth / $('.harita .icerik')[0].offsetWidth), Math.min(1, window.innerHeight / $('.harita .icerik')[0].offsetHeight)) + ')');
    if ($('.lo_gizle').css('height') != "0px") $('.lo_gizle').css('height', "calc(" + $('.lokasyonlar#tr').css('height') + " + 30px");
    if ($('.lo_gizle2').css('height') != "0px") $('.lo_gizle2').css('height', "calc(" + $('.lokasyonlar#en').css('height') + " + 30px");
}








function update() {
    requestAnimationFrame(update);
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);
    ///silinecek
    /*/
    if(serbest){
    camera.lookAt( x, y, z );
    $('.nokta').css('opacity',0)}
    else{
    camera.lookAt( x, y, 0 );
    $('.nokta').css('opacity',.3)}  /*/
    /*/	/*/
    ///silinecek
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}

/////////////////////////////html
window.addEventListener('load', (event) => {
    onWindowResize();
});

//dil
function dil_cevir(dil = "tr") {
    $('.dil').css('display', 'none');
    $('.' + dil).css('display', 'block');
    $('li.' + dil).css('display', 'list-item');
}


$('.dil_buton').click(function() {
    dil_cevir($(this).attr("dil"));
    lms_veri["dil"] = $(this).attr("dil");
    lms_veri["dil_secim_durum"] = true;
    lms_veri_kaydet();
});
dil_cevir(lms_veri["dil"]);
//dil

//frame
$('.frame').click(function(event) {
    if (event.target == this) {
        frame_kapat();
    }
});

function frame_kapat() {
    $('.frame').css('display', 'none');
    $('.frame iframe').attr('src', "");
}

function frame_ac(link) {
    $('.frame').css('display', 'flex');
    $('.frame iframe').attr('src', link);
}
$(".frame-kapat").click(function() {
    frame_kapat();
});
//frame

//sol menü
$(".menu_toogle").click(function() {
    if ($('header').css("left") == "0px") {
        $('header').css("left", $('header').width() * -1);
    } else {
        $('header').css("left", 0);
    }
});
$('.nav li a.link').click(function() {
    frame_ac($(this).attr(lms_veri["dil"]));
    $(".menu_toogle").click();
});
//sol menü

//alt menü
$(".nav_toogle").click(function() {
    $(".nav_toogle").toggleClass('active');
    $(".navigasyon").toggleClass('acik');
});
//alt menü

//maps
$(".map_icon").click(function() {
    $('.harita').toggleClass('acik');
});
$(".harita_kapat").click(function() {
    $('.harita').removeClass('acik');
});
$('.harita').click(function(event) {
    if (event.target == this) {
        $('.harita').removeClass('acik');
    }
});
//maps
//ses
var back_ses = document.getElementById('back_ses');
$('.ses').click(function() {
    lms_veri['ses'] = !lms_veri['ses'];
    ses_oynat();
});

function ses_oynat() {
    back_ses.play();
    if (lms_veri['ses']) {
        $('.ses').addClass('acik');
        back_ses.muted = false;
    } else {
        $('.ses').removeClass('acik');
        back_ses.muted = true;
    }
}
$(document).click(function() {
    ses_oynat()
});
ses_oynat();
//ses



$(document).on("click", ".nav_buton", function() {
    var na = $(this).attr('aci') != undefined ? parseInt($(this).attr('aci')) : 0;
    if (parseInt($(this).attr('kure')) != lms_veri["konum"])
        konumlar[parseInt($(this).attr('kure'))].getir(lms_veri["konum"], [na, 0]);
    $('.giris').addClass("gizle");
    lms_veri['giris_yazi'] = false;
    $('.harita').removeClass('acik');
});
if (lms_veri['giris_yazi'] == false) {
    $('.giris').addClass("gizle");
}









$('.owl-carousel').owlCarousel({
    loop: true,
    nav: false,
    items: $('.navigasyon').width() / 110,
});


var myTimeout;
var myTimeout2;

$('.dil_secenek div img').click(function(event) {
    myTimeout = setTimeout(typewriter, speed);
    myTimeout2 = setTimeout(typewriter2, speed);
    $('.dil_secenek').addClass('gizle');
});
if (lms_veri["dil_secim_durum"]) {
    if (lms_veri['giris_yazi']) {
        myTimeout = setTimeout(typewriter, speed);
        myTimeout2 = setTimeout(typewriter2, speed);
    }
    $('.dil_secenek').addClass('gizle');
}


////test
var p = document.querySelector("#target");
var p2 = document.querySelector("#target2");
var speed = 10;
var paragraflar = ["Merhaba,   / Sanovel Silivri Fabrika oryantasyon eğitimine hoş geldin!/   Biz seni ağırlamanın mutluluğunu yaşarken,   sen de Silivri fabrikamızı 360° gezerek önemli lokasyonların bilgilerini öğrenme fırsatı yakalayacaksın.      ", "İlerlemek için ekranda # ikonunu göreceksin,   bu ikonlara tıklayarak ilerleyebilirsin./       Ekranın solundaki { ikonuna tıklayarak eğitim menüsüne,   ekranın altında bulunan } ikonuyla da istediğin lokasyona hızlıca erişebilirsin./      Ayrıca sağ köşede bulunan * ikonu üzerinden kuşbakışı haritamıza istediğin zaman ulaşabilirsin.", "|Hazırsan gitmek istediğin lokasyona tıklayarak bu sıra dışı yolculuğa başlayabilirsin.    $"];

var paragraflar2 = ["Hello,   / Welcome to the onboarding of Sanovel's Silivri Factory!/  We are thrilled to give you the opportunity to visit our Silivri factory in 360° and learn more about its important locations.      ", "You will see the # icon on the screen,    you can click on these icons to progress./  You can quickly access the onboarding menu by clicking this { icon on the left side of the screen, and by clicking this } icon at the bottom, you can easily get to the location to which you want to go.", "|If you are ready, you can start this extraordinary journey by selecting the location you want to go to.    $"];

var paragraf = 0;
var paragraf2 = 0;
var i = 0;
var i2 = 0;

var sil = false;
var sil2 = false;

function typewriter() {
    if ($(".loading")[0].style.display == "none") {
        if (sil) {
            if (paragraf != paragraflar.length - 1) {
                p.innerHTML = "";
            }
            sil = false;
            clearTimeout(myTimeout);
            myTimeout = setTimeout(typewriter, speed);
            paragraf++;
            i = 0;

        }
        if (paragraf <= paragraflar.length - 1) {
            if (i < paragraflar[paragraf].length) {
                p.innerHTML += paragraflar[paragraf].charAt(i).replace("/", " <br>");
                if (paragraflar[paragraf].charAt(i) == "#") {
                    p.innerHTML += "<img src='img/konum.svg'>";
                    p.innerHTML = p.innerHTML.replace("#", "")
                }
                if (paragraflar[paragraf].charAt(i) == "{") {
                    p.innerHTML += "<img src='img/menu2.svg'>";
                    p.innerHTML = p.innerHTML.replace("{", "")
                }
                if (paragraflar[paragraf].charAt(i) == "}") {
                    p.innerHTML += "<img src='img/list-icon.svg' class='ucgen' style='transform: rotate(-135deg);transform-origin: 15px 18px;margin: 0 5px;'>";
                    p.innerHTML = p.innerHTML.replace("}", "")
                }

                if (paragraflar[paragraf].charAt(i) == "*") {
                    p.innerHTML += "<img src='img/harita.png'>";
                    p.innerHTML = p.innerHTML.replace("*", "")
                }
                if (paragraflar[paragraf].charAt(i) == "$") {
                    $('.lo_gizle').css('height', "calc(" + $('#tr').css('height') + " + 30px");
                    p.innerHTML = p.innerHTML.replace("$", "")
                }
                if (paragraflar[paragraf].charAt(i) == "|") {
                    p.align = "center";
                    p.innerHTML = p.innerHTML.replace("|", "")
                }



                i++;
                clearTimeout(myTimeout);
                myTimeout = setTimeout(typewriter, speed);
            } else {
                clearTimeout(myTimeout);
                myTimeout = setTimeout(typewriter, 1000);
                sil = true;
            }
        } else {
            $('.lo_gizle').css('transition', "none");
        }
    } else {
        clearTimeout(myTimeout);
        myTimeout = setTimeout(typewriter, 1);
    }

}

function typewriter2() {
    if ($(".loading")[0].style.display == "none") {
        if (sil2) {
            if (paragraf2 != paragraflar2.length - 1) {
                p2.innerHTML = "";
            }
            sil2 = false;
            clearTimeout(myTimeout2);
            myTimeout2 = setTimeout(typewriter2, speed);
            paragraf2++;
            i2 = 0;

        }
        if (paragraf2 <= paragraflar2.length - 1) {
            if (i2 < paragraflar2[paragraf2].length) {
                p2.innerHTML += paragraflar2[paragraf2].charAt(i2).replace("/", " <br>");
                if (paragraflar2[paragraf2].charAt(i2) == "#") {
                    p2.innerHTML += "<img src='img/konum.svg'>";
                    p2.innerHTML = p2.innerHTML.replace("#", "")
                }
                if (paragraflar2[paragraf2].charAt(i2) == "{") {
                    p2.innerHTML += "<img src='img/menu2.svg'>";
                    p2.innerHTML = p2.innerHTML.replace("{", "")
                }
                if (paragraflar2[paragraf2].charAt(i2) == "}") {
                    p2.innerHTML += "<img src='img/list-icon.svg' class='ucgen' style='transform: rotate(-135deg);transform-origin: 15px 18px;margin: 0 5px;'>";
                    p2.innerHTML = p2.innerHTML.replace("}", "")
                }

                if (paragraflar2[paragraf2].charAt(i2) == "*") {
                    p2.innerHTML += "<img src='img/harita.png'>";
                    p2.innerHTML = p2.innerHTML.replace("*", "")
                }
                if (paragraflar2[paragraf2].charAt(i2) == "$") {
                    $('.lo_gizle2').css('height', "calc(" + $('#en').css('height') + " + 30px");
                    p2.innerHTML = p2.innerHTML.replace("$", "")
                }
                if (paragraflar2[paragraf2].charAt(i2) == "|") {
                    p2.align = "center";
                    p2.innerHTML = p2.innerHTML.replace("|", "")
                }
                i2++;
                clearTimeout(myTimeout2);
                myTimeout2 = setTimeout(typewriter2, speed);
            } else {
                clearTimeout(myTimeout2);
                myTimeout2 = setTimeout(typewriter2, 1000);
                sil2 = true;
            }
        } else {
            $('.lo_gizle2').css('transition', "none");
        }
    } else {
        clearTimeout(myTimeout2);
        myTimeout2 = setTimeout(typewriter2, 1);
    }
}

////test





















update(); // JavaScript Document