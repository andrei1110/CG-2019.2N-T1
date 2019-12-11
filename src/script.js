const backgroundColor = 0xcccccc;

var renderCalls = [];
function render () {
    requestAnimationFrame( render );
    renderCalls.forEach((callback)=>{ callback(); });
}
render();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
camera.position.set(10,10,10);

var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( backgroundColor );//0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );

window.addEventListener( 'resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}, false );

document.body.appendChild( renderer.domElement);

function renderScene(){ renderer.render( scene, camera ); }
renderCalls.push(renderScene);

var controls = new THREE.OrbitControls( camera );

controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.5;

controls.minDistance = 1;
controls.maxDistance = 150;

controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI /2; // radians

controls.enableDamping = true;
controls.dampingFactor = 0.05;

renderCalls.push(function(){
  controls.update()
});

var light = new THREE.PointLight( 0xffffff, 40, 200 );
light.position.set( 100, 100, 100);
scene.add( light );

var light = new THREE.PointLight( 0xffffff, 40, 200 );
light.position.set( -100, -100, -100);
scene.add( light );


var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;
loader.load( 'assets/models/charizard_final.gltf', function ( data ) {
    var object = data.scene;
    object.position.set(0, 0, 0);

    TweenMax.from( object.position, 3, {
        y: -2,
        yoyo: true,
        repeat: -1,
        ease: 'Power2.easeInOut'
    });
    scene.add( object );
});
