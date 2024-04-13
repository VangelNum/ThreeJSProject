// Импорт библиотеки Three.js под псевдонимом THREE
import * as THREE from 'three';

// Импорт класса OrbitControls из модуля OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Определение функции index
const index = () => {
	// Определение объекта sizes с размерами окна
	const sizes = {
		width: window.innerWidth, // Ширина окна браузера
		height: window.innerHeight, // Высота окна браузера
	};

	// Создание новой сцены
	const scene = new THREE.Scene();

	// Получение ссылки на элемент canvas по классу .canvas
	const canvas = document.querySelector('.canvas');

	// Создание новой камеры с перспективной проекцией
	const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

	// Добавление камеры на сцену
	scene.add(camera);

	// Создание нового экземпляра класса OrbitControls для управления камерой
	const controls = new OrbitControls(camera, canvas);

	// Включение функции затухания движения камеры
	controls.enableDamping = true;

	// Создание нового рендерера WebGL с указанием canvas для рендеринга
	const renderer = new THREE.WebGLRenderer({ canvas });

	// Установка размеров рендерера равными размерам окна
	renderer.setSize(sizes.width, sizes.height);

	// Включение карты теней для рендерера
	renderer.shadowMap.enabled = true;

	// Установка типа теней для рендерера
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	// Рендеринг сцены с помощью рендерера и камеры
	renderer.render(scene, camera);

	// Возвращение объекта с информацией о сцене, размерах, камере, рендерере и контроллерах
	return { sizes, scene, canvas, camera, renderer, controls };
};

// Экспорт функции index по умолчанию
export default index;
