declare module '*.vue' {
    import { defineComponent } from 'vue';
    const Component: ReturnType<typeof defineComponent>;
    export default Component;
}

declare module 'three/addons/controls/OrbitControls.js'
declare module 'three/addons/loaders/GLTFLoader.js'
declare module 'three/addons/libs/stats.module.js'
