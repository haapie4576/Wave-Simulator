export class Point {
    constructor(index, x, y) {
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.cur = index; // 초기 값에 `index`를 곱해 각 포인트에 고유한 위치 부여
        this.max = Math.random() * 100 + 150; // 진폭 범위
    }

    update(speed) {
        this.cur += speed; // 각 웨이브마다 전달받은 속도로 주기를 조절
        this.y = this.fixedY + Math.sin(this.cur) * this.max; // 사인 함수를 활용한 움직임
    }
}
