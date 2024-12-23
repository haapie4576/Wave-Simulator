import { Wave } from './wave.js';

export class WaveGroup {
    constructor() {
        this.totalWaves = 3;
        this.colors = [
            'rgba(0,199,235,0.4)',
            'rgba(0,146,199,0.4)',
            'rgba(0,87,158,0.4)'
        ];
        this.waves = [];
        this.initializeWaves();
    }

    initializeWaves() {
        this.waves = [];
        for (let i = 0; i < this.totalWaves; i++) {
            const wave = new Wave(i, 6, this.colors[i]);
            this.waves.push(wave);
        }
    }

    updateWaveConfig(waveCount, colors) {
        this.totalWaves = waveCount;
        this.colors = colors;
        this.initializeWaves();
    }

    resize(stageWidth, stageHeight) {
        for (const wave of this.waves) {
            wave.resize(stageWidth, stageHeight);
        }
    }

    draw(ctx) {
        for (const wave of this.waves) {
            wave.draw(ctx);
        }
    }
}

