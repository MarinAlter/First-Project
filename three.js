$(document).ready(function () {
	console.log("charlotte is a bcoas");
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
	const renderer = new THREE.WebGLRenderer();
	$(".body").append(renderer.domElement);
	const sphereGeom = new THREE.SphereGeometry(1, 28, 32);
	var textureLoader = new THREE.TextureLoader();
	const sphereTexture = new THREE.TextureLoader().load("https://2.bp.blogspot.com/-Jfw4jY6vBWM/UkbwZhdKxuI/AAAAAAAAK94/QTmtnuDFlC8/s1600/2_no_clouds_4k.jpg");
	var earthMap = textureLoader.load("assets/planetPics/earthmap1k.jpg");
	var earthBump = textureLoader.load("assets/planetPics/earthbump1k.jpg");
	var earthSpec = textureLoader.load("assets/planetPics/earthspec1k.jpg");
	renderer.setSize(window.innerWidth, window.innerHeight);
	//const geom = new THREE.BoxGeometry(1, 1, 1);
	//const material = new THREE.MeshPhongMaterial({ color: 0xff100f })
	const sphereMaterial = new THREE.MeshPhongMaterial({
		map: earthMap,
		bumpMap: earthBump,
		specularMap: earthSpec,
	});
	//const cube = new THREE.Mesh(geom, material);
	const sphere = new THREE.Mesh(sphereGeom, sphereMaterial);
	//scene.add(cube);
	scene.add(sphere);
	camera.position.z = 15;
	var aLight = new THREE.AmbientLight();
	scene.add(aLight);
	var sunlight = new THREE.SpotLight(0xffffff, 15);
	sunlight.position.set(10, 0, 10);
	sunlight.target = sphere;
	sunlight.angle = 0.4;
	sunlight.distance = 14;
	//const spotLightHelper = new THREE.SpotLightHelper(sunlight);
	//scene.add(spotLightHelper);
	scene.add(sunlight);




	const cloudGeom = new THREE.SphereGeometry(1.01, 28, 32);
	var cloudMap = textureLoader.load("assets/planetPics/earth_clouds.png");
	const cloudMaterial = new THREE.MeshPhongMaterial({
		transparent: true,
		opacity: .7,
		depthWrite: false,
		map: cloudMap,
	});
	const cloud = new THREE.Mesh(cloudGeom, cloudMaterial);
	scene.add(cloud);




const moonGeom = new THREE.SphereGeometry(.5, 28, 32);
	var moonMap = textureLoader.load("assets/planetPics/moonmap1k.jpg");
	var moonBump = textureLoader.load("assets/planetPics/moonbump1k.jpg");
	const moonMaterial = new THREE.MeshPhongMaterial({
		map: moonMap,
		bumpMap: moonBump
	});
	const moon = new THREE.Mesh(moonGeom, moonMaterial);
	scene.add(moon);
	var moonOrbitRadius = 1.6;
	var moonOrbitAngle = 0;
	var moonOrbitSpeed = 1;

	function animate() {
		requestAnimationFrame(animate);
		sphere.rotation.x += 0.01;
		sphere.rotation.y += 0.01;
		renderer.render(scene, camera);
		moon.rotation.y += 0.01;
		//moon.position.y = 1;
		//moon.position.x = 2;
		// sphere.position.y = 0;
		// sphere.position.x = -1;
		// sphere.position.z = -1;
		// cloud.position.y = 0;
		// cloud.position.x = -1;
		// cloud.position.z = -1;
		// cloud.rotation.x += 0;
		// cloud.rotation.y += 0.01;
		moon.position.z = 1;
		var moonRadians = (moonOrbitAngle * Math.PI) / 180;
		moonOrbitAngle += moonOrbitSpeed;
		moon.position.y = Math.cos(moonRadians) * moonOrbitRadius;
		moon.position.z = Math.sin(moonRadians) * moonOrbitRadius;
		moon.position.x = Math.cos(moonRadians) * moonOrbitRadius;
	}
	animate();
});








