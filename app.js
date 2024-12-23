import { WaveGroup } from './wavegroup.js';

class App {
    constructor() {
        this.canvas = document.getElementById('waveCanvas');
        this.ctx = this.canvas.getContext('2d');

        // 기본 WaveGroup 생성
        this.waveGroup = new WaveGroup();

        // 사용자 입력 필드 업데이트
        this.generateFields();
        document.getElementById('generateFields').addEventListener('click', this.generateFields.bind(this));
        document.getElementById('waveForm').addEventListener('submit', this.handleFormSubmit.bind(this));

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        requestAnimationFrame(this.animate.bind(this));
    }

    // 사용자 입력 필드 생성
    generateFields() {
        const waveCount = Math.min(document.getElementById('waveCount').value, 5);
        const waveFields = document.getElementById('waveFields');
        waveFields.innerHTML = '';

        for (let i = 0; i < waveCount; i++) {
            waveFields.innerHTML += `
                <label for="waveColor${i}">Wave ${i + 1} Color:</label>
                <input type="color" id="waveColor${i}" name="waveColor${i}" value="#00c7eb">
                <label for="waveOpacity${i}">Wave ${i + 1} Opacity:</label>
                <input type="range" id="waveOpacity${i}" name="waveOpacity${i}" min="0" max="1" step="0.01" value="0.4">
            `;
        }
    }

    // 화면 크기 조정
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        this.canvas.width = this.stageWidth * 2;
        this.canvas.height = this.stageHeight * 2;
        this.ctx.scale(2, 2);

        this.waveGroup.resize(this.stageWidth, this.stageHeight);
    }

    // 폼 제출 이벤트 처리
    handleFormSubmit(event) {
        event.preventDefault();
        const waveCount = Math.min(document.getElementById('waveCount').value, 5);
        const colors = [];

        for (let i = 0; i < waveCount; i++) {
            const color = document.getElementById(`waveColor${i}`).value;
            const opacity = document.getElementById(`waveOpacity${i}`).value;
            colors.push(`rgba(${parseInt(color.slice(1, 3), 16)}, ${parseInt(color.slice(3, 5), 16)}, ${parseInt(color.slice(5, 7), 16)}, ${opacity})`);
        }

        this.waveGroup.updateWaveConfig(waveCount, colors);
        this.resize();
    }

    // 애니메이션 루프
    animate() {
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        this.waveGroup.draw(this.ctx);

        requestAnimationFrame(this.animate.bind(this));
    }
}

window.onload = () => {
    new App();
};

