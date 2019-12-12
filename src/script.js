scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);
scene.fog = new THREE.Fog(scene.background, 1, 1000);

var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 800);
camera.position.set(10, 10, 10);

var renderCalls = [];
function render () {
    requestAnimationFrame(render);
    renderCalls.forEach((callback)=>{callback();});
}

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.shadowMap.enabled = true;

function renderScene(){ 
    renderer.render(scene, camera); 
}

// refaz o tamanho do canvas
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

// Movimentos com o mouse
var controls = new THREE.OrbitControls(camera);
controls.rotateSpeed = 0.3;
controls.zoomSpeed = 0.5;
controls.minDistance = 5;
controls.maxDistance = 50;
controls.minPolarAngle = 0; // radians
controls.maxPolarAngle = Math.PI /2; // radians
controls.enableDamping = true;
controls.dampingFactor = 0.1;
//Remover movimentos com o teclado
controls.keyPanSpeed = 0;
renderCalls.push(function(){
  controls.update()
});


//Luz
hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1);
hemiLight.color.setHSL(0.6, 1, 0.6);
hemiLight.groundColor.setHSL(0.095, 1, 0.75);
hemiLight.position.set(0, 50, 0);
scene.add( hemiLight );

dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
var d = 50;
dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;
dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;
scene.add( dirLight );

// Chão
var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
var groundMat = new THREE.MeshLambertMaterial({color: 0xffffff});
groundMat.color.setHSL( 0.095, 1, 0.75 );
var ground = new THREE.Mesh( groundGeo, groundMat );
ground.position.y = - 33;
ground.rotation.x = - Math.PI / 2; //Rodar 90graus
ground.receiveShadow = true;
scene.add( ground );

// Model
var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;
loader.load( 'assets/models/charizard_final.gltf', function (data) {
    var object = data.scene;
    object.position.set(0, 3, 0);
    object.castShadow = true;
    object.receiveShadow = true;
    TweenMax.from(object.position, 3, {
        y: 1,
        yoyo: true,
        repeat: -1,
        ease: 'Power2.easeInOut'
    });
                
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 39) {
            object.position.x += .1;
        } else if(keyCode == 37) {
            object.position.x -= .1;
        } else if(keyCode == 40) {
            object.position.z += .1;
        } else if(keyCode == 38){
            object.position.z -= .1;
        }else if(keyCode == 65){
            object.rotateY(.3);
        }else if(keyCode == 83){
            object.rotateX(.3);
        }else if(keyCode == 68){
            object.rotateY(-.3);
        }else if(keyCode == 87){
            object.rotateX(-.3);
        }
    };
    scene.add(object);
});

renderCalls.push(renderScene);
render();
document.body.appendChild(renderer.domElement);
