// Импорт необходимых модулей и ресурсов
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import index from './index'; // Импорт модуля index
import './style.css'; // Импорт стилей

// Деструктуризация объекта index для получения нужных свойств
const { sizes, camera, scene, controls, renderer } = index();

// Установка позиции камеры
camera.position.set(-6.135, 8.868, -15.807);

// Создание загрузчика текстур
const textureLoader = new THREE.TextureLoader();

// Создание массива материалов с использованием текстур
const materials = ['floor', 'wall', 'ceiling', 'officechair', 'table'].map(
	(texture) => {
		const map = textureLoader.load(`/textures/${texture}/map.jpg`);
		const normalMap = textureLoader.load(
			`/textures/${texture}/normalMap.jpg`,
		);
		const aoMap = textureLoader.load(`/textures/${texture}/aoMap.jpg`);
		const roughMap = textureLoader.load(
			`/textures/${texture}/roughMap.jpg`,
		);

		return new THREE.MeshStandardMaterial({
			map,
			normalMap,
			aoMap,
			roughnessMap: roughMap,
		});
	},
);

// Создание загрузчика OBJ-моделей и загрузка модели пола
const loader = new OBJLoader();
loader.load(
	'models/room/floor/floor.obj',
	(object) => {
		const modifiedObject = object.clone(); // Создание копии объекта
		modifiedObject.castShadow = true;
		modifiedObject.children.forEach((child, index) => {
			if (child.isMesh) {
				const modifiedChild = child; // Создание новой переменной для child
				modifiedChild.castShadow = true;
				modifiedChild.receiveShadow = true;
				modifiedChild.material = materials[0];
			}
		});
		scene.add(modifiedObject); // Добавление измененной копии объекта в сцену
	},
	(xhr) => {
		console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
	},
);

// Создание загрузчика OBJ-моделей и загрузка модели потолка
const loader1 = new OBJLoader();
loader1.load(
	'models/room/ceiling/ceiling.obj',
	(object) => {
		const modifiedObject = object.clone(); // Создание копии объекта
		modifiedObject.castShadow = true;
		modifiedObject.children.forEach((child, index) => {
			if (child.isMesh) {
				const modifiedChild = child; // Создание новой переменной для child
				modifiedChild.castShadow = true;
				modifiedChild.receiveShadow = true;
				modifiedChild.material = materials[2];
			}
		});
		scene.add(modifiedObject); // Добавление измененной копии объекта в сцену
	},
	(xhr) => {
		console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
	},
);

// Функция для создания загрузчика и загрузки модели стены
function loadWallModel(loader, modelPath, materialIndex) {
	loader.load(
		modelPath,
		(object) => {
			const modifiedObject = object.clone(); // Создание копии объекта
			modifiedObject.castShadow = true;
			modifiedObject.children.forEach((child, index) => {
				if (child.isMesh) {
					const modifiedChild = child; // Создание новой переменной для child
					modifiedChild.castShadow = true;
					modifiedChild.receiveShadow = true;
					modifiedChild.material = materials[materialIndex];
				}
			});
			scene.add(modifiedObject); // Добавление измененной копии объекта в сцену
		},
		(xhr) => {
			console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
		},
	);
}

// Создание загрузчика OBJ-моделей
const wallLoader = new OBJLoader();

// Загрузка моделей стен
loadWallModel(wallLoader, 'models/room/wall/wall0.obj', 1);
loadWallModel(wallLoader, 'models/room/wall/wall1.obj', 1);
loadWallModel(wallLoader, 'models/room/wall/wall2.obj', 1);
loadWallModel(wallLoader, 'models/room/wall/wall3.obj', 1);


// Загрузка OBJ-модели офисного кресла
const loaderObj = new OBJLoader();
loaderObj.load(
	'models/officechair/officechair.obj',
	(object) => {
		object.position.set(-3.5, 0, 1.6);
		object.rotateY(Math.PI / 4);
		object.scale.set(0.02, 0.02, 0.02);
		object.children.forEach((child) => {
			if (child.isMesh) {
				const modifiedChild = child; // Создание новой переменной для child
				modifiedChild.castShadow = true;
				modifiedChild.material = materials[3];
			}
		});
		scene.add(object);
	},
	(xhr) => {
		console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
	},
);

// Создание загрузчика OBJ-модели стола
const loaderTable = new OBJLoader();
loaderTable.load(
	'models/table/table.obj', // Путь к файлу модели стола
	(object) => {
		object.position.set(1, 0, 1);
		object.rotateY(Math.PI / 4);
		object.scale.set(0.015, 0.015, 0.015); // Масштабирование стола
		object.children.forEach((child) => {
			if (child.isMesh) {
				const modifiedChild = child;
				modifiedChild.castShadow = true;
				modifiedChild.material = materials[4];
			}
		});
		scene.add(object); // Добавление стола в сцену
	},
	(xhr) => {
		console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
	},
);

// Создание и добавление амбиентного света в сцену
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Создание и добавление направленного света в сцену
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(-10, 9, 20);
directionalLight.shadow.bias = 5;
directionalLight.castShadow = true;
directionalLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
scene.add(directionalLight);

// Создание и добавление точечного света в сцену
const pointLight = new THREE.PointLight(0xffffff, 5);
pointLight.position.set(0, 3.5, 0);
pointLight.castShadow = true;
pointLight.decay = 0.82;
pointLight.distance = 100;
pointLight.shadowRange = 6;
scene.add(pointLight);

// Функция для проверки расстояния между камерой и объектом стены и установки прозрачности материала
function checkDistanceAndSetOpacity() {
	const distanceThreshold = 5; // Пороговое значение расстояния, при котором начинается прозрачность
	scene.traverse((child) => {
		if (child.isMesh && (child.name === 'wall0' || child.name === 'wall1' || child.name === 'wall2' || child.name === 'wall3')) {
			const distance = camera.position.distanceTo(child.position); // Расстояние между камерой и объектом стены
			const opacity = distance < distanceThreshold ? 0.5 : 1; // Если расстояние меньше порогового значения, устанавливаем прозрачность
			child.material.transparent = true;
			child.material.opacity = opacity;
		}
	});
}


// Функция для рендеринга сцены
function render() {
	checkDistanceAndSetOpacity(); // Проверяем расстояние и устанавливаем прозрачность
	renderer.render(scene, camera);
}

// Функция обновления контролов и рендеринга сцены
function tick() {
	controls.update();
	render(); // Вызов функции render() для рендеринга сцены
	window.requestAnimationFrame(tick);
}
tick();

// Обработчик события изменения размеров viewport сцены
function onWindowResize() {
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	render(); // Вызов функции render() для рендеринга сцены при изменении размеров
}

window.addEventListener('resize', onWindowResize);

// Получение ссылки на канвас
const canvas = document.querySelector('.canvas');

// Обработчик события двойного щелчка мыши для переключения в полноэкранный режим
window.addEventListener('dblclick', () => {
	if (!document.fullscreenElement) {
		canvas.requestFullscreen();
	} else {
		document.exitFullscreen();
	}
});
