const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio || 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const pmremGenerator = new THREE.PMREMGenerator(renderer);
const tex = pmremGenerator.fromScene(new THREE.RoomEnvironment(), 0.02).texture;
scene.environment = tex;
scene.background = tex;

const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);

camera.position.z = 5;

const color = {
  fg: '#007ec3' };


const geo = new THREE.TorusGeometry(1, 0.4, 32, 24);
const mat = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(color.fg),
  roughness: 0.3,
  metalness: 0.0,
  iridescence: 1,
  iridescenceIOR: 1.5,
  transmission: 1,
  ior: 2.4,
  thickness: 1 });

const mesh = new THREE.Mesh(geo, mat);

scene.add(mesh);

const resize = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
};

resize();
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => requestAnimationFrame(resize));

const gui = new dat.GUI();
gui.add(mat, 'roughness').
min(0.0).
max(1.0);

gui.add(mat, 'metalness').
min(0.0).
max(1.0);

gui.add(mat, 'transmission').
min(0.0).
max(1.0);

gui.add(mat, 'ior').
min(1.0).
max(5.0);

gui.add(mat, 'thickness').
min(0.0).
max(5.0);

gui.add(mat, 'iridescence').
min(0.0).
max(1.0);

gui.add(mat, 'iridescenceIOR').
min(1).
max(Math.PI * 2);

gui.addColor(color, 'fg').
onChange(value => {
  mat.color = new THREE.Color(color.fg);
}).
name('color');




const render = () => {

  mesh.rotation.y += 0.001;

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

requestAnimationFrame(render);